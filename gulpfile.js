var gulp = require('gulp');
var gulpMarkdown = require('gulp-markdown');

var paths = {
	content : {
		src : ['src/content/*.md'],
		dest: 'pages/'
	}
};

gulp.task('markdown', function() {
	return gulp.src(paths.content.src)		
		.pipe(gulpMarkdown())
		.pipe({
			on : function(func) {
				console.log('ON', arguments, func);
			}
		})
		.pipe(gulp.dest(paths.content.dest));
});


gulp.task('watch', function() {
	//gulp.watch(paths.content.src, ['markdown']);
});

gulp.task('default', ['markdown','watch']);