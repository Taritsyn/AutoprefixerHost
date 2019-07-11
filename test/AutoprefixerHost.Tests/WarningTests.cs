using System;
using System.Collections.Generic;

using NUnit.Framework;

namespace AutoprefixerHost.Tests
{
	[TestFixture]
	public class WarningTests
	{
		[SetUp]
		public void Init()
		{
			JsEngineSwitcherInitializer.Initialize();
		}

		[Test]
		public void MappingAutoprefixerWarnings()
		{
			// Arrange
			var options = new ProcessingOptions{
				Browsers = new List<string> { "last 4 version" },
				Grid = GridMode.Autoplace
			};

			const string content = @".some-class {
    /* autoprefixer: off */
    -webkit-box-shadow: 0 0 20px #555;
       -moz-box-shadow: 0 0 20px #555;
            box-shadow: 0 0 20px #555;
    /* autoprefixer: on */
    mask: none;
}

.grid-conflict {
    display: grid;
    grid-gap: 10px;
    grid-template:
        ""g   g"" 100px
        ""g   g"" 100px
        ""h   h"" 100px /
        1fr  1fr;
}";
			const string inputPath = "/build/app.css";
			const string targetProcessedContent = @".some-class {
    /* autoprefixer: off */
    -webkit-box-shadow: 0 0 20px #555;
       -moz-box-shadow: 0 0 20px #555;
            box-shadow: 0 0 20px #555;
    /* autoprefixer: on */
    mask: none;
}

.grid-conflict {
    display: -ms-grid;
    display: grid;
    grid-gap: 10px;
    -ms-grid-rows: 100px 10px 100px 10px 100px;
    -ms-grid-columns: 1fr 10px 1fr;
        grid-template:
        ""g   g"" 100px
        ""g   g"" 100px
        ""h   h"" 100px /
        1fr  1fr;
}";

			// Act
			string processedContent;
			IList<ProblemInfo> warnings;

			using (var autoprefixer = new Autoprefixer(options))
			{
				ProcessingResult result = autoprefixer.Process(content, inputPath);
				processedContent = result.ProcessedContent;
				warnings = result.Warnings;
			}

			// Assert
			Assert.AreEqual(targetProcessedContent, processedContent);

			Assert.AreEqual(2, warnings.Count);

			Assert.AreEqual(
				"autoprefixer: /build/app.css:6:5: " +
				"Second Autoprefixer control comment was ignored. " +
				"Autoprefixer applies control comment to whole block, not to next rules.",
				warnings[0].Message
			);
			Assert.AreEqual(
				"Second Autoprefixer control comment was ignored. " +
				"Autoprefixer applies control comment to whole block, not to next rules.",
				warnings[0].Description
			);
			Assert.AreEqual("/build/app.css", warnings[0].File);
			Assert.AreEqual(6, warnings[0].LineNumber);
			Assert.AreEqual(5, warnings[0].ColumnNumber);
			Assert.AreEqual(
				"Line 5:             box-shadow: 0 0 20px #555;" + Environment.NewLine +
				"Line 6:     /* autoprefixer: on */" + Environment.NewLine +
				"------------^" + Environment.NewLine +
				"Line 7:     mask: none;",
				warnings[0].SourceFragment
			);

			Assert.AreEqual(
				"autoprefixer: /build/app.css:13:5: " +
				"Can not find grid areas: g, h",
				warnings[1].Message
			);
			Assert.AreEqual("Can not find grid areas: g, h", warnings[1].Description);
			Assert.AreEqual("/build/app.css", warnings[1].File);
			Assert.AreEqual(13, warnings[1].LineNumber);
			Assert.AreEqual(5, warnings[1].ColumnNumber);
			Assert.AreEqual(
				"Line 12:     grid-gap: 10px;" + Environment.NewLine +
				"Line 13:     grid-template:" + Environment.NewLine +
				"-------------^" + Environment.NewLine +
				"Line 14:         \"g   g\" 100px",
				warnings[1].SourceFragment
			);
		}
	}
}