using System;
using System.Globalization;
using System.Text;

using AdvancedStringBuilder;

using AutoprefixerHost.Resources;

namespace AutoprefixerHost.Helpers
{
	/// <summary>
	/// Autoprefixer error helpers
	/// </summary>
	public static class AutoprefixerErrorHelpers
	{
		#region Generation of error messages

		/// <summary>
		/// Generates a Autoprefixer load error message
		/// </summary>
		/// <param name="description">Description of error</param>
		/// <param name="quoteDescription">Makes a quote from the description</param>
		/// <returns>Autoprefixer load error message</returns>
		internal static string GenerateAutoprefixerLoadErrorMessage(string description, bool quoteDescription = false)
		{
			string autoprefixerNotLoaded = Strings.Processor_AutoprefixerNotLoaded;
			string message;

			if (!string.IsNullOrWhiteSpace(description))
			{
				var stringBuilderPool = StringBuilderPool.Shared;
				StringBuilder messageBuilder = stringBuilderPool.Rent();
				messageBuilder.Append(autoprefixerNotLoaded);
				messageBuilder.Append(" ");
				if (quoteDescription)
				{
					messageBuilder.AppendFormat(Strings.Common_SeeOriginalErrorMessage, description);
				}
				else
				{
					messageBuilder.Append(description);
				}

				message = messageBuilder.ToString();
				stringBuilderPool.Return(messageBuilder);
			}
			else
			{
				message = autoprefixerNotLoaded;
			}

			return message;
		}

		/// <summary>
		/// Generates a processing error message
		/// </summary>
		/// <param name="type">Type of the processing error</param>
		/// <param name="description">Description of error</param>
		/// <param name="documentName">Document name</param>
		/// <param name="lineNumber">Line number</param>
		/// <param name="columnNumber">Column number</param>
		/// <param name="sourceFragment">Source fragment</param>
		/// <returns>Processing error message</returns>
		internal static string GenerateProcessingErrorMessage(string type, string description, string documentName,
			int lineNumber, int columnNumber, string sourceFragment)
		{
			if (description == null)
			{
				throw new ArgumentNullException(nameof(description));
			}

			if (string.IsNullOrWhiteSpace(description))
			{
				throw new ArgumentException(
					string.Format(Strings.Common_ArgumentIsEmpty, nameof(description)),
					nameof(description)
				);
			}

			var stringBuilderPool = StringBuilderPool.Shared;
			StringBuilder messageBuilder = stringBuilderPool.Rent();
			if (!string.IsNullOrWhiteSpace(type))
			{
				messageBuilder.Append(type);
				messageBuilder.Append(": ");
			}
			messageBuilder.Append(description);

			bool documentNameNotEmpty = !string.IsNullOrWhiteSpace(documentName);
			if (documentNameNotEmpty || lineNumber > 0)
			{
				messageBuilder.AppendLine();
				messageBuilder.Append("   at ");
				if (documentNameNotEmpty)
				{
					messageBuilder.Append(documentName);
				}
				if (lineNumber > 0)
				{
					if (documentNameNotEmpty)
					{
						messageBuilder.Append(":");
					}
					messageBuilder.Append(lineNumber);
					if (columnNumber > 0)
					{
						messageBuilder.Append(":");
						messageBuilder.Append(columnNumber);
					}
				}
				if (!string.IsNullOrWhiteSpace(sourceFragment))
				{
					messageBuilder.Append(" -> ");
					messageBuilder.Append(sourceFragment);
				}
			}

			string errorMessage = messageBuilder.ToString();
			stringBuilderPool.Return(messageBuilder);

			return errorMessage;
		}

		/// <summary>
		/// Generates a error message from the exception with the inner exception
		/// </summary>
		/// <param name="exception">Instance of the exception</param>
		/// <returns>Error message with original error message</returns>
		internal static string GenerateErrorMessageFromExceptionWithInnerException(Exception exception)
		{
			if (exception == null)
			{
				throw new ArgumentNullException(nameof(exception));
			}

			Exception innerException = exception.InnerException;
			if (innerException == null)
			{
				return exception.Message;
			}

			string errorMessage = exception.Message + " " +
				string.Format(Strings.Common_SeeOriginalErrorMessage, innerException.Message);

			return errorMessage;
		}

		#endregion

		#region Generation of error details

