using BenchmarkDotNet.Running;

namespace AutoprefixerHost.Benchmarks
{
	public static class Program
	{
		public static void Main(string[] args)
		{
			BenchmarkRunner.Run<CssProcessingBenchmark>();
		}
	}
}