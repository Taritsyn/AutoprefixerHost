Autoprefixer Host for .NET [![NuGet version](http://img.shields.io/nuget/v/AutoprefixerHost.svg)](https://www.nuget.org/packages/AutoprefixerHost/)  [![Download count](https://img.shields.io/nuget/dt/AutoprefixerHost.svg)](https://www.nuget.org/packages/AutoprefixerHost/)
==========================

.NET wrapper around the [Andrey Sitnik's Autoprefixer](https://github.com/postcss/autoprefixer).

## Installation
This library can be installed through NuGet - [https://nuget.org/packages/AutoprefixerHost](https://nuget.org/packages/AutoprefixerHost).
Since the original library is written in JavaScript, you will need a JS engine to run it.
As a JS engine is used the [JavaScript Engine Switcher](https://github.com/Taritsyn/JavaScriptEngineSwitcher) library.
For correct working, you need to install one of the following NuGet packages:

 * [JavaScriptEngineSwitcher.ChakraCore](https://nuget.org/packages/JavaScriptEngineSwitcher.ChakraCore/)
 * [JavaScriptEngineSwitcher.V8](https://nuget.org/packages/JavaScriptEngineSwitcher.V8)
 * [JavaScriptEngineSwitcher.Msie](https://nuget.org/packages/JavaScriptEngineSwitcher.Msie) (only in the Chakra “Edge” JsRT mode)

After installing the packages, you will need to [register the default JS engine](https://github.com/Taritsyn/JavaScriptEngineSwitcher/wiki/Registration-of-JS-engines).

## Usage
When we create an instance of the <code title="AutoprefixerHost.Autoprefixer">Autoprefixer</code> class by using the constructor without parameters:

```csharp
var autoprefixer = new Autoprefixer();
```

Then we always use a JS engine registered by default. In fact, a constructor without parameters is equivalent to the following code:

```csharp
var autoprefixer = new Autoprefixer(JsEngineSwitcher.Current.CreateDefaultEngine);
```

This approach is great for web applications, but in some cases the usage of JS engine registration at global level will be redundant.
It is for such cases that the possibility of passing of the JS engine factory to the constructor is provided:

```csharp
var autoprefixer = new Autoprefixer(new ChakraCoreJsEngineFactory());
```

You can also use a delegate that creates an instance of the JS engine:

```csharp
var autoprefixer = new Autoprefixer(() => new ChakraCoreJsEngine());
```

It should also be noted, that this library does not write the result of processing to disk. `Process` method of the <code title="AutoprefixerHost.Autoprefixer">Autoprefixer</code> class return the result of processing in the form of an instance of the <code title="AutoprefixerHost.ProcessingResult">ProcessingResult</code> class. Consider in detail properties of the <code title="AutoprefixerHost.ProcessingResult">ProcessingResult</code> class:

<table border="1" style="font-size: 0.7em">
	<thead>
		<tr valign="top">
			<th>Property name</th>
			<th>Data&nbsp;type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr valign="top">
			<td><code>ProcessedContent</code></td>
			<td><code title="System.String">String</code></td>
			<td>Processed content.</td>
		</tr>
		<tr valign="top">
			<td><code>SourceMap</code></td>
			<td><code title="System.String">String</code></td>
			<td>Source map.</td>
		</tr>
		<tr valign="top">
			<td><code>Warnings</code></td>
			<td><code title="System.Collections.Generic.IList&lt;AutoprefixerHost.ProblemInfo&gt;">IList&lt;ProblemInfo&gt;</code></td>
			<td>List of the warnings.</td>
		</tr>
	</tbody>
</table>

Consider a simple example of usage of the `Process` method:

```csharp
using System;
using System.Collections.Generic;

using AutoprefixerHost;
using AutoprefixerHost.Helpers;
using JavaScriptEngineSwitcher.ChakraCore;

namespace AutoprefixerHost.Example.ConsoleApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            const string inputContent = @".example {
    display: grid;
    transition: all .5s;
    user-select: none;
    background: linear-gradient(to bottom, white, black);
}";
            var options = new ProcessingOptions
            {
                Browsers = new List<string> { "last 4 version" },
                SourceMap = true
            };

            try
            {
                using (var autoprefixer = new Autoprefixer(new ChakraCoreJsEngineFactory(), options))
                {
                    ProcessingResult result = autoprefixer.Process(inputContent, "style.css",
                        "style.out.css", "style.out.css.map", inputSourceMapContent: string.Empty);

                    Console.WriteLine("Processed content:{1}{1}{0}{1}", result.ProcessedContent,
                        Environment.NewLine);
                    Console.WriteLine("Source map:{1}{1}{0}{1}", result.SourceMap, Environment.NewLine);
                }
            }
            catch (AutoprefixerLoadException e)
            {
                Console.WriteLine("During loading of Autoprefixer an error occurred. See details:");
                Console.WriteLine();
                Console.WriteLine(AutoprefixerErrorHelpers.GenerateErrorDetails(e));
            }
            catch (AutoprefixerProcessingException e)
            {
                Console.WriteLine("During processing of CSS code an error occurred. See details:");
                Console.WriteLine();
                Console.WriteLine(AutoprefixerErrorHelpers.GenerateErrorDetails(e));
            }
            catch (AutoprefixerException e)
            {
                Console.WriteLine("During working of Autoprefixer an unknown error occurred. See details:");
                Console.WriteLine();
                Console.WriteLine(AutoprefixerErrorHelpers.GenerateErrorDetails(e));
            }
        }
    }
}
```

First we create an instance of the <code title="AutoprefixerHost.Autoprefixer">Autoprefixer</code> class, in the constructor of which we pass the JS engine factory and processing options.
Let's consider in detail properties of the <code title="AutoprefixerHost.ProcessingOptions">ProcessingOptions</code> class:

<table border="1" style="font-size: 0.7em">
	<thead>
		<tr valign="top">
			<th>Property name</th>
			<th>Data&nbsp;type</th>
			<th>Default value</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr valign="top">
			<td><code>Browsers</code></td>
			<td><code title="System.Collections.Generic.IList&lt;System.String&gt;">IList&lt;String&gt;</code></td>
			<td><code>"&gt; 0.5%"</code>, <code>"last 2 versions"</code>, <code>"Firefox ESR"</code>, <code>"not dead"</code></td>
			<td>List of queries for target browsers.</td>
		</tr>
		<tr valign="top">
			<td><code>Cascade</code></td>
			<td><code title="System.Boolean">Boolean</code></td>
			<td><code>true</code></td>
			<td>Flag for whether to create nice visual cascade of prefixes.</td>
		</tr>
		<tr valign="top">
			<td><code>Add</code></td>
			<td><code title="System.Boolean">Boolean</code></td>
			<td><code>true</code></td>
			<td>Flag for whether to add new prefixes.</td>
		</tr>
		<tr valign="top">
			<td><code>Remove</code></td>
			<td><code title="System.Boolean">Boolean</code></td>
			<td><code>true</code></td>
			<td>Flag for whether to remove outdated prefixes.</td>
		</tr>
		<tr valign="top">
			<td><code>Supports</code></td>
			<td><code title="System.Boolean">Boolean</code></td>
			<td><code>true</code></td>
			<td>Flag for whether to add prefixes for <code>@supports</code> parameters.</td>
		</tr>
		<tr valign="top">
			<td><code>Flexbox</code></td>
			<td><code title="AutoprefixerHost.FlexboxMode">FlexboxMode</code> enumeration</td>
			<td><code>All</code></td>
			<td>Mode that defines should Autoprefixer add prefixes for flexbox properties. Can take the following values:
				<ul>
					<li><code>All</code> - add prefixes for flexbox properties for all browsers</li>
					<li><code>None</code> - prevent adding prefixes for flexbox properties</li>
					<li><code>No2009</code> - add prefixes for flexbox properties only for final and IE 10 versions of specification</li>
				</ul>
			</td>
		</tr>
		<tr valign="top">
			<td><code>Grid</code></td>
			<td><code title="AutoprefixerHost.GridMode">GridMode</code> enumeration</td>
			<td><code>None</code></td>
			<td>Mode that defines should Autoprefixer add IE 10-11 prefixes for Grid Layout properties. Can take the following values:
				<ul>
					<li><code>None</code> - prevent Autoprefixer from outputting CSS Grid translations</li>
					<li><code>Autoplace</code> - enable Autoprefixer grid translations and include autoplacement support</li>
					<li><code>NoAutoplace</code> - enable Autoprefixer grid translations but exclude autoplacement support</li>
				</ul>
			</td>
		</tr>
		<tr valign="top">
			<td><code>IgnoreUnknownVersions</code></td>
			<td><code title="System.Boolean">Boolean</code></td>
			<td><code>false</code></td>
			<td>Flag for whether to do not raise error on unknown browser version in the <code>Browsers</code> property.</td>
		</tr>
		<tr valign="top">
			<td><code>Stats</code></td>
			<td><code title="System.String">String</code></td>
			<td>Empty string</td>
			<td>Custom usage statistics in JSON format for <code>&gt; 10% in my stats</code> browsers.</td>
		</tr>
		<tr valign="top">
			<td><code>SourceMap</code></td>
			<td><code title="System.Boolean">Boolean</code></td>
			<td><code>false</code></td>
			<td>Flag for whether to enable source map generation.</td>
		</tr>
		<tr valign="top">
			<td><code>InlineSourceMap</code></td>
			<td><code title="System.Boolean">Boolean</code></td>
			<td><code>false</code></td>
			<td>Flag for whether to embed <code>sourceMappingUrl</code> as data uri.</td>
		</tr>
		<tr valign="top">
			<td><code>SourceMapIncludeContents</code></td>
			<td><code title="System.Boolean">Boolean</code></td>
			<td><code>false</code></td>
			<td>Flag for whether to include contents in maps.</td>
		</tr>
		<tr valign="top">
			<td><code>OmitSourceMapUrl</code></td>
			<td><code title="System.Boolean">Boolean</code></td>
			<td><code>false</code></td>
			<td>Flag for whether to disable <code>sourceMappingUrl</code> in css output.</td>
		</tr>
	</tbody>
</table>

Then we call the `Process` method with the following parameters:

 1. `content` - CSS code.
 1. `inputPath` (optional) - path to input CSS file. Needed for generation of source map.
 1. `outputPath` (optional) - path to output CSS file. Needed for generation of source map.
 1. `sourceMapPath` (optional) - path to source map file.
 1. `inputSourceMapContent` (optional) - content of an input source map from an previous processing step (for example, Sass compilation). Will be considered in the next example.

Then output result of processing to the console.
In addition, we provide handling of the following exception types: <code title="AutoprefixerHost.AutoprefixerLoadException">AutoprefixerLoadException</code>, <code title="AutoprefixerHost.AutoprefixerProcessingException">AutoprefixerProcessingException</code> and <code title="AutoprefixerHost.AutoprefixerException">AutoprefixerException</code>.
In the Autoprefixer Host, exceptions have the following hierarchy:

  * <code title="AutoprefixerHost.AutoprefixerException">AutoprefixerException</code>
    * <code title="AutoprefixerHost.AutoprefixerLoadException">AutoprefixerLoadException</code>
    * <code title="AutoprefixerHost.AutoprefixerProcessingException">AutoprefixerProcessingException</code>

You can use the Autoprefixer with a Sass compiler from the [LibSass Host](https://github.com/Taritsyn/LibSassHost) library as follows:

```csharp
using System;
using System.Collections.Generic;

using AutoprefixerHost;
using AutoprefixerHost.Helpers;
using JavaScriptEngineSwitcher.ChakraCore;
using LibSassHost;
using LibSassHost.Helpers;

namespace LibSassAndAutoprefixerHost.Example.ConsoleApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            const string inputContent = @"$font-stack:    Helvetica, sans-serif;
$primary-color: #333;
$border-color:  #73AD21;

@mixin border-radius($radius) {
    -webkit-border-radius: $radius;
    -moz-border-radius: $radius;
    -ms-border-radius: $radius;
    border-radius: $radius;
}

@mixin no-select {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

body {
    font: 100% $font-stack;
    color: $primary-color;
    @include no-select();
}

.rounded-box {
    @include border-radius(5px);
    border: 1px solid $border-color;
    padding: 10px;
}";

            try
            {
                var compilationOptions = new CompilationOptions { SourceMap = true };
                CompilationResult compilationResult = SassCompiler.Compile(inputContent,
                    "style.scss", "style.css", options: compilationOptions);

                var processingOptions = new ProcessingOptions
                {
                    Browsers = new List<string> { "last 4 version" },
                    SourceMap = true
                };

                using (var autoprefixer = new Autoprefixer(new ChakraCoreJsEngineFactory(), processingOptions))
                {
                    ProcessingResult result = autoprefixer.Process(compilationResult.CompiledContent,
                        "style.css", "style.out.css", inputSourceMapContent: compilationResult.SourceMap);

                    Console.WriteLine("Processed content:{1}{1}{0}{1}", result.ProcessedContent,
                        Environment.NewLine);
                    Console.WriteLine("Source map:{1}{1}{0}{1}", result.SourceMap, Environment.NewLine);
                }
            }
            catch (SassException e)
            {
                Console.WriteLine("During working of Sass compiler an error occurred. See details:");
                Console.WriteLine();
                Console.WriteLine(SassErrorHelpers.GenerateErrorDetails(e));
            }
            catch (AutoprefixerException e)
            {
                Console.WriteLine("During working of Autoprefixer an error occurred. See details:");
                Console.WriteLine();
                Console.WriteLine(AutoprefixerErrorHelpers.GenerateErrorDetails(e));
            }
        }
    }
}
```

In principle, this code does not need comments.
The only thing worth noting is that we pass to the `Process` method a CSS code and source map, which were obtained as a result of the compilation of SCSS code.

## Who's Using Autoprefixer Host for .NET
If you use the Autoprefixer Host for .NET in some project, please send me a message so I can include it in this list:

 * [Bundle Transformer](https://github.com/Taritsyn/BundleTransformer) by Andrey Taritsyn