var gulp = require('gulp');

gulp.task('default', function() {
    gulp.src(['background.js','manifest.json','admin_24.png'])
    .pipe(gulp.dest('out'));
});