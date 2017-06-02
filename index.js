'use strict';

var path = require('path');
var glob = require('glob');
var swig = require('swig');

class SwigPlugin {

	constructor(source, options) {
		this.source = source;
		this.options = options || {};
	}

	apply(compiler) {

		compiler.plugin('emit', (compiler, callback) => {
			var swigOptions = { cache: false };
			swig.setDefaults(swigOptions);
			
			var data = this.options.data || {};
			var outputPath = this.options.outputPath || '';
			var files = glob.sync(this.source, {root: this.context, realpath: true});

			files.forEach(function(template) {
				var outputFile = outputPath + path.basename(template);
				var template = swig.compileFile(template);
				var html = template(data);

				compiler.assets[outputFile] = {
					source: function() {
						return html;
					},
					size: function() {
						return html.length;
					}
				};
			});

			callback();

		});
	}

}

module.exports = SwigPlugin;