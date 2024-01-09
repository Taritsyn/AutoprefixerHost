using System.Runtime.InteropServices;

using JavaScriptEngineSwitcher.Core;
using JavaScriptEngineSwitcher.Msie;
using NUnit.Framework;

namespace AutoprefixerHost.Tests
{
	[TestFixture]
	public class OldJsEngineTests
	{
		[Test]
		public void LatestMsieChakraIsSupported()
		{
			// Arrange
			IJsEngineFactory jsEngineFactory = new MsieJsEngineFactory(new MsieSettings	{
				EngineMode = JsEngineMode.ChakraIeJsRt
			});
			const string input = @".icon-bug {
  background-image: url('http://www.codeplex.com/Download?ProjectName=bundletransformer&DownloadId=358407');
}";

			// Act
			string output;
			AutoprefixerProcessingException exception = null;

			if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
			{
				try
				{
					using (var autoprefixer = new Autoprefixer(jsEngineFactory))
					{
						output = autoprefixer.Process(input).ProcessedContent;
					}
				}
				catch (AutoprefixerLoadException)
				{
					// Ignore this error
				}
				catch (AutoprefixerProcessingException e)
				{
					exception = e;
				}
			}

			// Assert
			Assert.Null(exception);
		}
	}
}