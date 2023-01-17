using System;
using System.Collections.Generic;
#if MODERN_JSON_CONVERTER
using System.Text.Json;
using System.Text.Json.Serialization;
#else

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
#endif

using AutoprefixerHost.Extensions;
using AutoprefixerHost.Resources;

namespace AutoprefixerHost.JsonConverters
{
	/// <summary>
	/// Converts an processing options to JSON
	/// </summary>
	internal sealed class ProcessingOptionsConverter : JsonConverter<ProcessingOptions>
	{
		private void WriteOptionsJson(
#if MODERN_JSON_CONVERTER
			Utf8JsonWriter writer,
#else
			JsonTextWriter writer,
#endif
			ProcessingOptions value
		)
		{
			if (value == null)
			{
				throw new ArgumentNullException(nameof(value));
			}

			string stats = value.Stats;
			if (!string.IsNullOrWhiteSpace(stats))
			{
				try
				{
#if MODERN_JSON_CONVERTER
					var options = new JsonDocumentOptions
					{
						AllowTrailingCommas = false,
						CommentHandling = JsonCommentHandling.Disallow
					};
					JsonDocument.Parse(stats, options);
#else
					var settings = new JsonLoadSettings
					{
						CommentHandling = CommentHandling.Ignore,
						DuplicatePropertyNameHandling = DuplicatePropertyNameHandling.Error,
						LineInfoHandling = LineInfoHandling.Ignore
					};
					JObject.Parse(stats, settings);
#endif
				}
#if MODERN_JSON_CONVERTER
				catch (JsonException e)
#else
				catch (JsonReaderException e)
#endif
				{
					throw new CustomUsageStatisticsFormatException(
						Strings.Processor_StatsPropertyHasIncorrectFormat, e);
				}
			}

			writer.WriteStartObject();

			IList<string> browsers = value.Browsers;
			if (browsers != null)
			{
				writer.WriteStartArray("browsers");

				int browserCount = browsers.Count;

				for (int browserIndex = 0; browserIndex < browserCount; browserIndex++)
				{
					writer.WriteStringValue(browsers[browserIndex]);
				}

				writer.WriteEndArray();
			}

			writer.WriteBoolean("cascade", value.Cascade);
			writer.WriteBoolean("add", value.Add);
			writer.WriteBoolean("remove", value.Remove);
			writer.WriteBoolean("supports", value.Supports);

			WriteFlexboxMode(writer, "flexbox", value.Flexbox);
			WriteGridMode(writer, "grid", value.Grid);

			writer.WriteBoolean("ignoreUnknownVersions", value.IgnoreUnknownVersions);
			if (!string.IsNullOrWhiteSpace(value.Stats))
			{
				writer.WritePropertyName("stats");
#if !MODERN_JSON_CONVERTER || NET6_0_OR_GREATER
				writer.WriteRawValue(stats);
#else
				writer.WriteStringValue(stats);
#endif
			}
			writer.WriteBoolean("sourceMap", value.SourceMap);
			writer.WriteBoolean("inlineSourceMap", value.InlineSourceMap);
			writer.WriteBoolean("sourceMapIncludeContents", value.SourceMapIncludeContents);
			writer.WriteBoolean("omitSourceMapUrl", value.OmitSourceMapUrl);

			writer.WriteEndObject();
		}

		private static void WriteFlexboxMode(
#if MODERN_JSON_CONVERTER
			Utf8JsonWriter writer,
#else
			JsonTextWriter writer,
#endif
			string propertyName,
			FlexboxMode value
		)
		{
			writer.WritePropertyName(propertyName);

			switch (value)
			{
				case FlexboxMode.All:
					writer.WriteBooleanValue(true);
					break;
				case FlexboxMode.None:
					writer.WriteBooleanValue(false);
					break;
				case FlexboxMode.No2009:
					writer.WriteStringValue("no-2009");
					break;
				default:
					throw new InvalidCastException(string.Format(Strings.Common_EnumValueToCodeConversionFailed,
						value.ToString(), typeof(FlexboxMode)));
			}
		}

		private static void WriteGridMode(
#if MODERN_JSON_CONVERTER
			Utf8JsonWriter writer,
#else
			JsonTextWriter writer,
#endif
			string propertyName,
			GridMode value
		)
		{
			writer.WritePropertyName(propertyName);

			switch (value)
			{
				case GridMode.None:
					writer.WriteBooleanValue(false);
					break;
				case GridMode.Autoplace:
					writer.WriteStringValue("autoplace");
					break;
				case GridMode.NoAutoplace:
					writer.WriteStringValue("no-autoplace");
					break;
				default:
					throw new InvalidCastException(string.Format(Strings.Common_EnumValueToCodeConversionFailed,
						value.ToString(), typeof(GridMode)));
			}
		}

		#region JsonConverter<T> overrides

#if MODERN_JSON_CONVERTER
		public override ProcessingOptions Read(ref Utf8JsonReader reader, Type typeToConvert,
			JsonSerializerOptions options)
		{
			throw new NotImplementedException();
		}

		public override void Write(Utf8JsonWriter writer, ProcessingOptions value,
			JsonSerializerOptions options)
		{
			WriteOptionsJson(writer, value);
		}
#else
		public override bool CanRead => false;

		public override bool CanWrite => true;


		public override ProcessingOptions ReadJson(JsonReader reader, Type objectType, ProcessingOptions existingValue,
			bool hasExistingValue, JsonSerializer serializer)
		{
			throw new NotImplementedException();
		}

		public override void WriteJson(JsonWriter writer, ProcessingOptions value, JsonSerializer serializer)
		{
			var textWriter = (JsonTextWriter)writer;

			WriteOptionsJson(textWriter, value);
		}
#endif

		#endregion
	}
}