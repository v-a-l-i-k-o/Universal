'use strict';

const gulp = require('gulp'),
			$ = require('gulp-load-plugins')(),
			combiner = require('stream-combiner2').obj;

//* Создаём задачу для STYLES.

/* Bootstrap */

module.exports = function(options) {

  return function() {
  	return combiner(
    	gulp.src(options.src),         // Выберем файл bootstrap.scss
    	$.sass(),                      // Компилируем через препроцессор
    	$.cssnano({
        zindex: false,
        reduceIdents: false
      }),                            // Сожмём файл
    	$.rename('bootstrap.min.css'), // Переименуем
    	gulp.dest(options.dst)         // Выплюнем в build
  	).on('error', $.notify.onError(function(err) {
    	return {
      	title: 'BS-CSS',
      	message: err.message
    	};
  	})); // Обворачиваем поток и вешаем обработчик ошибок
  };

};