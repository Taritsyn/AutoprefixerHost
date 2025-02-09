﻿using System;
#if !NETSTANDARD1_3
using System.Runtime.Serialization;
#endif

namespace AutoprefixerHost
{
	/// <summary>
	/// The exception that is thrown when a loading of the Autoprefixer is failed
	/// </summary>
#if !NETSTANDARD1_3
	[Serializable]
#endif
	public sealed class AutoprefixerLoadException : AutoprefixerException
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="AutoprefixerLoadException"/> class
		/// with a specified error message
		/// </summary>
		/// <param name="message">The message that describes the error</param>
		public AutoprefixerLoadException(string message)
			: base(message)
		{ }

		/// <summary>
		/// Initializes a new instance of the <see cref="AutoprefixerLoadException"/> class
		/// with a specified error message and a reference to the inner exception
		/// that is the cause of this exception
		/// </summary>
		/// <param name="message">The error message that explains the reason for the exception</param>
		/// <param name="innerException">The exception that is the cause of the current exception</param>
		public AutoprefixerLoadException(string message, Exception innerException)
			: base(message, innerException)
		{ }
#if !NETSTANDARD1_3

		/// <summary>
		/// Initializes a new instance of the <see cref="AutoprefixerLoadException"/> class with serialized data
		/// </summary>
		/// <param name="info">The object that holds the serialized data</param>
		/// <param name="context">The contextual information about the source or destination</param>
#if NET8_0_OR_GREATER
		[Obsolete(DiagnosticId = "SYSLIB0051")]
#endif
		private AutoprefixerLoadException(SerializationInfo info, StreamingContext context)
			: base(info, context)
		{ }
#endif
	}
}