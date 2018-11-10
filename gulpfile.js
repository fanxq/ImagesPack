var gulp = require('gulp');

gulp.task('default', function() {
    gulp.src([
        'background.js','manifest.json',
        './images/icon16.png',
        './images/icon48.png',
        './images/icon128.png',
        './src/iframe/iframe.html'
    ])
    .pipe(gulp.dest('out'));
});