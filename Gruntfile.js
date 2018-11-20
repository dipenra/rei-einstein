module.exports = function(grunt) {
	var path = require('path');
	
	var configs = require('load-grunt-config')(grunt, {
		configPath: path.join(process.cwd(), 'grunt'),
	});

	grunt.initConfig(configs);
};