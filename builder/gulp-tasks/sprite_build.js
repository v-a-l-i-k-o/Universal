'use strict';

const gulp = require('gulp'),
			buffer = require('vinyl-buffer'),
			$ = require('gulp-load-plugins')(),
			imageminJpegtran = require('imagemin-jpegtran'),
      imageminOptipng  =  require('imagemin-optipng');

//* Создаём задачу для SPRITE.

module.exports = function(options) {

  return function() {
    var spriteData = gulp.src(options.src) // Выберем картинки для спрайта
    	.pipe($.spritesmith({
     		/* this whole image path is used in css background declarations */
        // retinaSrcFilter: ['..src/img/sprite/*@2x.png'],
     		imgName: '../img/sprite/sprite.png',
        // retinaImgName: '../img/sprite/sprite@2x.png',
     		cssName: '_sprite.scss',
     		cssFormat: 'scss',
     		padding: 2,
     		algorithm: 'diagonal',
     		cssTemplate: '../src/styles/custom/scss.template.handlebars',
     		cssVarMap: function(sprite) {
     		  sprite.name = 's-' + sprite.name
     		}
    	})); // Генерируем спрайт                                   
  	spriteData.img
  	  .pipe(buffer())
  	  .pipe($.imagemin({
  	    use: [imageminOptipng()],
  	    use: [imageminJpegtran()]
  	  }))                                               // Оптимизируем картинки 
  	  .pipe(gulp.dest(options.dst));                    // Выплюнем в built 
  	spriteData.css
  	  .pipe(gulp.dest('../src/styles/custom/_mixins')); // Выплюнем scss в mixins
  	return spriteData;
  };

};