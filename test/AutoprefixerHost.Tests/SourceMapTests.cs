using System.Collections.Generic;

using NUnit.Framework;

namespace AutoprefixerHost.Tests
{
	[TestFixture]
	public class SourceMapTests : FileSystemTestsBase
	{
		private List<string> _targetBrowsers = new List<string> { "last 4 version" };

		public override string BaseDirectoryPath => "Files/source-maps/";


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
			string content = GetFileContent("content.css");

			string processedContent1 = GetFileContent("processed-content.css");
			string sourceMap1 = string.Empty;

			string processedContent2 = GetFileContent("processed-content-with-source-map-url.css");
			string sourceMap2 = GetFileContent("source-map.css.map");

			// Act
			ProcessingResult result1;
			ProcessingResult result2;

			using (var autoprefixer = new Autoprefixer())
			{
				result1 = autoprefixer.Process(content, inputPath, outputPath, options: sourceMapDisabledOptions);
				result2 = autoprefixer.Process(content, inputPath, outputPath, options: sourceMapEnabledOptions);
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
			string content = GetFileContent("content.css");

			string processedContent1 = GetFileContent("processed-content-with-source-map-url.css");
			string sourceMap1 = GetFileContent("source-map.css.map");

			string processedContent2 = GetFileContent("processed-content-with-source-map-url.css");
			string sourceMap2 = GetFileContent("source-map-with-contents.css.map");

			// Act
			ProcessingResult result1;
			ProcessingResult result2;

			using (var autoprefixer = new Autoprefixer())
			{
				result1 = autoprefixer.Process(content, inputPath, outputPath,
					options: sourceMapWithoutContentsOptions);
				result2 = autoprefixer.Process(content, inputPath, outputPath,
					options: sourceMapWithContentsOptions);
			}

			// Assert
			Assert.AreEqual(processedContent1, result1.ProcessedContent);
			Assert.AreEqual(sourceMap1, result1.SourceMap);

			Assert.AreEqual(processedContent2, result2.ProcessedContent);
			Assert.AreEqual(sourceMap2, result2.SourceMap);
		}

		[Test]
		public void GenerationOfSourceMapWithOmittingSourceMapUrl()
		{
			var sourceMapUrlIncludedOptions = new ProcessingOptions
			{
				Browsers = _targetBrowsers,
				SourceMap = true,
				OmitSourceMapUrl = false
			};
			var sourceMapUrlOmittedOptions = new ProcessingOptions
			{
				Browsers = _targetBrowsers,
				SourceMap = true,
				OmitSourceMapUrl = true
			};

			const string inputPath = "style.css";
			const string outputPath = "style.out.css";
			string content = GetFileContent("content.css");

			string processedContent1 = GetFileContent("processed-content-with-source-map-url.css");
			string sourceMap1 = GetFileContent("source-map.css.map");

			string processedContent2 = GetFileContent("processed-content.css");
			string sourceMap2 = GetFileContent("source-map.css.map");

			// Act
			ProcessingResult result1;
			ProcessingResult result2;

			using (var autoprefixer = new Autoprefixer())
			{
				result1 = autoprefixer.Process(content, inputPath, outputPath, options: sourceMapUrlIncludedOptions);
				result2 = autoprefixer.Process(content, inputPath, outputPath, options: sourceMapUrlOmittedOptions);
			}

			// Assert
			Assert.AreEqual(processedContent1, result1.ProcessedContent);
			Assert.AreEqual(sourceMap1, result1.SourceMap);

			Assert.AreEqual(processedContent2, result2.ProcessedContent);
			Assert.AreEqual(sourceMap2, result2.SourceMap);
		}

		[Test]
		public void GenerationOfSourceMapWithCustomSourceMapUrl()
		{
			// Arrange
			var sourceMapOptions = new ProcessingOptions
			{
				Browsers = _targetBrowsers,
				SourceMap = true
			};

			const string inputPath = "style.css";
			const string outputPath = "style.out.css";
			const string sourceMapPath = "custom-style.out.css.map";
			string content = GetFileContent("content.css");

			string processedContent = GetFileContent("processed-content-with-custom-source-map-url.css");
			string sourceMap = GetFileContent("source-map.css.map");

			// Act
			ProcessingResult result;

			using (var sourceMapAutoprefixer = new Autoprefixer(sourceMapOptions))
			{
				result = sourceMapAutoprefixer.Process(content, inputPath, outputPath, sourceMapPath);
			}

			// Assert
			Assert.AreEqual(processedContent, result.ProcessedContent);
			Assert.AreEqual(sourceMap, result.SourceMap);
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
			string content = GetFileContent("content.css");

			string processedContent1 = GetFileContent("processed-content-with-source-map-url.css");
			string sourceMap1 = GetFileContent("source-map.css.map");

			string processedContent2 = GetFileContent("processed-content-with-inline-source-map.css");
			string sourceMap2 = GetFileContent("source-map.css.map");

			// Act
			ProcessingResult result1;
			ProcessingResult result2;

			using (var autoprefixer = new Autoprefixer())
			{
				result1 = autoprefixer.Process(content, inputPath, outputPath,
					options: inlineSourceMapDisabledOptions);
				result2 = autoprefixer.Process(content, inputPath, outputPath,
					options: inlineSourceMapEnabledOptions);
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
			string content = GetFileContent("content.css");

			string processedContent1 = GetFileContent("processed-content-with-inline-source-map.css");
			string sourceMap1 = GetFileContent("source-map.css.map");

			string processedContent2 = GetFileContent("processed-content-with-inline-source-map-and-contents.css");
			string sourceMap2 = GetFileContent("source-map-with-contents.css.map");

			// Act
			ProcessingResult result1;
			ProcessingResult result2;

			using (var autoprefixer = new Autoprefixer())
			{
				result1 = autoprefixer.Process(content, inputPath, outputPath,
					options: inlineSourceMapWithoutContentsOptions);
				result2 = autoprefixer.Process(content, inputPath, outputPath,
					options: inlineSourceMapWithContentsOptions);
			}

			// Assert
			Assert.AreEqual(processedContent1, result1.ProcessedContent);
			Assert.AreEqual(sourceMap1, result1.SourceMap);

			Assert.AreEqual(processedContent2, result2.ProcessedContent);
			Assert.AreEqual(sourceMap2, result2.SourceMap);
		}
	}
}