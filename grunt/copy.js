module.exports = function (grunt, options) {
    return {
		all: {
			files: [
                {expand: true, cwd: 'static/js/', src: ['*'], dest: 'dist/static/js/'},
			],
		}
    };
};