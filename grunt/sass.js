module.exports = {
	dist: {
		options: {
			sourcemap: 'none',
		},
		files: [{
			expand: true,
			cwd: 'static/scss',
			src: ['*.scss'],
			dest: 'dist/static/css',
			ext: '.css'
		}]
	}
};