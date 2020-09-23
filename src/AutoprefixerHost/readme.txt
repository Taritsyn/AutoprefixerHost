﻿

   --------------------------------------------------------------------------------
                   README file for Autoprefixer Host for .NET v2.0.0

   --------------------------------------------------------------------------------

           Copyright (c) 2019-2020 Andrey Taritsyn - http://www.taritsyn.ru


   ===========
   DESCRIPTION
   ===========
   .NET wrapper around the Andrey Sitnik's Autoprefixer
   (https://github.com/postcss/autoprefixer) version 10.0.0.2.

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
   1. Added support of the Autoprefixer version 10.0.0.2;
   2. Changed a format of error messages and warnings;
   3. The `Version` static property has been converted to an instance property.

   ============
   PROJECT SITE
   ============
   https://github.com/Taritsyn/AutoprefixerHost