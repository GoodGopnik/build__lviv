let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    sourcemaps = require('gulp-sourcemaps')


gulp.task('clean', async function(){
  del.sync('dist')
})

gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 8 versions'],
      grid: true
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('_libs.scss'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('app/images'))
});

gulp.task('export', function(){
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let BuildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
    
  let BuildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  let BuildImg = gulp.src('app/images/**/*.*')
    .pipe(gulp.dest('dist/images'));   
});

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export',))

gulp.task('default', gulp.parallel('css' ,'scss', 'js', 'browser-sync', 'watch'));