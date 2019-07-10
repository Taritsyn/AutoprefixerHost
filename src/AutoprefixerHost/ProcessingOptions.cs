using System.Collections.Generic;

namespace AutoprefixerHost
{
	/// <summary>
	/// Processing options
	/// </summary>
	public sealed class ProcessingOptions
	{
		/// <summary>
		/// Gets or sets a list of queries for target browsers
		/// </summary>
		public IList<string> Browsers
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a flag for whether to create nice visual cascade of prefixes
		/// </summary>
		public bool Cascade
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a flag for whether to add new prefixes
		/// </summary>
		public bool Add
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a flag for whether to remove outdated prefixes
		/// </summary>
		public bool Remove
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a flag for whether to add prefixes for <code>@supports</code> parameters
		/// </summary>
		public bool Supports
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a mode that defines should Autoprefixer add prefixes for flexbox properties
		/// </summary>
		public FlexboxMode Flexbox
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a mode that defines should Autoprefixer add IE 10-11 prefixes for Grid Layout properties
		/// </summary>
		public GridMode Grid
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a flag for whether to do not raise error on unknown browser version in
		/// the <code>Browsers</code> property
		/// </summary>
		public bool IgnoreUnknownVersions
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a custom usage statistics in JSON format for <code>&gt; 10% in my stats</code> browsers
		/// query
		/// </summary>
		public string Stats
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a flag for whether to enable source map generation
		/// </summary>
		public bool SourceMap
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a flag for whether to embed <code>sourceMappingUrl</code> as data uri
		/// </summary>
		public bool InlineSourceMap
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a flag for whether to include contents in maps
		/// </summary>
		public bool SourceMapIncludeContents
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a flag for whether to disable <code>sourceMappingUrl</code> in css output
		/// </summary>
		public bool OmitSourceMapUrl
		{
			get;
			set;
		}


		/// <summary>
		/// Constructs a instance of the CSS processing options
		/// </summary>
		public ProcessingOptions()
		{
			Browsers = new List<string> { "> 0.5%", "last 2 versions", "Firefox ESR", "not dead" };
			Cascade = true;
			Add = true;
			Remove = true;
			Supports = true;
			Flexbox = FlexboxMode.All;
			Grid = GridMode.None;
			IgnoreUnknownVersions = false;
			Stats = string.Empty;
			SourceMap = false;
			InlineSourceMap = false;
			SourceMapIncludeContents = false;
			OmitSourceMapUrl = false;
		}
	}
}