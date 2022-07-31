using System.Collections.Generic;

using NUnit.Framework;

namespace AutoprefixerHost.Tests
{
	[TestFixture]
	public class ProcessedContent
	{
		[SetUp]
		public void Init()
		{
			JsEngineSwitcherInitializer.Initialize();
		}

		[Test]
		public void UsageOfBrowsersProperty()
		{
			// Arrange
			var defaultBrowsersOptions = new ProcessingOptions();
			var nullBrowsersOptions = new ProcessingOptions { Browsers = null };
			var emptyBrowsersOptions = new ProcessingOptions { Browsers = new List<string>() };
			var customBrowsersOptions = new ProcessingOptions { Browsers = new List<string> { "last 4 version" } };

			const string input = @".example {
    display: grid;
    transition: all .5s;
    user-select: none;
    background: linear-gradient(to bottom, white, black);
}";
			const string targetOutput1 = @".example {
    display: grid;
    transition: all .5s;
    -webkit-user-select: none;
       -moz-user-select: none;
            user-select: none;
    background: linear-gradient(to bottom, white, black);
}";
			const string targetOutput2 = targetOutput1;
			const string targetOutput3 = input;
			const string targetOutput4 = @".example {
    display: grid;
    -webkit-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    background: -webkit-gradient(linear, left top, left bottom, from(white), to(black));
    background: -o-linear-gradient(top, white, black);
    background: linear-gradient(to bottom, white, black);
}";

			// Act
			string output1;
			string output2;
			string output3;
			string output4;

			using (var autoprefixer = new Autoprefixer())
			{
				output1 = autoprefixer.Process(input, defaultBrowsersOptions).ProcessedContent;
				output2 = autoprefixer.Process(input, nullBrowsersOptions).ProcessedContent;
				output3 = autoprefixer.Process(input, emptyBrowsersOptions).ProcessedContent;
				output4 = autoprefixer.Process(input, customBrowsersOptions).ProcessedContent;
			}

			// Assert
			Assert.AreEqual(targetOutput1, output1);
			Assert.AreEqual(targetOutput2, output2);
			Assert.AreEqual(targetOutput3, output3);
			Assert.AreEqual(targetOutput4, output4);
		}

		[Test]
		public void UsageOfCascadeProperty()
		{
			// Arrange
			var cascadeDisabledOptions = new ProcessingOptions { Cascade = false };
			var cascadeEnabledOptions = new ProcessingOptions { Cascade = true };

			const string input = @".target {
    mask: url(resources.svg#c1) luminance;
}";
			const string targetOutput1 = @".target {
    -webkit-mask: url(resources.svg#c1) luminance;
    mask: url(resources.svg#c1) luminance;
}";
			const string targetOutput2 = @".target {
    -webkit-mask: url(resources.svg#c1) luminance;
            mask: url(resources.svg#c1) luminance;
}";

			// Act
			string output1;
			string output2;

			using (var autoprefixer = new Autoprefixer())
			{
				output1 = autoprefixer.Process(input, cascadeDisabledOptions).ProcessedContent;
				output2 = autoprefixer.Process(input, cascadeEnabledOptions).ProcessedContent;
			}

			// Assert
			Assert.AreEqual(targetOutput1, output1);
			Assert.AreEqual(targetOutput2, output2);
		}

		[Test]
		public void UsageOfAddProperty()
		{
			// Arrange
			var addDisabledOptions = new ProcessingOptions { Add = false };
			var addEnabledOptions = new ProcessingOptions { Add = true };

			const string input = @".enable {
    user-select: all;
}";
			const string targetOutput1 = input;
			const string targetOutput2 = @".enable {
    -webkit-user-select: all;
       -moz-user-select: all;
            user-select: all;
}";

			// Act
			string output1;
			string output2;

			using (var autoprefixer = new Autoprefixer())
			{
				output1 = autoprefixer.Process(input, addDisabledOptions).ProcessedContent;
				output2 = autoprefixer.Process(input, addEnabledOptions).ProcessedContent;
			}

			// Assert
			Assert.AreEqual(targetOutput1, output1);
			Assert.AreEqual(targetOutput2, output2);
		}

		[Test]
		public void UsageOfRemoveProperty()
		{
			// Arrange
			var removeDisabledOptions = new ProcessingOptions { Remove = false };
			var removeEnabledOptions = new ProcessingOptions { Remove = true };

			const string input = @".rounded-box {
    -webkit-border-radius: 5px;
       -moz-border-radius: 5px;
            border-radius: 5px;
    border: 1px solid #73AD21;
    padding: 10px;
}";
			const string targetOutput1 = input;
			const string targetOutput2 = @".rounded-box {
    border-radius: 5px;
    border: 1px solid #73AD21;
    padding: 10px;
}";

			// Act
			string output1;
			string output2;

			using (var autoprefixer = new Autoprefixer())
			{
				output1 = autoprefixer.Process(input, removeDisabledOptions).ProcessedContent;
				output2 = autoprefixer.Process(input, removeEnabledOptions).ProcessedContent;
			}

			// Assert
			Assert.AreEqual(targetOutput1, output1);
			Assert.AreEqual(targetOutput2, output2);
		}

		[Test]
		public void UsageOfSupportsProperty()
		{
			// Arrange
			var targetBrowsers = new List<string> { "last 4 versions" };
			var supportsDisabledOptions = new ProcessingOptions
			{
				Browsers = targetBrowsers,
				Supports = false
			};
			var supportsEnabledOptions = new ProcessingOptions
			{
				Browsers = targetBrowsers,
				Supports = true
			};

			const string input = @"@supports (animation-name: test) {
    animation-name: test;
}";
			const string targetOutput1 = @"@supports (animation-name: test) {
    -webkit-animation-name: test;
            animation-name: test;
}";
			const string targetOutput2 = @"@supports ((-webkit-animation-name: test) or (animation-name: test)) {
    -webkit-animation-name: test;
            animation-name: test;
}";

			// Act
			string output1;
			string output2;

			using (var autoprefixer = new Autoprefixer())
			{
				output1 = autoprefixer.Process(input, supportsDisabledOptions).ProcessedContent;
				output2 = autoprefixer.Process(input, supportsEnabledOptions).ProcessedContent;
			}

			// Assert
			Assert.AreEqual(targetOutput1, output1);
			Assert.AreEqual(targetOutput2, output2);
		}

		[Test]
		public void UsageOfFlexboxProperty()
		{
			// Arrange
			var targetBrowsers = new List<string> { "Chrome > 19" };
			var flexboxNoneOptions = new ProcessingOptions
			{
				Browsers = targetBrowsers,
				Flexbox = FlexboxMode.None
			};
			var flexboxAllOptions = new ProcessingOptions
			{
				Browsers = targetBrowsers,
				Flexbox = FlexboxMode.All
			};
			var flexboxNo2009Options = new ProcessingOptions
			{
				Browsers = targetBrowsers,
				Flexbox = FlexboxMode.No2009
			};

			const string input = @"A {
    flex: 1;
    transition: flex;
}";
			const string targetOutput1 = @"A {
    flex: 1;
    -webkit-transition: flex;
    transition: flex;
}";
			const string targetOutput2 = @"A {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
            flex: 1;
    -webkit-transition: -webkit-box-flex, -webkit-flex;
    transition: -webkit-box-flex, -webkit-flex;
    transition: flex;
    transition: flex, -webkit-box-flex, -webkit-flex;
}";
			const string targetOutput3 = @"A {
    -webkit-flex: 1;
            flex: 1;
    -webkit-transition: -webkit-flex;
    transition: -webkit-flex;
    transition: flex;
    transition: flex, -webkit-flex;
}";

			// Act
			string output1;
			string output2;
			string output3;

			using (var autoprefixer = new Autoprefixer())
			{
				output1 = autoprefixer.Process(input, flexboxNoneOptions).ProcessedContent;
				output2 = autoprefixer.Process(input, flexboxAllOptions).ProcessedContent;
				output3 = autoprefixer.Process(input, flexboxNo2009Options).ProcessedContent;
			}

			// Assert
			Assert.AreEqual(targetOutput1, output1);
			Assert.AreEqual(targetOutput2, output2);
			Assert.AreEqual(targetOutput3, output3);
		}

		[Test]
		public void UsageOfGridProperty()
		{
			// Arrange
			var targetBrowsers = new List<string> { "Edge 12", "IE 10" };
			var gridNoneOptions = new ProcessingOptions
			{
				Browsers = targetBrowsers,
				Grid = GridMode.None
			};
			var gridAutoplaceOptions = new ProcessingOptions
			{
				Browsers = targetBrowsers,
				Grid = GridMode.Autoplace
			};
			var gridNoAutoplaceOptions = new ProcessingOptions
			{
				Browsers = targetBrowsers,
				Grid = GridMode.NoAutoplace
			};

			const string input = @".grid-template-areas {
    display: grid;
    grid-template-areas:
        ""a-conflict a-conflict""
        ""b-conflict b-conflict"";
}

