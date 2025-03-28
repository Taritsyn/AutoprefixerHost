﻿using System;
#if !NETSTANDARD1_3
using System.Runtime.Serialization;
#endif
#if !NETSTANDARD1_3 && !NET8_0_OR_GREATER
using System.Security.Permissions;
#endif
using System.Text;

using AdvancedStringBuilder;

using AutoprefixerHost.Helpers;

namespace AutoprefixerHost
{
	/// <summary>
	/// The exception that is thrown during the work of the Autoprefixer
	/// </summary>
#if !NETSTANDARD1_3
	[Serializable]
#endif
	public class AutoprefixerException : Exception
	{
		/// <summary>
		/// Description of error
		/// </summary>
		private string _description = string.Empty;

		/// <summary>
		/// Gets or sets a description of error
		/// </summary>
		public string Description
		{
			get { return _description; }
			set { _description = value; }
		}


		/// <summary>
		/// Initializes a new instance of the <see cref="AutoprefixerException"/> class
		/// with a specified error message
		/// </summary>
		/// <param name="message">The message that describes the error</param>
		public AutoprefixerException(string message)
			: base(message)
		{ }

		/// <summary>
		/// Initializes a new instance of the <see cref="AutoprefixerException"/> class
		/// with a specified error message and a reference to the inner exception
		/// that is the cause of this exception
		/// </summary>
		/// <param name="message">The error message that explains the reason for the exception</param>
		/// <param name="innerException">The exception that is the cause of the current exception</param>
		public AutoprefixerException(string message, Exception innerException)
			: base(message, innerException)
		{ }
#if !NETSTANDARD1_3

		/// <summary>
		/// Initializes a new instance of the <see cref="AutoprefixerException"/> class with serialized data
		/// </summary>
		/// <param name="info">The object that holds the serialized data</param>
		/// <param name="context">The contextual information about the source or destination</param>
#if NET8_0_OR_GREATER
		[Obsolete(DiagnosticId = "SYSLIB0051")]
#endif
		protected AutoprefixerException(SerializationInfo info, StreamingContext context)
			: base(info, context)
		{
			if (info != null)
			{
				_description = info.GetString("Description");
			}
		}


		#region Exception overrides

		/// <summary>
		/// Populates a <see cref="SerializationInfo"/> with the data needed to serialize the target object
		/// </summary>
		/// <param name="info">The <see cref="SerializationInfo"/> to populate with data</param>
		/// <param name="context">The destination (see <see cref="StreamingContext"/>) for this serialization</param>
#if !NET8_0_OR_GREATER
		[SecurityPermission(SecurityAction.Demand, SerializationFormatter = true)]
#else
		[Obsolete(DiagnosticId = "SYSLIB0051")]
#endif
		public override void GetObjectData(SerializationInfo info, StreamingContext context)
		{
			if (info == null)
			{
				throw new ArgumentNullException(nameof(info));
			}

			base.GetObjectData(info, context);
			info.AddValue("Description", _description);
		}

		#endregion
#endif

		#region Object overrides

		/// <summary>
		/// Returns a string that represents the current exception
		/// </summary>
		/// <returns>A string that represents the current exception</returns>
		public override string ToString()
		{
			string errorDetails = AutoprefixerErrorHelpers.GenerateErrorDetails(this, true);

			var stringBuilderPool = StringBuilderPool.Shared;
			StringBuilder resultBuilder = stringBuilderPool.Rent();
			resultBuilder.Append(this.GetType().FullName);
			resultBuilder.Append(": ");
			resultBuilder.Append(this.Message);

			if (errorDetails.Length > 0)
			{
				resultBuilder.AppendLine();
				resultBuilder.AppendLine();
				resultBuilder.Append(errorDetails);
			}

			if (this.InnerException != null)
			{
				resultBuilder.Append(" ---> ");
				resultBuilder.Append(this.InnerException.ToString());
			}

			if (this.StackTrace != null)
			{
				resultBuilder.AppendLine();
				resultBuilder.AppendLine(this.StackTrace);
			}

			string result = resultBuilder.ToString();
			stringBuilderPool.Return(resultBuilder);

			return result;
		}

		#endregion
	}
}