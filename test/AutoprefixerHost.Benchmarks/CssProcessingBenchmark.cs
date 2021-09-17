using System.Collections.Generic;

using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Diagnosers;

namespace AutoprefixerHost.Benchmarks
{
	[MemoryDiagnoser]
	public class CssProcessingBenchmark
	{
		private static readonly Dictionary<string, Document> s_documents = new Dictionary<string, Document>
		{
			{ "normalize", new Document("normalize.css") },
			{ "reseter", new Document("reseter.css") },
			{ "skeleton", new Document("skeleton.css") }
		};

		public static Dictionary<string, Document> Documents
		{
			get { return s_documents; }
		}

		[ParamsSource(nameof(GetDocumentNames))]
		public string DocumentName { get; set; }


		static CssProcessingBenchmark()
		{
			JsEngineSwitcherInitializer.Initialize();
			Utils.PopulateTestData("Files", s_documents);
		}


		public static IEnumerable<string> GetDocumentNames()
		{
			foreach (string key in s_documents.Keys)
			{
				yield return key;
			}
		}

		[Benchmark]
		public void Compile()
		{
			Document document = Documents[DocumentName];
			var options = new ProcessingOptions { SourceMap = true };

			using (var autoprefixer = new Autoprefixer(options))
			{
				ProcessingResult result = autoprefixer.Process(document.Content, document.RelativePath);
			}
		}
	}
}