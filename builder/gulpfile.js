'use strict';

const gulp = require('gulp'),
      watch = require('gulp-watch');

//* Записываем в переменную пути к нашим файлам.

const path = {
  src: {
    sprite:                           '../src/img/sprite/*.*',
    bs_css:          '../src/styles/bootstrap/bootstrap.scss',
    bs_js :                          '../src/js/bootstrap.js',
    fonts :                             '../src/fonts/**/*.*',
    html  :                         '../src/templates/*.html',
    img   :                   '../src/img/{bg,icons,tmp}/*.*',
    css   :                  '../src/styles/custom/main.scss',
    js    : '../src/{js/libs/*.*,js/plugins.js,js/scripts.js}'
  },

  dest: '../built',

  watch: {
    styles: '../src/styles/custom/**/*.scss',
    sprite:          '../src/img/sprite/*.*',
    fonts :            '../src/fonts/**/*.*',
    html  :     '../src/templates/**/*.html',
    img   :  '../src/img/{bg,icons,tmp}/*.*',
    js    :               '../src/js/**/*.js'
  }
};

//* Создаём функцию для подгрузки задач из внешнего файла gulp-tasks

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
};

lazyRequireTask('html:build', './gulp-tasks/html_build', {
  src: path.src.html,
  dst: path.dest
});

lazyRequireTask('js:build', './gulp-tasks/js_build', {
  src: path.src.js,
  dst: path.dest
});

lazyRequireTask('bs-js:build', './gulp-tasks/bs-js_build', {
  src: path.src.bs_js,
  dst: path.dest
});

lazyRequireTask('styles:build', './gulp-tasks/styles_build', {
  src: path.src.css,
  dst: path.dest + '/css/'
});

lazyRequireTask('bs-styles:build', './gulp-tasks/bs-styles_build', {
  src: path.src.bs_css,
  dst: path.dest + '/css/bootstrap/'
});

lazyRequireTask('img:build', './gulp-tasks/img_build', {
  src: path.src.img,
  dst: path.dest
});

lazyRequireTask('sprite:build', './gulp-tasks/sprite_build', {
  src: path.src.sprite,
  dst: path.dest + '/sprite'
});

lazyRequireTask('fonts:build', './gulp-tasks/fonts_build', {
  src: path.src.fonts,
  dst: path.dest
});

lazyRequireTask('server', './gulp-tasks/server', {
  src: path.dest
});

lazyRequireTask('clean', './gulp-tasks/clean', {
  dst: path.dest
});

lazyRequireTask('archive', './gulp-tasks/archive', {
  src: path.dest + '/**/*.*',
  dst: '../'
});

//* Создаём общую задачу для последовательного
//  запуска следующих задач:
//  HTML, STYLES, SCRIPTS, IMAGES, FONTS.

gulp.task('build', ['sprite:build'], function () {
  gulp.start('html:build', /*'bs-styles:build',*/ 'styles:build', /*'bs-js:build',*/ 'js:build', 'img:build', 'fonts:build');
});

//* Создаём задачу для наблюдения за файлами.

gulp.task('watch', function (){
  watch([path.watch.html], function () { gulp.start('html:build'); });
  watch([path.watch.styles], function () { gulp.start('styles:build'); });
  watch([path.watch.js], function () { gulp.start('js:build'); });
  watch([path.watch.sprite], function () { gulp.start('sprite:build'); });
  watch([path.watch.img], function () { gulp.start('img:build'); });
  watch([path.watch.fonts], function () { gulp.start('fonts:build'); });
});

//* Создаём задачу для наблюдения за файлами
//  после сборки и запуска локального сервера.

gulp.task('watch-server', ['build'], function () {
  gulp.start('watch', 'server');
});

//* Создаём задачу для пересборки проекта.

gulp.task('rebuild', ['clean'], function () {
  gulp.start('build');
});

//* Создаём задачу для развёртывания рабочего окружения.

gulp.task('default', ['clean'], function () {
  gulp.start('build', 'watch', 'server');
});