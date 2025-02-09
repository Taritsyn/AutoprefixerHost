

   --------------------------------------------------------------------------------
                   README file for Autoprefixer Host for .NET v3.0.36

   --------------------------------------------------------------------------------

           Copyright (c) 2019-2024 Andrey Taritsyn - http://www.taritsyn.ru


   ===========
   DESCRIPTION
   ===========
   .NET wrapper around the Andrey Sitnik's Autoprefixer
   (https://github.com/postcss/autoprefixer) version 10.4.20.1.

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
   1. Updated a Can I Use data;
   2. Updated a Browserslist to version 4.24.4;
   3. Updated a PostCSS to version 8.5.1;
   4. No longer supports a .NET 6;
   5. Added support for .NET 8.

   ============
   PROJECT SITE
   ============
   https://github.com/Taritsyn/AutoprefixerHost