.grid-autoplace {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 30px;
}";
			const string targetOutput1 = input;
			const string targetOutput2 = @".grid-template-areas {
    display: -ms-grid;
    display: grid;
        grid-template-areas:
        ""a-conflict a-conflict""
        ""b-conflict b-conflict"";
}

.grid-autoplace {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr 30px 1fr 30px 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    -ms-grid-rows: auto;
    grid-template-rows: auto;
    grid-gap: 30px;
}

.grid-autoplace > *:nth-child(1) {
    -ms-grid-row: 1;
    -ms-grid-column: 1;
}

.grid-autoplace > *:nth-child(2) {
    -ms-grid-row: 1;
    -ms-grid-column: 3;
}

.grid-autoplace > *:nth-child(3) {
    -ms-grid-row: 1;
    -ms-grid-column: 5;
}";
			const string targetOutput3 = @".grid-template-areas {
    display: -ms-grid;
    display: grid;
        grid-template-areas:
        ""a-conflict a-conflict""
        ""b-conflict b-conflict"";
}

.grid-autoplace {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    -ms-grid-rows: auto;
    grid-template-rows: auto;
    grid-gap: 30px;
}";

			// Act
			string output1;
			string output2;
			string output3;

			using (var autoprefixer = new Autoprefixer())
			{
				output1 = autoprefixer.Process(input, gridNoneOptions).ProcessedContent;
				output2 = autoprefixer.Process(input, gridAutoplaceOptions).ProcessedContent;
				output3 = autoprefixer.Process(input, gridNoAutoplaceOptions).ProcessedContent;
			}

			// Assert
			Assert.AreEqual(targetOutput1, output1);
			Assert.AreEqual(targetOutput2, output2);
			Assert.AreEqual(targetOutput3, output3);
		}
	}
}