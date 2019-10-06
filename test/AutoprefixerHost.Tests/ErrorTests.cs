using System;
using System.Collections.Generic;

using JavaScriptEngineSwitcher.Core;
using JavaScriptEngineSwitcher.Jint;

using NUnit.Framework;

namespace AutoprefixerHost.Tests
{
	[TestFixture]
	public class ErrorTests
	{
		[SetUp]
		public void Init()
		{
			JsEngineSwitcherInitializer.Initialize();
		}

		[Test]
		public void MappingJsonError()
		{
			// Arrange
			var options = new ProcessingOptions
			{
				Browsers = new List<string> { "> 5% in my stats" },
				Stats = @"{
  ""ie"": {
    ""6"": 0.01,
    ""7"": 0.4,
    ""8"": 1.5
  },
  ""chrome"": {
    …
  },
  …
}"
			};

			// Act
			AutoprefixerLoadException exception = null;

			try
			{
				using (var autoprefixer = new Autoprefixer(options))
				{ }
			}
			catch (AutoprefixerLoadException e)
			{
				exception = e;
			}

			// Assert
			Assert.NotNull(exception);
			Assert.AreEqual("The value of 'Stats' property has an incorrect format.", exception.Message);
			Assert.AreEqual("The value of 'Stats' property has an incorrect format.", exception.Description);
		}

		[Test]
		public void MappingJavaScriptError()
		{
			// Arrange
			IJsEngineFactory jsEngineFactory = new JintJsEngineFactory();
			const string input = @".some-class {
    border-image: linear-gradient(black, white) 20% fill stretch stretch;
}";

			// Act
			string output;
			AutoprefixerLoadException exception = null;

			try
			{
				using (var autoprefixer = new Autoprefixer(jsEngineFactory))
				{
					output = autoprefixer.Process(input).ProcessedContent;
				}
			}
			catch (AutoprefixerLoadException e)
			{
				exception = e;
			}

			// Assert
			Assert.NotNull(exception);
			Assert.AreEqual(
				"During loading of the Autoprefixer error has occurred. " +
				"See the original error message: \"ReferenceError: Uint8Array is not defined" + Environment.NewLine +
				"   at AutoprefixerHost.Resources.autoprefixer-combined.min.js:36:9905\".",
				exception.Message
			);
			Assert.AreEqual(
				"ReferenceError: Uint8Array is not defined" + Environment.NewLine +
				"   at AutoprefixerHost.Resources.autoprefixer-combined.min.js:36:9905",
				exception.Description
			);
		}

		[Test]
		public void MappingPostCssError()
		{
			// Arrange
			const string input = @".example {
    display: grid;
    transition: all .5s
    user-select: none;
    background: linear-gradient(to bottom, white, black);
}";
			const string inputPath = "/build/app.css";

			// Act
			string output;
			AutoprefixerProcessingException exception = null;

			try
			{
				using (var autoprefixer = new Autoprefixer())
				{
					output = autoprefixer.Process(input, inputPath).ProcessedContent;
				}
			}
			catch (AutoprefixerProcessingException e)
			{
				exception = e;
			}

			// Assert
			Assert.NotNull(exception);
			Assert.AreEqual("/build/app.css:3:21: Missed semicolon", exception.Message);
			Assert.AreEqual("Missed semicolon", exception.Description);
			Assert.AreEqual("CssSyntaxError", exception.Type);
			Assert.AreEqual("/build/app.css", exception.File);
			Assert.AreEqual(3, exception.LineNumber);
			Assert.AreEqual(21, exception.ColumnNumber);
			Assert.AreEqual(
				"Line 2:     display: grid;" + Environment.NewLine +
				"Line 3:     transition: all .5s" + Environment.NewLine +
				"----------------------------^" + Environment.NewLine +
				"Line 4:     user-select: none;",
				exception.SourceFragment
			);
		}

		[Test]
		public void MappingBrowserslistError()
		{
			// Arrange
			var options = new ProcessingOptions { Browsers = new List<string> { "> 5% in XX" } };

			const string input = @".clipped-image {
    background-image: url(images/css3/toad.jpg);
    -moz-background-size: 120px 90px;
    -o-background-size: 120px 90px;
    -webkit-background-size: 120px 90px;
    background-size: 120px 90px;
}";
			const string inputPath = "/build/app.css";

			// Act
			string output;
			AutoprefixerProcessingException exception = null;

			try
			{
				using (var autoprefixer = new Autoprefixer(options))
				{
					output = autoprefixer.Process(input, inputPath).ProcessedContent;
				}
			}
			catch (AutoprefixerProcessingException e)
			{
				exception = e;
			}

			// Assert
			Assert.NotNull(exception);
			Assert.AreEqual("Could not find the statistics for country code 'XX'.", exception.Message);
			Assert.AreEqual("Could not find the statistics for country code 'XX'.", exception.Description);
			Assert.AreEqual("BrowserslistError", exception.Type);
			Assert.AreEqual("/build/app.css", exception.File);
			Assert.AreEqual(0, exception.LineNumber);
			Assert.AreEqual(0, exception.ColumnNumber);
			Assert.IsEmpty(exception.SourceFragment);
		}

		[Test]
		public void IgnoringUnknownVersionError()
		{
			// Arrange
			var targetBrowsers = new List<string> { "IE 38" };
			var noIgnoreErrorsOptions = new ProcessingOptions
			{
				Browsers = targetBrowsers,
				IgnoreUnknownVersions = false
			};
			var ignoreErrorsOptions = new ProcessingOptions
			{
				Browsers = targetBrowsers,
				IgnoreUnknownVersions = true
			};

			const string input = @".bordered-image {
    border-width: 27px;
    -moz-border-image: url(""images/css3/border.png"") 27 round round;
    -o-border-image: url(""images/css3/border.png"") 27 round round;
    -webkit-border-image: url(""images/css3/border.png"") 27 round round;
    border-image: url(images/css3/border.png) 27 round round;
}";
			const string inputPath = "/build/app.css";
			const string targetOutput1 = "";
			const string targetOutput2 = @".bordered-image {
    border-width: 27px;
    border-image: url(images/css3/border.png) 27 round round;
}";

			// Act
			string output1 = string.Empty;
			AutoprefixerProcessingException exception1 = null;
			string output2;

			using (var noIgnoreErrorsAutoprefixer = new Autoprefixer(noIgnoreErrorsOptions))
			{
				try
				{
					output1 = noIgnoreErrorsAutoprefixer.Process(input, inputPath).ProcessedContent;
				}
				catch (AutoprefixerProcessingException e)
				{
					exception1 = e;
				}
			}

			using (var ignoreErrorsAutoprefixer = new Autoprefixer(ignoreErrorsOptions))
			{
				output2 = ignoreErrorsAutoprefixer.Process(input, inputPath).ProcessedContent;
			}

			// Assert
			Assert.AreEqual(targetOutput1, output1);
			Assert.NotNull(exception1);
			Assert.AreEqual("Unknown version 38 of IE", exception1.Message);
			Assert.AreEqual("Unknown version 38 of IE", exception1.Description);
			Assert.AreEqual("BrowserslistError", exception1.Type);
			Assert.AreEqual("/build/app.css", exception1.File);
			Assert.AreEqual(0, exception1.LineNumber);
			Assert.AreEqual(0, exception1.ColumnNumber);
			Assert.IsEmpty(exception1.SourceFragment);

			Assert.AreEqual(targetOutput2, output2);
		}
	}
}