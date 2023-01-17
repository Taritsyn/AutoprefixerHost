

   --------------------------------------------------------------------------------
                   README file for Autoprefixer Host for .NET v3.0.26

   --------------------------------------------------------------------------------

           Copyright (c) 2019-2022 Andrey Taritsyn - http://www.taritsyn.ru


   ===========
   DESCRIPTION
   ===========
   .NET wrapper around the Andrey Sitnik's Autoprefixer
   (https://github.com/postcss/autoprefixer) version 10.4.13.0.

   Since the original library is written in JavaScript, you will need a JS engine
   to run it. As a JS engine is used the JavaScript Engine Switcher library
   (https://github.com/Taritsyn/JavaScriptEngineSwitcher). For correct working, you
   need to install one of the following NuGet packages:

    * JavaScriptEngineSwitcher.ChakraCore
    * JavaScriptEngineSwitcher.V8
    * JavaScriptEngineSwitcher.Msie (only in the Chakra JsRT modes)

   After installing the packages, you will need to register the default JS engine
   (https://github.com/Taritsyn/JavaScriptEngineSwitcher/wiki/Registration-of-JS-engines).

   =============
   RELEASE NOTES
   =============
   1. For latest versions of .NET now uses the System.Text.Json library as JSON
      serializer;
   2. Added a .NET Framework 4.6.1 and .NET 6 targets.

   ============
   PROJECT SITE
   ============
   https://github.com/Taritsyn/AutoprefixerHost