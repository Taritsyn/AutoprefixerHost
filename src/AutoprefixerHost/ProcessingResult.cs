using System.Collections.Generic;

namespace AutoprefixerHost
{
	/// <summary>
	/// Result of processing CSS code by using the Autoprefixer
	/// </summary>
	public sealed class ProcessingResult
	{
		/// <summary>
		/// Gets a processed content
		/// </summary>
		public string ProcessedContent
		{
			get;
			private set;
		}

		/// <summary>
		/// Gets a source map
		/// </summary>
		public string SourceMap
		{
			get;
			private set;
		}

		/// <summary>
		/// Gets a list of the warnings
		/// </summary>
		public IList<ProblemInfo> Warnings
		{
			get;
			private set;
		}


		/// <summary>
		/// Constructs an instance of the processing result
		/// </summary>
		/// <param name="processedContent">Processed content</param>
		/// <param name="sourceMap">Source map</param>
		/// <param name="warnings">List of the warnings</param>
		public ProcessingResult(string processedContent, string sourceMap, IList<ProblemInfo> warnings)
		{
			ProcessedContent = processedContent;
			SourceMap = sourceMap;
			Warnings = warnings;
		}
	}
}