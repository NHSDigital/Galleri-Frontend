import gulp from 'gulp';
import gulpSass from "gulp-sass";
import * as sassCompiler from 'sass';

const sass = gulpSass(sassCompiler);

// Compile SASS to CSS
function compileStyles() {
  return gulp.src([
    'src/app/styles/sass/**/*.scss'
  ])
    .pipe(sass())
    .pipe(gulp.dest('src/app/styles/css/'))
    .on('error', (err) => {
      console.log(err)
      process.exit(1)
    });
}

// Watch for changes within styles/
function watch() {
  gulp.watch('src/app/styles/**/*.scss', compileStyles);
}

gulp.task('build', gulp.series(compileStyles));
gulp.task('default', gulp.series(watch));
