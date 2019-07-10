using System.Collections.Generic;

using NUnit.Framework;

namespace AutoprefixerHost.Tests
{
	[TestFixture]
	public class InputSourceMapTests : FileSystemTestsBase
	{
		private List<string> _targetBrowsers = new List<string> { "last 4 version" };

		public override string BaseDirectoryPath => "Files/input-source-maps/";


		[SetUp]
		public void Init()
		{
			JsEngineSwitcherInitializer.Initialize();
		}

		[Test]
		public void GenerationOfSourceMap()
		{
			// Arrange
			var sourceMapDisabledOptions = new ProcessingOptions
			{
				Browsers = _targetBrowsers,
				SourceMap = false
			};
			var sourceMapEnabledOptions = new ProcessingOptions
			{
				Browsers = _targetBrowsers,
				SourceMap = true
			};

			const string inputPath = "style.css";
			const string outputPath = "style.out.css";
			string content = GetFileContent("compiled-content.css");
			string inputSourceMap = GetFileContent("source-map-from-compilation.css.map");

			string processedContent1 = GetFileContent("processed-content.css");
			string sourceMap1 = string.Empty;

			string processedContent2 = GetFileContent("processed-content-with-source-map-url.css");
			string sourceMap2 = GetFileContent("source-map-from-processing.css.map");

			// Act
			ProcessingResult result1;
			ProcessingResult result2;

			using (var sourceMapDisabledAutoprefixer = new Autoprefixer(sourceMapDisabledOptions))
			{
				result1 = sourceMapDisabledAutoprefixer.Process(content, inputPath, outputPath, null, inputSourceMap);
			}

			using (var sourceMapEnabledAutoprefixer = new Autoprefixer(sourceMapEnabledOptions))
			{
				result2 = sourceMapEnabledAutoprefixer.Process(content, inputPath, outputPath, null, inputSourceMap);
			}

			// Assert
			Assert.AreEqual(processedContent1, result1.ProcessedContent);
			Assert.AreEqual(sourceMap1, result1.SourceMap);

			Assert.AreEqual(processedContent2, result2.ProcessedContent);
			Assert.AreEqual(sourceMap2, result2.SourceMap);
		}

		[Test]
		public void GenerationOfSourceMapWithIncludingContents()
		{
			// Arrange
			var sourceMapWithoutContentsOptions = new ProcessingOptions
			{
				Browsers = _targetBrowsers,
				SourceMap = true,
				SourceMapIncludeContents = false
			};
			var sourceMapWithContentsOptions = new ProcessingOptions
			{
				Browsers = _targetBrowsers,
				SourceMap = true,
				SourceMapIncludeContents = true
			};

			const string inputPath = "style.css";
			const string outputPath = "style.out.css";
			string content = GetFileContent("compiled-content.css");
			string inputSourceMapWithContents = GetFileContent("source-map-from-compilation-with-contents.css.map");

			string processedContent1 = GetFileContent("processed-content-with-source-map-url.css");
			string sourceMap1 = GetFileContent("source-map-from-processing.css.map");

			string processedContent2 = GetFileContent("processed-content-with-source-map-url.css");
			string sourceMap2 = GetFileContent("source-map-from-processing-with-contents.css.map");

			// Act
			ProcessingResult result1;
			ProcessingResult result2;

			using (var sourceMapWithoutContentsAutoprefixer = new Autoprefixer(sourceMapWithoutContentsOptions))
			{
				result1 = sourceMapWithoutContentsAutoprefixer.Process(content, inputPath, outputPath, null,
					inputSourceMapWithContents);
			}

			using (var sourceMapWithContentsAutoprefixer = new Autoprefixer(sourceMapWithContentsOptions))
			{
				result2 = sourceMapWithContentsAutoprefixer.Process(content, inputPath, outputPath, null,
					inputSourceMapWithContents);
			}

			// Assert
			Assert.AreEqual(processedContent1, result1.ProcessedContent);
			Assert.AreEqual(sourceMap1, result1.SourceMap);

			Assert.AreEqual(processedContent2, result2.ProcessedContent);
			Assert.AreEqual(sourceMap2, result2.SourceMap);
		}

