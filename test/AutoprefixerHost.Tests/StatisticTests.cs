using System.Collections.Generic;

using NUnit.Framework;

namespace AutoprefixerHost.Tests
{
	[TestFixture]
	public class StatisticTests : FileSystemTestsBase
	{
		public override string BaseDirectoryPath => "Files/statistics/";


		[SetUp]
		public void Init()
		{
			JsEngineSwitcherInitializer.Initialize();
		}

		[Test]
		public void UsageOfGlobalStatistics()
		{
			// Arrange
			var options = new ProcessingOptions { Browsers = new List<string> { "cover 80%" } };

			string input = GetFileContent("content.css");
			string targetOutput = GetFileContent("processed-content-based-on-global-statistics.css");

			// Act
			string output;

			using (var autoprefixer = new Autoprefixer(options))
			{
				output = autoprefixer.Process(input).ProcessedContent;
			}

			// Assert
			Assert.AreEqual(targetOutput, output);
		}

		[Test]
		public void UsageOfRussianStatistics()
		{
			// Arrange
			var options = new ProcessingOptions { Browsers = new List<string> { "cover 80% in RU" } };

			string input = GetFileContent("content.css");
			string targetOutput = GetFileContent("processed-content-based-on-russian-statistics.css");

			// Act
			string output;

			using (var autoprefixer = new Autoprefixer(options))
			{
				output = autoprefixer.Process(input).ProcessedContent;
			}

			// Assert
			Assert.AreEqual(targetOutput, output);
		}

		[Test]
		public void UsageOfAsianStatistics()
		{
			// Arrange
			var options = new ProcessingOptions { Browsers = new List<string> { "cover 80% in alt-AS" } };

			string input = GetFileContent("content.css");
			string targetOutput = GetFileContent("processed-content-based-on-asian-statistics.css");

			// Act
			string output;

			using (var autoprefixer = new Autoprefixer(options))
			{
				output = autoprefixer.Process(input).ProcessedContent;
			}

			// Assert
			Assert.AreEqual(targetOutput, output);
		}

		[Test]
		public void UsageOfCustomStatistics()
		{
			// Arrange
			var options = new ProcessingOptions
			{
				Browsers = new List<string> { "cover 80% in my stats" },
				Stats = GetFileContent("custom-stats.json")
			};

			string input = GetFileContent("content.css");
			string targetOutput = GetFileContent("processed-content-based-on-custom-statistics.css");

			// Act
			string output;

			using (var autoprefixer = new Autoprefixer(options))
			{
				output = autoprefixer.Process(input).ProcessedContent;
			}

			// Assert
			Assert.AreEqual(targetOutput, output);
		}
	}
}