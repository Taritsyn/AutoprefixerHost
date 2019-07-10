using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

using AutoprefixerHost.Helpers;
using AutoprefixerHost.Resources;

namespace AutoprefixerHost
{
	/// <summary>
	/// Country statistics service
	/// </summary>
	public sealed class CountryStatisticsService
	{
		/// <summary>
		/// Name of directory, which contains a Autoprefixer country statistics
		/// </summary>
		private const string AUTOPREFIXER_COUNTRY_STATISTICS_DIRECTORY_NAME = "CountryStatistics";

		/// <summary>
		/// Set of country codes for which there are statistics
		/// </summary>
		private readonly HashSet<string> _countryCodes;

		/// <summary>
		/// Instance of country statistics service
		/// </summary>
		private static readonly Lazy<CountryStatisticsService> _instance =
			new Lazy<CountryStatisticsService>(() => new CountryStatisticsService());

		/// <summary>
		/// Gets a instance of country statistics service
		/// </summary>
		public static CountryStatisticsService Instance
		{
			get { return _instance.Value; }
		}


		/// <summary>
		/// Constructs an instance of country statistics service
		/// </summary>
		private CountryStatisticsService()
		{
			string[] allResourceNames = GetType()
#if !NET40
				.GetTypeInfo()
#endif
				.Assembly
				.GetManifestResourceNames()
				;
			string countryResourcePrefix = ResourceHelpers.ResourcesNamespace + "." +
				AUTOPREFIXER_COUNTRY_STATISTICS_DIRECTORY_NAME + ".";
			int countryResourcePrefixLength = countryResourcePrefix.Length;
			string[] countryCodes = allResourceNames
				.Where(r => r.StartsWith(countryResourcePrefix, StringComparison.Ordinal))
				.Select(r => Path.GetFileNameWithoutExtension(r.Substring(countryResourcePrefixLength)))
				.ToArray()
				;

			_countryCodes = new HashSet<string>(countryCodes);
		}


		/// <summary>
		/// Determines whether the statistics database contains the specified country
		/// </summary>
		/// <param name="countryCode">Country code</param>
		/// <returns>true if the statistics database contains an country with the specified code;
		/// otherwise, false</returns>
		public bool ContainsCountry(string countryCode)
		{
			bool result = _countryCodes.Contains(countryCode);

			return result;
		}

		/// <summary>
		/// Gets a statistics for country
		/// </summary>
		/// <param name="countryCode">Country code</param>
		/// <returns>Statistics for country</returns>
		public string GetStatisticsForCountry(string countryCode)
		{
			string resourceName = ResourceHelpers.GetResourceName(
				AUTOPREFIXER_COUNTRY_STATISTICS_DIRECTORY_NAME + "." + countryCode + ".js");
			Assembly assembly = GetType()
#if !NET40
				.GetTypeInfo()
#endif
				.Assembly
				;

			using (Stream stream = assembly.GetManifestResourceStream(resourceName))
			{
				if (stream == null)
				{
					throw new AutoprefixerProcessingException(
						string.Format(Strings.Processor_CountryStatisticsNotFound, countryCode));
				}

				using (var reader = new StreamReader(stream))
				{
					return reader.ReadToEnd();
				}
			}
		}
	}
}