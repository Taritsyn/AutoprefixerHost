namespace AutoprefixerHost
{
	/// <summary>
	/// Information about the problem
	/// </summary>
	public sealed class ProblemInfo
	{
		/// <summary>
		/// Gets or sets a message that describes the current problem
		/// </summary>
		public string Message
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a description of problem
		/// </summary>
		public string Description
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a name of file, where the problem occurred
		/// </summary>
		public string File
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a line number
		/// </summary>
		public int LineNumber
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a column number
		/// </summary>
		public int ColumnNumber
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a source fragment
		/// </summary>
		public string SourceFragment
		{
			get;
			set;
		}


		/// <summary>
		/// Constructs an instance of the problem information
		/// </summary>
		public ProblemInfo()
		{
			Message = string.Empty;
			Description = string.Empty;
			File = string.Empty;
			LineNumber = 0;
			ColumnNumber = 0;
			SourceFragment = string.Empty;
		}
	}
}