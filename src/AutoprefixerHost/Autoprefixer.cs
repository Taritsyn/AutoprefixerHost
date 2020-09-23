using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

using JavaScriptEngineSwitcher.Core;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using AutoprefixerHost.Helpers;
using AutoprefixerHost.Resources;
using AutoprefixerHost.Utilities;

namespace AutoprefixerHost
{
	/// <summary>
	/// Autoprefixer
	/// </summary>
	public sealed class Autoprefixer : IDisposable
	{
		/// <summary>
		/// Name of file, which contains a ECMAScript 6+ polyfills
		/// </summary>
		private const string ES6_POLYFILLS_FILE_NAME = "es6-polyfills.min.js";

		/// <summary>
		/// Name of file, which contains a Autoprefixer library
		/// </summary>
		private const string AUTOPREFIXER_LIBRARY_FILE_NAME = "autoprefixer-combined.min.js";

		/// <summary>
		/// Name of file, which contains a Autoprefixer helper
		/// </summary>
		private const string AUTOPREFIXER_HELPER_FILE_NAME = "autoprefixerHelper.min.js";

		/// <summary>
		/// Name of variable, which contains a country statistics service
		/// </summary>
		private const string COUNTRY_STATISTICS_SERVICE_VARIABLE_NAME = "CountryStatisticsService";

		/// <summary>
		/// Default processing options
		/// </summary>
		private static readonly ProcessingOptions _defaultOptions = new ProcessingOptions();

		/// <summary>
		/// Processing options
		/// </summary>
		private readonly ProcessingOptions _options;

		/// <summary>
		/// Processing options in JSON format
		/// </summary>
		private readonly string _serializedOptions;

		/// <summary>
		/// JS engine
		/// </summary>
		private IJsEngine _jsEngine;

		/// <summary>
		/// Synchronizer of the Autoprefixer initialization
		/// </summary>
		private readonly object _initializationSynchronizer = new object();

		/// <summary>
		/// Flag indicating whether the Autoprefixer is initialized
		/// </summary>
		private bool _initialized;

		/// <summary>
		/// Flag indicating whether the Autoprefixer is disposed
		/// </summary>
		private InterlockedStatedFlag _disposedFlag = new InterlockedStatedFlag();

		/// <summary>
		/// Gets a version of the Autoprefixer library
		/// </summary>
		public string Version => "10.0.0.2";


		/// <summary>
		/// Constructs an instance of the Autoprefixer
		/// </summary>
		public Autoprefixer()
			: this(JsEngineSwitcher.Current.CreateDefaultEngine, _defaultOptions)
		{ }

		/// <summary>
		/// Constructs an instance of the Autoprefixer
		/// </summary>
		/// <param name="options">Processing options</param>
		public Autoprefixer(ProcessingOptions options)
			: this(JsEngineSwitcher.Current.CreateDefaultEngine, options)
		{ }

		/// <summary>
		/// Constructs an instance of the Autoprefixer
		/// </summary>
		/// <param name="createJsEngineInstance">Delegate that creates an instance of JS engine</param>
		public Autoprefixer(Func<IJsEngine> createJsEngineInstance)
			: this(createJsEngineInstance, _defaultOptions)
		{ }

		/// <summary>
		/// Constructs an instance of the Autoprefixer
		/// </summary>
		/// <param name="createJsEngineInstance">Delegate that creates an instance of JS engine</param>
		/// <param name="options">Processing options</param>
		public Autoprefixer(Func<IJsEngine> createJsEngineInstance, ProcessingOptions options)
		{
			if (createJsEngineInstance == null)
			{
				throw new ArgumentNullException(nameof(createJsEngineInstance));
			}

			_options = options ?? _defaultOptions;
			_serializedOptions = SerializeProcessingOptions(_options);

			try
			{
				_jsEngine = createJsEngineInstance();
			}
			catch (JsEngineLoadException e)
			{
				throw AutoprefixerErrorHelpers.WrapAutoprefixerLoadException(e);
			}
			catch (Exception e)
			{
				throw AutoprefixerErrorHelpers.WrapAutoprefixerLoadException(e, true);
			}
		}

		/// <summary>
		/// Constructs an instance of the Autoprefixer
		/// </summary>
		/// <param name="jsEngineFactory">JS engine factory</param>
		public Autoprefixer(IJsEngineFactory jsEngineFactory)
			: this(jsEngineFactory, _defaultOptions)
		{ }

		/// <summary>
		/// Constructs an instance of the Autoprefixer
		/// </summary>
		/// <param name="jsEngineFactory">JS engine factory</param>
		/// <param name="options">Processing options</param>
		public Autoprefixer(IJsEngineFactory jsEngineFactory, ProcessingOptions options)
		{
			if (jsEngineFactory == null)
			{
				throw new ArgumentNullException(nameof(jsEngineFactory));
			}

			_options = options ?? _defaultOptions;
			_serializedOptions = SerializeProcessingOptions(_options);

			try
			{
				_jsEngine = jsEngineFactory.CreateEngine();
			}
			catch (JsEngineLoadException e)
			{
				throw AutoprefixerErrorHelpers.WrapAutoprefixerLoadException(e);
			}
			catch (Exception e)
			{
				throw AutoprefixerErrorHelpers.WrapAutoprefixerLoadException(e, true);
			}
		}


