'use strict';

const gulp = require('gulp'),
			$ = require('gulp-load-plugins')();

//* Создаём задачу для SCRIPTS.

/* Bootstrap */

module.exports = function(options) {

  return function() {
  	return gulp.src(options.src, { base: '../src' }) // Выберем bootstrap файл
	    .pipe($.changed(options.dst))                  // Получаем файлы и пропускаем только изменившиеся
	    .pipe($.include())                             // Прогоним через rigger
	    .pipe($.uglify())                              // Сожмём
	    .pipe($.rename({suffix: '.min'}))              // Переименуем
	    .pipe(gulp.dest(options.dst))                  // Выплюнем готовый файл в built
  };
  
};