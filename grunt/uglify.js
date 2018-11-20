module.exports = function (grunt, options) {
	return {
		build: {
			files: [{
				expand: true,
				src: ['static/js/*.js'],
				dest: 'dist/',
				cwd: '.',
				rename: function (dst, src) {
					var file = src.replace('dist/', '');
					return dst + '/' + file.replace('.js', '.min.js');
				}
			}]
		}
	};
};