		/// <summary>
		/// Initializes a Autoprefixer
		/// </summary>
		private void Initialize()
		{
			if (_initialized)
			{
				return;
			}

			lock (_initializationSynchronizer)
			{
				if (_initialized)
				{
					return;
				}

				try
				{
					_jsEngine.EmbedHostObject(COUNTRY_STATISTICS_SERVICE_VARIABLE_NAME,
						CountryStatisticsService.Instance);

					Assembly assembly = this.GetType()
#if !NET40
						.GetTypeInfo()
#endif
						.Assembly
						;

					_jsEngine.ExecuteResource(ResourceHelpers.GetResourceName(ES6_POLYFILLS_FILE_NAME),
						assembly);
					_jsEngine.ExecuteResource(ResourceHelpers.GetResourceName(AUTOPREFIXER_LIBRARY_FILE_NAME),
						assembly);
					_jsEngine.ExecuteResource(ResourceHelpers.GetResourceName(AUTOPREFIXER_HELPER_FILE_NAME),
						assembly);
					_jsEngine.Execute($"var autoprefixerHelper = new AutoprefixerHelper({_serializedOptions});");
				}
				catch (JsException e)
				{
					throw AutoprefixerErrorHelpers.WrapAutoprefixerLoadException(e, true);
				}

				_initialized = true;
			}
		}

		/// <summary>
		/// Actualizes a vendor prefixes in CSS code by using Andrey Sitnik's Autoprefixer
		/// </summary>
		/// <param name="content">CSS code</param>
		/// <param name="inputPath">Path to input file</param>
		/// <param name="outputPath">Path to output file</param>
		/// <param name="sourceMapPath">Path to source map file</param>
		/// <param name="inputSourceMapContent">Content of an input source map from an previous
		/// processing step (for example, Sass compilation)</param>
		/// <returns>Processing result</returns>
		public ProcessingResult Process(string content, string inputPath = null, string outputPath = null,
			string sourceMapPath = null, string inputSourceMapContent = null)
		{
			Initialize();

			string serializedResult = string.Empty;
			string serializedContent = JsonConvert.SerializeObject(content);
			string serializedInputPath = JsonConvert.SerializeObject(inputPath);
			string serializedOutputPath = JsonConvert.SerializeObject(outputPath);
			string serializedSourceMapPath = JsonConvert.SerializeObject(sourceMapPath);
			string serializedInputSourceMapContent = JsonConvert.SerializeObject(inputSourceMapContent);

			try
			{
				serializedResult = _jsEngine.Evaluate<string>("autoprefixerHelper.process(" +
					serializedContent + ", " + serializedInputPath + ", " + serializedOutputPath + ", " +
					serializedSourceMapPath + ", " + serializedInputSourceMapContent + ");");
			}
			catch (JsException e)
			{
				throw new AutoprefixerProcessingException(
					string.Format(Strings.Processor_JsErrorDuringProcessing, e.Message), e)
				{
					Description = e.Message,
					File = inputPath ?? string.Empty
				};
			}

			var resultJson = JObject.Parse(serializedResult);
			var errorsJson = resultJson["errors"] as JArray;

			if (errorsJson != null && errorsJson.Count > 0)
			{
				throw CreateProcessingExceptionFromJson(errorsJson[0]);
			}

			ProcessingResult processingResult = CreateProcessingResultFromJson(resultJson);

			return processingResult;
		}

		/// <summary>
		/// Serializes a processing options to JSON format
		/// </summary>
		/// <param name="options">Processing options</param>
		/// <returns>Serialized processing options in JSON format</returns>
		private string SerializeProcessingOptions(ProcessingOptions options)
		{
			JObject statsJson = null;

			if (!string.IsNullOrWhiteSpace(options.Stats))
			{
				try
				{
					statsJson = JObject.Parse(options.Stats);
				}
				catch (JsonReaderException e)
				{
					string description = Strings.Processor_StatsPropertyHasIncorrectFormat;

					throw new AutoprefixerLoadException(description, e)
					{
						Description = description
					};
				}
			}

			var optionsJson = new JObject(
				new JProperty("browsers", options.Browsers != null ? new JArray(options.Browsers) : null),
				new JProperty("cascade", options.Cascade),
				new JProperty("add", options.Add),
				new JProperty("remove", options.Remove),
				new JProperty("supports", options.Supports),
				new JProperty("flexbox", ConvertFlexboxModeEnumValueToJson(options.Flexbox)),
				new JProperty("grid", ConvertGridModeEnumValueToJson(options.Grid)),
				new JProperty("ignoreUnknownVersions", options.IgnoreUnknownVersions),
				new JProperty("stats", statsJson),
				new JProperty("sourceMap", options.SourceMap),
				new JProperty("inlineSourceMap", options.InlineSourceMap),
				new JProperty("sourceMapIncludeContents", options.SourceMapIncludeContents),
				new JProperty("omitSourceMapUrl", options.OmitSourceMapUrl)
			);

			return optionsJson.ToString();
		}

