var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var project = plugins.typescript.createProject('tsconfig.json', {
  typescript: require('typescript')
});

gulp.task('copy', function() {
  return gulp.src('src/**/*.json')
    .pipe(gulp.dest('app'));
});

gulp.task('typescript', function() {
  return gulp.src('src/**/*.ts')
    .pipe(plugins.typescript(project))
    .js.pipe(gulp.dest('app'));
});

gulp.task('watch', ['typescript', 'copy'], function() {
  gulp.watch('src/**/*.ts', ['typescript']);
  gulp.watch('src/**/*.json', ['copy']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['typescript', 'copy']);
