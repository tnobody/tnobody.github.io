var gulp = require('gulp');
var _ = require('lodash');
var gulpMarkdown = require('gulp-markdown');
var gulpIntercept = require('gulp-intercept');
var helper = require('./src/build/buildHelper.js');
var q = require('q');
var concat = require('gulp-concat');

var paths = {
    content: {
        src: ['src/content/*.md'],
        dest: 'pages/'
    },
    components: {
        js :    [
            'bower_components/jquery/dist/*min.js',
            'bower_components/bootstrap/dist/js/*.min.js'
        ],
        css:    [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        other: [
            
        ]
    }
    
};
gulp.task('copy-components', function(cb) {
    gulp.src(paths.components.css)
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest("web/css/"));
    
    gulp.src(paths.components.js)
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest("web/js/"));
    cb();
});


gulp.task('markdown', function() {
    return gulp.src(paths.content.src)
            .pipe(gulpMarkdown({}))
            .pipe(gulpIntercept(function(file) {
                var compiled = helper.getTemplate('./src/page.tpl.html');
                var compiledFile = compiled({
                    content: file.contents.toString()
                });
                file.contents = new Buffer(compiledFile);

                return file;
            }))
            //.pipe(gulpPageComposer())
            .pipe(gulp.dest(paths.content.dest));
});

gulp.task('watch', function() {
    gulp.watch(paths.content.src, ['markdown']);
});

gulp.task('default', ['copy-components','markdown', 'watch']);