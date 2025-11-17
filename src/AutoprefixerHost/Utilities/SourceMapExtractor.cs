using System;
using System.Text;

namespace AutoprefixerHost.Utilities
{
	/// <summary>
	/// Extractor of source maps
	/// </summary>
	internal static class SourceMapExtractor
	{
		const string INLINE_SOURCE_MAP_BEGIN_PART = "/*# sourceMappingURL=data:application/json;base64,";
		const string INLINE_SOURCE_MAP_END_PART = " */";

		/// <summary>
		/// Extracts a source map from CSS code with inline source map
		/// </summary>
		/// <param name="content">CSS code with inline source map</param>
		/// <returns>Source map</returns>
		internal static string ExtractSourceMap(string content)
		{
			if (content is null)
			{
				throw new ArgumentNullException(nameof(content));
			}

			string sourceMap = string.Empty;
			int startPosition = content.IndexOf(INLINE_SOURCE_MAP_BEGIN_PART);

			if (startPosition != -1)
			{
				startPosition += INLINE_SOURCE_MAP_BEGIN_PART.Length;
				int endPosition = content.IndexOf(INLINE_SOURCE_MAP_END_PART, startPosition);

				if (endPosition != -1)
				{
					int inlineSourceMapLength = endPosition - startPosition;
					string inlineSourceMapContent = content.Substring(startPosition, inlineSourceMapLength);

					byte[] sourceMapBytes = Convert.FromBase64String(inlineSourceMapContent);
					sourceMap = Encoding.UTF8.GetString(sourceMapBytes);
				}
			}

			return sourceMap;
		}
	}
}