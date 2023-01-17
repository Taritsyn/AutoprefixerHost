using System;
using System.Collections.Generic;
using System.IO;
#if MODERN_JSON_CONVERTER
using System.Text.Json;
using System.Text.Json.Serialization;
#else

using Newtonsoft.Json;
#endif

using AutoprefixerHost.Extensions;
using AutoprefixerHost.Helpers;
using AutoprefixerHost.Utilities;

namespace AutoprefixerHost.JsonConverters
{
	internal sealed class ProcessingResultConverter : JsonConverter<ProcessingResult>
	{
		private ProcessingResult ReadResult(
#if MODERN_JSON_CONVERTER
			ref Utf8JsonReader reader
#else
			JsonTextReader reader
#endif
		)
		{
			reader.CheckStartObject();

			string processedContent = string.Empty;
			string sourceMap = string.Empty;
			List<ProblemInfo> warnings = null;

			while (reader.Read() && reader.IsTokenTypeProperty())
			{
				string propertyName = reader.GetStringValue();

				switch (propertyName)
				{
					case "processedContent":
						processedContent = reader.ReadAsString();
						break;
					case "sourceMap":
						sourceMap = reader.ReadAsString();
						break;
					case "errors":
						AutoprefixerProcessingException processingException = ReadFirstError(
#if MODERN_JSON_CONVERTER
							ref reader
#else
							reader
#endif
						);
						throw processingException;
					case "warnings":
						warnings = ReadWarnings(
#if MODERN_JSON_CONVERTER
							ref reader
#else
							reader
#endif
						);
						break;
					default:
						reader.Skip();
						break;
				}
			}

			reader.CheckEndObject();

			if (string.IsNullOrWhiteSpace(sourceMap))
			{
				sourceMap = SourceMapExtractor.ExtractSourceMap(processedContent);
			}

			var result = new ProcessingResult(processedContent, sourceMap, warnings ?? new List<ProblemInfo>());

			return result;
		}

		private AutoprefixerProcessingException ReadFirstError(
#if MODERN_JSON_CONVERTER
			ref Utf8JsonReader reader
#else
			JsonTextReader reader
#endif
		)
		{
			reader.ReadStartArray();

			AutoprefixerProcessingException firstException = null;

			while (reader.Read() && reader.IsTokenTypeStartObject())
			{
				if (firstException != null)
				{
					continue;
				}

				firstException = ReadError(
#if MODERN_JSON_CONVERTER
					ref reader
#else
					reader
#endif
				);
			}

			reader.CheckEndArray();

			return firstException;
		}

		private AutoprefixerProcessingException ReadError(
#if MODERN_JSON_CONVERTER
			ref Utf8JsonReader reader
#else
			JsonTextReader reader
#endif
		)
		{
			reader.CheckStartObject();

			string description = string.Empty;
			string type = string.Empty;
			string file = string.Empty;
			int lineNumber = 0;
			int columnNumber = 0;
			string content = string.Empty;

			while (reader.Read() && reader.IsTokenTypeProperty())
			{
				string propertyName = reader.GetStringValue();

				switch (propertyName)
				{
					case "description":
						description = reader.ReadAsString();
						break;
					case "type":
						type = reader.ReadAsString();
						break;
					case "file":
						file = reader.ReadAsString();
						break;
					case "lineNumber":
						lineNumber = reader.ReadAsInt32(0);
						break;
					case "columnNumber":
						columnNumber = reader.ReadAsInt32(0);
						break;
					case "source":
						content = reader.ReadAsString();
						break;
					default:
						reader.Skip();
						break;
				}
			}

			reader.CheckEndObject();

			string documentName = Path.GetFileName(file);
			string sourceFragment = SourceCodeNavigator.GetSourceFragment(content,
				new SourceCodeNodeCoordinates(lineNumber, columnNumber));
			string sourceLineFragment = TextHelpers.GetTextFragment(content, lineNumber, columnNumber);
			string message = AutoprefixerErrorHelpers.GenerateProcessingErrorMessage(type, description, documentName,
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

		private List<ProblemInfo> ReadWarnings(
#if MODERN_JSON_CONVERTER
			ref Utf8JsonReader reader
#else
			JsonTextReader reader
#endif
		)
		{
			reader.ReadStartArray();

			var warnings = new List<ProblemInfo>();

			while (reader.Read() && reader.IsTokenTypeStartObject())
			{
				ProblemInfo warning = ReadWarning(
#if MODERN_JSON_CONVERTER
					ref reader
#else
					reader
#endif
				);
				warnings.Add(warning);
			}

			reader.CheckEndArray();

			return warnings;
		}

		private ProblemInfo ReadWarning(
#if MODERN_JSON_CONVERTER
			ref Utf8JsonReader reader
#else
			JsonTextReader reader
#endif
		)
		{
			reader.CheckStartObject();

			string description = string.Empty;
			string type = string.Empty;
			string file = string.Empty;
			int lineNumber = 0;
			int columnNumber = 0;
			string content = string.Empty;

			while (reader.Read() && reader.IsTokenTypeProperty())
			{
				string propertyName = reader.GetStringValue();

				switch (propertyName)
				{
					case "description":
						description = reader.ReadAsString();
						break;
					case "file":
						file = reader.ReadAsString();
						break;
					case "lineNumber":
						lineNumber = reader.ReadAsInt32(0);
						break;
					case "columnNumber":
						columnNumber = reader.ReadAsInt32(0);
						break;
					case "source":
						content = reader.ReadAsString();
						break;
					default:
						reader.Skip();
						break;
				}
			}

			reader.CheckEndObject();

			string documentName = Path.GetFileName(file);
			string sourceFragment = SourceCodeNavigator.GetSourceFragment(content,
				new SourceCodeNodeCoordinates(lineNumber, columnNumber));
			string sourceLineFragment = TextHelpers.GetTextFragment(content, lineNumber, columnNumber);
			string message = AutoprefixerErrorHelpers.GenerateProcessingErrorMessage(type, description,
				documentName, lineNumber, columnNumber, sourceLineFragment);

			var warning = new ProblemInfo
			{
				Message = message,
				Description = description,
				File = file,
				LineNumber = lineNumber,
				ColumnNumber = columnNumber,
				SourceFragment = sourceFragment
			};

			return warning;
		}

		#region JsonConverter<T> overrides

#if MODERN_JSON_CONVERTER
		public override ProcessingResult Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			return ReadResult(ref reader);
		}

		public override void Write(Utf8JsonWriter writer, ProcessingResult value, JsonSerializerOptions options)
		{
			throw new NotImplementedException();
		}
#else
		public override bool CanRead => true;

		public override bool CanWrite => false;


		public override ProcessingResult ReadJson(JsonReader reader, Type objectType, ProcessingResult existingValue,
			bool hasExistingValue, JsonSerializer serializer)
		{
			var textReader = (JsonTextReader)reader;

			return ReadResult(textReader);
		}

		public override void WriteJson(JsonWriter writer, ProcessingResult value, JsonSerializer serializer)
		{
			throw new NotImplementedException();
		}
#endif

		#endregion
	}
}