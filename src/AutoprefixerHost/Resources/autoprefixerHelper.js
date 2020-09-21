/*global Autoprefixer */
var AutoprefixerHelper = (function (autoprefixer, undefined) {
	'use strict';

	function mixDeep(destination, source) {
		var propertyName,
			toStr = Object.prototype.toString
			;

		destination = destination || {};

		for (propertyName in source) {
			if (source.hasOwnProperty(propertyName)) {
				if (typeof source[propertyName] === 'object') {
					destination[propertyName] = toStr.call(source[propertyName]) === '[object Array]' ? [] : {};
					mixDeep(destination[propertyName], source[propertyName]);
				}
				else
				{
					destination[propertyName] = source[propertyName];
				}
			}
		}

		return destination;
	}

	function createPostCssOptions(options) {
		var postCssOptions = {};
		if (options.sourceMap) {
			postCssOptions.map = {
				inline: options.inlineSourceMap,
				sourcesContent: options.sourceMapIncludeContents,
				annotation: !options.omitSourceMapUrl
			};
		}

		return postCssOptions;
	}

	function createAutoprefixerOptions(options) {
		var autoprefixerOptions = {
			cascade: options.cascade,
			add: options.add,
			remove: options.remove,
			supports: options.supports,
			flexbox: options.flexbox,
			grid: options.grid,
			ignoreUnknownVersions: options.ignoreUnknownVersions,
			overrideBrowserslist: options.browsers,
			stats: options.stats
		};

		return autoprefixerOptions;
	}

	//#region AutoprefixerHelper class
	function AutoprefixerHelper(options) {
		this._postCssOptions = createPostCssOptions(options);
		this._autoprefixerOptions = createAutoprefixerOptions(options);
	}

	AutoprefixerHelper.prototype.process = function (content, inputPath, outputPath, sourceMapPath,
		inputSourceMapContent) {
		var result,
			postCssOptions,
			sourceMapOptions,
			autoprefixerOptions,
			autoprefixerResult,
			processedContent = '',
			sourceMap = '',
			errors = [],
			warnings = []
			;

		postCssOptions = mixDeep({ from: inputPath, to: outputPath }, this._postCssOptions);
		sourceMapOptions = postCssOptions.map;
		if (sourceMapOptions) {
			if (sourceMapPath && sourceMapOptions.annotation) {
				sourceMapOptions.annotation = sourceMapPath;
			}
			sourceMapOptions.prev = inputSourceMapContent;
		}
		autoprefixerOptions = this._autoprefixerOptions;

		try {
			autoprefixerResult = autoprefixer.process(content, postCssOptions, autoprefixerOptions);
			processedContent = autoprefixerResult.css || '';
			sourceMap = autoprefixerResult.map ? autoprefixerResult.map.toString() : '';
			autoprefixerResult.warnings.forEach(function(currentValue) {
				warnings.push({
					'message': currentValue.toString(),
					'description': currentValue.text || '',
					'file': currentValue.node.source.input.file || '',
					'lineNumber': currentValue.line || 0,
					'columnNumber': currentValue.column || 0
				});
			});
		}
		catch (e) {
			if (e.autoprefixer || e.browserslist || e.name === 'CssSyntaxError') {
				errors.push({
					'message': e.message,
					'description': e.reason || '',
					'type': e.name || '',
					'file': e.file || '',
					'lineNumber': e.line || 0,
					'columnNumber': e.column || 0
				});
			}
			else {
				throw (e);
			}
		}

		result = {
			processedContent: processedContent,
			sourceMap: sourceMap
		};
		if (errors.length > 0) {
			result.errors = errors;
		}
		if (warnings.length > 0) {
			result.warnings = warnings;
		}

		return JSON.stringify(result);
	};
	//#endregion

	return AutoprefixerHelper;
} (autoprefixer));