		[Test]
		public void GenerationOfInlineSourceMap()
		{
			// Arrange
			var inlineSourceMapDisabledOptions = new ProcessingOptions
			{
				Browsers = _targetBrowsers,
				SourceMap = true,
				InlineSourceMap = false
			};
			var inlineSourceMapEnabledOptions = new ProcessingOptions
			{
				Browsers = _targetBrowsers,
				SourceMap = true,
				InlineSourceMap = true
			};

			const string inputPath = "style.css";
			const string outputPath = "style.out.css";
			string content = GetFileContent("compiled-content-with-inline-source-map.css");

			string processedContent1 = GetFileContent("processed-content-with-source-map-url.css");
			string sourceMap1 = GetFileContent("source-map-from-processing.css.map");

			string processedContent2 = GetFileContent("processed-content-with-inline-source-map.css");
			string sourceMap2 = GetFileContent("source-map-from-processing.css.map");

			// Act
			ProcessingResult result1;
			ProcessingResult result2;

			using (var inlineSourceMapDisabledAutoprefixer = new Autoprefixer(inlineSourceMapDisabledOptions))
			{
				result1 = inlineSourceMapDisabledAutoprefixer.Process(content, inputPath, outputPath);
			}

			using (var inlineSourceMapEnabledAutoprefixer = new Autoprefixer(inlineSourceMapEnabledOptions))
			{
				result2 = inlineSourceMapEnabledAutoprefixer.Process(content, inputPath, outputPath);
			}

			// Assert
			Assert.AreEqual(processedContent1, result1.ProcessedContent);
			Assert.AreEqual(sourceMap1, result1.SourceMap);

			Assert.AreEqual(processedContent2, result2.ProcessedContent);
			Assert.AreEqual(sourceMap2, result2.SourceMap);
		}

		[Test]
		public void GenerationOfInlineSourceMapWithIncludingContents()
		{
			// Arrange
			var inlineSourceMapWithoutContentsOptions = new ProcessingOptions
			{
				Browsers = _targetBrowsers,
				SourceMap = true,
				InlineSourceMap = true,
				SourceMapIncludeContents = false
			};
			var inlineSourceMapWithContentsOptions = new ProcessingOptions
			{
				Browsers = _targetBrowsers,
				SourceMap = true,
				InlineSourceMap = true,
				SourceMapIncludeContents = true
			};

			const string inputPath = "style.css";
			const string outputPath = "style.out.css";
			string content = GetFileContent("compiled-content-with-inline-source-map-and-contents.css");

			string processedContent1 = GetFileContent("processed-content-with-inline-source-map.css");
			string sourceMap1 = GetFileContent("source-map-from-processing.css.map");

			string processedContent2 = GetFileContent("processed-content-with-inline-source-map-and-contents.css");
			string sourceMap2 = GetFileContent("source-map-from-processing-with-contents.css.map");

			// Act
			ProcessingResult result1;
			ProcessingResult result2;

			using (var inlineSourceMapWithoutContentsAutoprefixer = new Autoprefixer(inlineSourceMapWithoutContentsOptions))
			{
				result1 = inlineSourceMapWithoutContentsAutoprefixer.Process(content, inputPath, outputPath);
			}

			using (var inlineSourceMapWithContentsAutoprefixer = new Autoprefixer(inlineSourceMapWithContentsOptions))
			{
				result2 = inlineSourceMapWithContentsAutoprefixer.Process(content, inputPath, outputPath);
			}

			// Assert
			Assert.AreEqual(processedContent1, result1.ProcessedContent);
			Assert.AreEqual(sourceMap1, result1.SourceMap);

			Assert.AreEqual(processedContent2, result2.ProcessedContent);
			Assert.AreEqual(sourceMap2, result2.SourceMap);
		}
	}
}