		/// <summary>
		/// Converts a flexbox mode enum value to JSON
		/// </summary>
		/// <param name="mode">Flexbox mode enum value</param>
		/// <returns>Flexbox mode in JSON format</returns>
		private static JValue ConvertFlexboxModeEnumValueToJson(FlexboxMode mode)
		{
			JValue value;

			switch (mode)
			{
				case FlexboxMode.All:
					value = new JValue(true);
					break;
				case FlexboxMode.None:
					value = new JValue(false);
					break;
				case FlexboxMode.No2009:
					value = new JValue("no-2009");
					break;
				default:
					throw new InvalidCastException(string.Format(Strings.Common_EnumValueToCodeConversionFailed,
						mode.ToString(), typeof(FlexboxMode)));
			}

			return value;
		}

		/// <summary>
		/// Converts a grid mode enum value to JSON
		/// </summary>
		/// <param name="mode">Grid mode enum value</param>
		/// <returns>Grid mode in JSON format</returns>
		private static JValue ConvertGridModeEnumValueToJson(GridMode mode)
		{
			JValue value;

			switch (mode)
			{
				case GridMode.None:
					value = new JValue(false);
					break;
				case GridMode.Autoplace:
					value = new JValue("autoplace");
					break;
				case GridMode.NoAutoplace:
					value = new JValue("no-autoplace");
					break;
				default:
					throw new InvalidCastException(string.Format(Strings.Common_EnumValueToCodeConversionFailed,
						mode.ToString(), typeof(GridMode)));
			}

			return value;
		}

		private AutoprefixerProcessingException CreateProcessingExceptionFromJson(JToken error)
		{
			var description = error.Value<string>("description");
			var type = error.Value<string>("type");
			var file = error.Value<string>("file");
			string documentName = Path.GetFileName(file);
			var lineNumber = error.Value<int>("lineNumber");
			var columnNumber = error.Value<int>("columnNumber");
			var content = error.Value<string>("source");
			string sourceFragment = SourceCodeNavigator.GetSourceFragment(content,
				new SourceCodeNodeCoordinates(lineNumber, columnNumber));
			string sourceLineFragment = TextHelpers.GetTextFragment(content, lineNumber, columnNumber);
			var message = AutoprefixerErrorHelpers.GenerateProcessingErrorMessage(type, description, documentName,
				lineNumber, columnNumber, sourceLineFragment);

			var processingException = new AutoprefixerProcessingException(message)
			{
				Description = description,
				Type = type,
				File = file,
				LineNumber = lineNumber,
				ColumnNumber = columnNumber,
				SourceFragment = sourceFragment
			};

			return processingException;
		}

		private ProcessingResult CreateProcessingResultFromJson(JObject resultJson)
		{
			string processedContent = resultJson.Value<string>("processedContent");
			string sourceMap = resultJson.Value<string>("sourceMap");
			if (_options.SourceMap && string.IsNullOrWhiteSpace(sourceMap))
			{
				sourceMap = SourceMapExtractor.ExtractSourceMap(processedContent);
			}
			var warnings = new List<ProblemInfo>();

			var warningsJson = resultJson["warnings"] as JArray;
			if (warningsJson != null && warningsJson.Count > 0)
			{
				foreach (JObject warningJson in warningsJson)
				{
					var description = warningJson.Value<string>("description");
					string type = string.Empty;
					var file = warningJson.Value<string>("file");
					string documentName = Path.GetFileName(file);
					var lineNumber = warningJson.Value<int>("lineNumber");
					var columnNumber = warningJson.Value<int>("columnNumber");
					var content = warningJson.Value<string>("source");
					string sourceFragment = SourceCodeNavigator.GetSourceFragment(content,
						new SourceCodeNodeCoordinates(lineNumber, columnNumber));
					string sourceLineFragment = TextHelpers.GetTextFragment(content, lineNumber, columnNumber);
					var message = AutoprefixerErrorHelpers.GenerateProcessingErrorMessage(type, description,
						documentName, lineNumber, columnNumber, sourceLineFragment);

					warnings.Add(new ProblemInfo
					{
						Message = message,
						Description = description,
						File = file,
						LineNumber = lineNumber,
						ColumnNumber = columnNumber,
						SourceFragment = sourceFragment
					});
				}
			}

			var processingResult = new ProcessingResult(processedContent, sourceMap, warnings);

			return processingResult;
		}

		/// <summary>
		/// Destroys object
		/// </summary>
		public void Dispose()
		{
			if (_disposedFlag.Set())
			{
				if (_jsEngine != null)
				{
					_jsEngine.RemoveVariable(COUNTRY_STATISTICS_SERVICE_VARIABLE_NAME);

					_jsEngine.Dispose();
					_jsEngine = null;
				}
			}
		}
	}
}