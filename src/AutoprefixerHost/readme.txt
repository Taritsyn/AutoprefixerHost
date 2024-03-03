

   --------------------------------------------------------------------------------
                   README file for Autoprefixer Host for .NET v3.0.33

   --------------------------------------------------------------------------------

           Copyright (c) 2019-2024 Andrey Taritsyn - http://www.taritsyn.ru


   ===========
   DESCRIPTION
   ===========
   .NET wrapper around the Andrey Sitnik's Autoprefixer
   (https://github.com/postcss/autoprefixer) version 10.4.18.0.

   Since the original library is written in JavaScript, you will need a JS engine
   to run it. As a JS engine is used the JavaScript Engine Switcher library
   (https://github.com/Taritsyn/JavaScriptEngineSwitcher). For correct working, you
   need to install one of the following NuGet packages:

    * JavaScriptEngineSwitcher.ChakraCore
    * JavaScriptEngineSwitcher.Jint
    * JavaScriptEngineSwitcher.V8
    * JavaScriptEngineSwitcher.Msie (only in the Chakra JsRT modes)

   After installing the packages, you will need to register the default JS engine
   (https://github.com/Taritsyn/JavaScriptEngineSwitcher/wiki/Registration-of-JS-engines).

   =============
   RELEASE NOTES
   =============
   Added support for the Autoprefixer version 10.4.18.0.

   ============
   PROJECT SITE
   ============
   https://github.com/Taritsyn/AutoprefixerHost