using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
#if MODERN_JSON_CONVERTER
using System.Text.Json;
#endif

using JavaScriptEngineSwitcher.Core;
#if !MODERN_JSON_CONVERTER
using Newtonsoft.Json;
#endif

using AutoprefixerHost.Extensions;
using AutoprefixerHost.Helpers;
using AutoprefixerHost.JsonConverters;
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
		private const string AUTOPREFIXER_HELPER_FILE_NAME = "autoprefixer-helper.min.js";

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
		private ProcessingOptions _options;

		/// <summary>
		/// Delegate that creates an instance of JS engine
		/// </summary>
		private Func<IJsEngine> _createJsEngineInstance;

		/// <summary>
		/// JS engine
		/// </summary>
		private IJsEngine _jsEngine;

		/// <summary>
		/// Unified JSON serializer
		/// </summary>
		private UnifiedJsonSerializer _jsonSerializer;

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
		public string Version => "10.4.16.0";


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

			InitializeFields(createJsEngineInstance, options);
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

			InitializeFields(jsEngineFactory.CreateEngine, options);
		}


		/// <summary>
		/// Initialize a class fields
		/// </summary>
		/// <param name="createJsEngineInstance">Delegate that creates an instance of JS engine</param>
		/// <param name="options">Processing options</param>
		private void InitializeFields(Func<IJsEngine> createJsEngineInstance, ProcessingOptions options)
		{
			_createJsEngineInstance = createJsEngineInstance;
			_options = options ?? _defaultOptions;

#if MODERN_JSON_CONVERTER
			var jsonSerializerOptions = new JsonSerializerOptions();
#else
			var jsonSerializerOptions = new JsonSerializerSettings();
#endif
			var converters = jsonSerializerOptions.Converters;
			converters.Add(new ProcessingOptionsConverter());
			converters.Add(new ProcessingResultConverter());

			_jsonSerializer = new UnifiedJsonSerializer(jsonSerializerOptions);
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

				string serializedOptions;

				try
				{
					serializedOptions = _jsonSerializer.SerializeObject(_options);
				}
				catch (CustomUsageStatisticsFormatException e)
				{
					string description = e.Message;
					string message = AutoprefixerErrorHelpers.GenerateErrorMessageFromExceptionWithInnerException(e);

					throw new AutoprefixerLoadException(message, e)
					{
						Description = description
					};
				}

				try
				{
					_jsEngine = _createJsEngineInstance();
					_jsEngine.EmbedHostObject(COUNTRY_STATISTICS_SERVICE_VARIABLE_NAME,
						CountryStatisticsService.Instance);

					Assembly assembly = this.GetType()
#if !NET40
						.GetTypeInfo()
#endif
						.Assembly
						;

					_jsEngine.ExecuteResource(ResourceHelpers.GetResourceName(ES6_POLYFILLS_FILE_NAME),
						assembly, true);
					_jsEngine.ExecuteResource(ResourceHelpers.GetResourceName(AUTOPREFIXER_LIBRARY_FILE_NAME),
						assembly, true);
					_jsEngine.ExecuteResource(ResourceHelpers.GetResourceName(AUTOPREFIXER_HELPER_FILE_NAME),
						assembly, true);
					_jsEngine.Execute($"var autoprefixerHelper = new AutoprefixerHelper({serializedOptions});");
				}
				catch (JsEngineLoadException e)
				{
					throw AutoprefixerErrorHelpers.WrapAutoprefixerLoadException(e);
				}
				catch (Exception e)
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
		/// <param name="options">Processing options</param>
		/// <returns>Processing result</returns>
		public ProcessingResult Process(string content, ProcessingOptions options = null)
		{
			if (content == null)
			{
				throw new ArgumentNullException(
					nameof(content),
					string.Format(Strings.Common_ArgumentIsNull, nameof(content))
				);
			}

			if (string.IsNullOrWhiteSpace(content))
			{
				throw new ArgumentException(
					string.Format(Strings.Common_ArgumentIsEmpty, nameof(content)),
					nameof(content)
				);
			}

			return InnerProcess(content, null, null, null, null, options);
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
		/// <param name="options">Processing options</param>
		/// <returns>Processing result</returns>
		public ProcessingResult Process(string content, string inputPath, string outputPath = null,
			string sourceMapPath = null, string inputSourceMapContent = null, ProcessingOptions options = null)
		{
			if (content == null)
			{
				throw new ArgumentNullException(
					nameof(content),
					string.Format(Strings.Common_ArgumentIsNull, nameof(content))
				);
			}

			if (inputPath == null)
			{
				throw new ArgumentNullException(
					nameof(inputPath),
					string.Format(Strings.Common_ArgumentIsNull, nameof(inputPath))
				);
			}

			if (string.IsNullOrWhiteSpace(content))
			{
				throw new ArgumentException(
					string.Format(Strings.Common_ArgumentIsEmpty, nameof(content)),
					nameof(content)
				);
			}

			if (string.IsNullOrWhiteSpace(inputPath))
			{
				throw new ArgumentException(
					string.Format(Strings.Common_ArgumentIsEmpty, nameof(inputPath)),
					nameof(inputPath)
				);
			}

			return InnerProcess(content, inputPath, outputPath, sourceMapPath, inputSourceMapContent, options);
		}

		private ProcessingResult InnerProcess(string content, string inputPath, string outputPath,
			string sourceMapPath, string inputSourceMapContent, ProcessingOptions options)
		{
			Initialize();

			string serializedContent = _jsonSerializer.SerializePrimitiveType(content);
			string serializedInputPath = _jsonSerializer.SerializePrimitiveType(inputPath);
			string serializedOutputPath = _jsonSerializer.SerializePrimitiveType(outputPath);
			string serializedSourceMapPath = _jsonSerializer.SerializePrimitiveType(sourceMapPath);
			string serializedInputSourceMapContent = _jsonSerializer.SerializePrimitiveType(inputSourceMapContent);
			string serializedOptions = "null";

			if (options != null)
			{
				try
				{
					serializedOptions = _jsonSerializer.SerializeObject(options);
				}
				catch (CustomUsageStatisticsFormatException e)
				{
					string description = e.Message;
					string message = AutoprefixerErrorHelpers.GenerateErrorMessageFromExceptionWithInnerException(e);

					throw new AutoprefixerProcessingException(message, e)
					{
						Description = description
					};
				}
			}

			ProcessingResult processingResult;

			try
			{
				string serializedResult = _jsEngine.Evaluate<string>("autoprefixerHelper.process(" +
					serializedContent + ", " + serializedInputPath + ", " + serializedOutputPath + ", " +
					serializedSourceMapPath + ", " + serializedInputSourceMapContent + ", " +
					serializedOptions + ");");

				processingResult = _jsonSerializer.DeserializeObject<ProcessingResult>(serializedResult);
			}
			catch (AutoprefixerProcessingException)
			{
				throw;
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

				_jsonSerializer = null;
				_options = null;
				_createJsEngineInstance = null;
			}
		}
	}
}