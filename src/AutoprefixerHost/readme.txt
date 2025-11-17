

   --------------------------------------------------------------------------------
                   README file for Autoprefixer Host for .NET v3.1.1

   --------------------------------------------------------------------------------

           Copyright (c) 2019-2025 Andrey Taritsyn - http://www.taritsyn.ru


   ===========
   DESCRIPTION
   ===========
   .NET wrapper around the Andrey Sitnik's Autoprefixer
   (https://github.com/postcss/autoprefixer) version 10.4.22.0.

   Since the original library is written in JavaScript, you will need a JS engine
   to run it. As a JS engine is used the JavaScript Engine Switcher library
   (https://github.com/Taritsyn/JavaScriptEngineSwitcher). For correct working, you
   need to install one of the following NuGet packages:

    * JavaScriptEngineSwitcher.ChakraCore
    * JavaScriptEngineSwitcher.Jint
    * JavaScriptEngineSwitcher.Msie (only in the Chakra JsRT modes)
    * JavaScriptEngineSwitcher.V8

   After installing the packages, you will need to register the default JS engine
   (https://github.com/Taritsyn/JavaScriptEngineSwitcher/wiki/Registration-of-JS-engines).

   =============
   RELEASE NOTES
   =============
   1. Added support for the Autoprefixer version 10.4.22.0;
   2. Performed a migration to the modern C# null/not-null checks;
   3. Added support for .NET 10;
   4. In the `lock` statements for .NET 10 target now uses a instances of the
      `System.Threading.Lock` class.

   ============
   PROJECT SITE
   ============
   https://github.com/Taritsyn/AutoprefixerHost