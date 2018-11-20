module.exports = {
	dist: {
		options: {
			sourcemap: 'none',
		},
		files: [{
			expand: true,
			cwd: 'static/scss',
			src: ['*.scss'],
			dest: 'static/css',
			ext: '.css'
		}]
	}
};