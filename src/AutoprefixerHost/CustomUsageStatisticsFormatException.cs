using System;

namespace AutoprefixerHost
{
	/// <summary>
	/// The exception that is thrown during the custom usage statistics parsing
	/// </summary>
	internal class CustomUsageStatisticsFormatException : Exception
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="CustomUsageStatisticsFormatException"/> class
		/// with a specified error message
		/// </summary>
		/// <param name="message">The message that describes the error</param>
		internal CustomUsageStatisticsFormatException(string message)
			: base(message)
		{ }

		/// <summary>
		/// Initializes a new instance of the <see cref="CustomUsageStatisticsFormatException"/> class
		/// with a specified error message and a reference to the inner exception
		/// that is the cause of this exception
		/// </summary>
		/// <param name="message">The error message that explains the reason for the exception</param>
		/// <param name="innerException">The exception that is the cause of the current exception</param>
		internal CustomUsageStatisticsFormatException(string message, Exception innerException)
			: base(message, innerException)
		{ }
	}
}