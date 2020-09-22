//------------------------------------------------------------------------------
// <auto-generated>
//	 This code was generated by a tool.
//
//	 Changes to this file may cause incorrect behavior and will be lost if
//	 the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
namespace AutoprefixerHost.Resources
{
	using System;
	using System.Globalization;
	using System.Reflection;
	using System.Resources;

	/// <summary>
	/// A strongly-typed resource class, for looking up localized strings, etc.
	/// </summary>
	internal class Strings
	{
		private static Lazy<ResourceManager> _resourceManager =
			new Lazy<ResourceManager>(() => new ResourceManager(
				"AutoprefixerHost.Resources.Strings",
#if NET40
				typeof(Strings).Assembly
#else
				typeof(Strings).GetTypeInfo().Assembly
#endif
			));

		private static CultureInfo _resourceCulture;

		/// <summary>
		/// Returns a cached ResourceManager instance used by this class
		/// </summary>
		internal static ResourceManager ResourceManager
		{
			get
			{
				return _resourceManager.Value;
			}
		}

		/// <summary>
		/// Overrides a current thread's CurrentUICulture property for all
		/// resource lookups using this strongly typed resource class
		/// </summary>
		internal static CultureInfo Culture
		{
			get
			{
				return _resourceCulture;
			}
			set
			{
				_resourceCulture = value;
			}
		}

		/// <summary>
		/// Looks up a localized string similar to "The parameter '{0}' must be a non-empty string."
		/// </summary>
		internal static string Common_ArgumentIsEmpty
		{
			get { return GetString("Common_ArgumentIsEmpty"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "Can't find string code that corresponding to the value '{0}' of enumeration type `{1}`."
		/// </summary>
		internal static string Common_EnumValueToCodeConversionFailed
		{
			get { return GetString("Common_EnumValueToCodeConversionFailed"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "See the original error message: &quot;{0}&quot;."
		/// </summary>
		internal static string Common_SeeOriginalErrorMessage
		{
			get { return GetString("Common_SeeOriginalErrorMessage"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "Column number"
		/// </summary>
		internal static string ErrorDetails_ColumnNumber
		{
			get { return GetString("ErrorDetails_ColumnNumber"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "Description"
		/// </summary>
		internal static string ErrorDetails_Description
		{
			get { return GetString("ErrorDetails_Description"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "File"
		/// </summary>
		internal static string ErrorDetails_File
		{
			get { return GetString("ErrorDetails_File"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "Line number"
		/// </summary>
		internal static string ErrorDetails_LineNumber
		{
			get { return GetString("ErrorDetails_LineNumber"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "Message"
		/// </summary>
		internal static string ErrorDetails_Message
		{
			get { return GetString("ErrorDetails_Message"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "Source fragment"
		/// </summary>
		internal static string ErrorDetails_SourceFragment
		{
			get { return GetString("ErrorDetails_SourceFragment"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "Type"
		/// </summary>
		internal static string ErrorDetails_Type
		{
			get { return GetString("ErrorDetails_Type"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "During loading of the Autoprefixer error has occurred."
		/// </summary>
		internal static string Processor_AutoprefixerNotLoaded
		{
			get { return GetString("Processor_AutoprefixerNotLoaded"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "Could not find the statistics for country code '{0}'."
		/// </summary>
		internal static string Processor_CountryStatisticsNotFound
		{
			get { return GetString("Processor_CountryStatisticsNotFound"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "During processing of CSS code by using the Autoprefixer a JavaScript error has occurred: {0}"
		/// </summary>
		internal static string Processor_JsErrorDuringProcessing
		{
			get { return GetString("Processor_JsErrorDuringProcessing"); }
		}

		/// <summary>
		/// Looks up a localized string similar to "The value of 'Stats' property has an incorrect format."
		/// </summary>
		internal static string Processor_StatsPropertyHasIncorrectFormat
		{
			get { return GetString("Processor_StatsPropertyHasIncorrectFormat"); }
		}

		private static string GetString(string name)
		{
			string value = ResourceManager.GetString(name, _resourceCulture);

			return value;
		}
	}
}