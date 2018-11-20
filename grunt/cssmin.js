module.exports = function (grunt, options) {
	return {
		target: {
			files: [{
				expand: true,
				cwd: 'dist/static/css',
				src: ['*.css', '!*.min.css'],
				dest: 'dist/static/css',
				ext: '.min.css'
			}]
		}
	};
};