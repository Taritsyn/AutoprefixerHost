using System.Collections.Concurrent;
using System.IO;

namespace AutoprefixerHost.Tests
{
	public abstract class FileSystemTestsBase
	{
		private readonly ConcurrentDictionary<string, string> _fileCache = new ConcurrentDictionary<string, string>();

		public abstract string BaseDirectoryPath { get; }


		public string GetFileContent(string fileName)
		{
			string path = BaseDirectoryPath + fileName;
			string content = _fileCache.GetOrAdd(path, ReadAllTextWithSameLineFeed);

			return content;
		}

		private static string ReadAllTextWithSameLineFeed(string path)
		{
			string[] lines = File.ReadAllLines(path);
			string text = string.Join("\r\n", lines);

			return text;
		}
	}
}