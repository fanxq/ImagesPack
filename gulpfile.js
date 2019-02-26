var gulp = require('gulp');

gulp.task('default', function () {
    gulp.src([
            './src/background.js',
            './src/manifest.json',
            './images/icon16.png',
            './images/icon48.png',
            './images/icon128.png',
            './node_modules/vue/dist/vue.min.js',
            './node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js'
        ])
        .pipe(gulp.dest('out'));
});