		/// <summary>
		/// Generates a detailed error message
		/// </summary>
		/// <param name="autoprefixerException">Autoprefixer exception</param>
		/// <param name="omitMessage">Flag for whether to omit message</param>
		/// <returns>Detailed error message</returns>
		public static string GenerateErrorDetails(AutoprefixerException autoprefixerException, bool omitMessage = false)
		{
			if (autoprefixerException == null)
			{
				throw new ArgumentNullException(nameof(autoprefixerException));
			}

			var stringBuilderPool = StringBuilderPool.Shared;
			StringBuilder detailsBuilder = stringBuilderPool.Rent();
			WriteCommonErrorDetails(detailsBuilder, autoprefixerException, omitMessage);

			var autoprefixerProcessingException = autoprefixerException as AutoprefixerProcessingException;
			if (autoprefixerProcessingException != null)
			{
				WriteProcessingErrorDetails(detailsBuilder, autoprefixerProcessingException);
			}

			detailsBuilder.TrimEnd();

			string errorDetails = detailsBuilder.ToString();
			stringBuilderPool.Return(detailsBuilder);

			return errorDetails;
		}

		/// <summary>
		/// Generates a detailed error message
		/// </summary>
		/// <param name="autoprefixerProcessingException">Autoprefixer processing exception</param>
		/// <param name="omitMessage">Flag for whether to omit message</param>
		/// <returns>Detailed error message</returns>
		public static string GenerateErrorDetails(AutoprefixerProcessingException autoprefixerProcessingException,
			bool omitMessage = false)
		{
			if (autoprefixerProcessingException == null)
			{
				throw new ArgumentNullException(nameof(autoprefixerProcessingException));
			}

			var stringBuilderPool = StringBuilderPool.Shared;
			StringBuilder detailsBuilder = stringBuilderPool.Rent();
			WriteCommonErrorDetails(detailsBuilder, autoprefixerProcessingException, omitMessage);
			WriteProcessingErrorDetails(detailsBuilder, autoprefixerProcessingException);

			detailsBuilder.TrimEnd();

			string errorDetails = detailsBuilder.ToString();
			stringBuilderPool.Return(detailsBuilder);

			return errorDetails;
		}

		/// <summary>
		/// Writes a detailed error message to the buffer
		/// </summary>
		/// <param name="buffer">Instance of <see cref="StringBuilder"/></param>
		/// <param name="autoprefixerException">Autoprefixer exception</param>
		/// <param name="omitMessage">Flag for whether to omit message</param>
		private static void WriteCommonErrorDetails(StringBuilder buffer,
			AutoprefixerException autoprefixerException, bool omitMessage = false)
		{
			if (!omitMessage)
			{
				buffer.AppendFormatLine("{0}: {1}", Strings.ErrorDetails_Message,
					autoprefixerException.Message);
			}
		}

		/// <summary>
		/// Writes a detailed error message to the buffer
		/// </summary>
		/// <param name="buffer">Instance of <see cref="StringBuilder"/></param>
		/// <param name="autoprefixerProcessingException">Autoprefixer processing exception</param>
		private static void WriteProcessingErrorDetails(StringBuilder buffer,
			AutoprefixerProcessingException autoprefixerProcessingException)
		{
			if (!string.IsNullOrWhiteSpace(autoprefixerProcessingException.Type))
			{
				buffer.AppendFormatLine("{0}: {1}", Strings.ErrorDetails_Type,
					autoprefixerProcessingException.Type);
			}
			buffer.AppendFormatLine("{0}: {1}", Strings.ErrorDetails_Description,
				autoprefixerProcessingException.Description);
			if (!string.IsNullOrWhiteSpace(autoprefixerProcessingException.File))
			{
				buffer.AppendFormatLine("{0}: {1}", Strings.ErrorDetails_File,
					autoprefixerProcessingException.File);
			}
			if (autoprefixerProcessingException.LineNumber > 0)
			{
				buffer.AppendFormatLine("{0}: {1}", Strings.ErrorDetails_LineNumber,
					autoprefixerProcessingException.LineNumber.ToString(CultureInfo.InvariantCulture));
			}
			if (autoprefixerProcessingException.ColumnNumber > 0)
			{
				buffer.AppendFormatLine("{0}: {1}", Strings.ErrorDetails_ColumnNumber,
					autoprefixerProcessingException.ColumnNumber.ToString(CultureInfo.InvariantCulture));
			}
			if (!string.IsNullOrWhiteSpace(autoprefixerProcessingException.SourceFragment))
			{
				buffer.AppendFormatLine("{1}:{0}{0}{2}", Environment.NewLine,
					Strings.ErrorDetails_SourceFragment,
					autoprefixerProcessingException.SourceFragment);
			}
		}

		#endregion

		#region Exception wrapping

		internal static AutoprefixerLoadException WrapAutoprefixerLoadException(Exception exception,
			bool quoteDescription = false)
		{
			string description = exception.Message;
			string message = GenerateAutoprefixerLoadErrorMessage(description, quoteDescription);

			var autoprefixerLoadException = new AutoprefixerLoadException(message, exception)
			{
				Description = description
			};

			return autoprefixerLoadException;
		}

		#endregion
	}
}