var gulp = require('gulp');

gulp.task('default', function() {
    gulp.src([
        'background.js','manifest.json',
        './images/icon16.png',
        './images/icon48.png',
        './images/icon128.png'
    ])
    .pipe(gulp.dest('out'));
});