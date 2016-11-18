$(document).ready(function() {
// ------------------------------------------------------------------------------------
  
/* ===== INITIALIZATION OF THE PLUGINS: ===== */

	/* ----- slick-slider ----- */

	$('.slider__take-care').slick({
		// autoplay: true,
		// autoplaySpeed: 4000,
		arrows: false,
		dots: true,
		pauseOnFocus: false,
		pauseOnHover: false,
		speed: 1000
	});

	$('.carusel__reviews').slick({
		// autoplay: true,
		// autoplaySpeed: 4000,
		arrows: true,
		dots: false,
		pauseOnFocus: false,
		pauseOnHover: false,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 979,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 799,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 639,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	$('.carusel__licenses').slick({
		// autoplay: true,
		// autoplaySpeed: 4000,
		arrows: true,
		dots: false,
		pauseOnFocus: false,
		pauseOnHover: false,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 979,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 799,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 639,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	/* ----- slicknav ----- */

	$('#menu').slicknav({
		label: '',
		prependTo: '',
		appendTo: 'header',
		closeOnClick: true,
		removeClasses: true
	});

	/* ----- bpopup ----- */

	var popupForm;

	$('.js-popup').on('click', function(e) {
		e.preventDefault();
		popupForm = $('.form__popup').bPopup();
	});

	/* ----- magnific-popup ----- */

	$('.carusel__reviews').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: true,
		showCloseBtn: false,
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out'
		}
	});

	$('.carusel__licenses').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: true,
		showCloseBtn: false,
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out'
		}
	});

/* ===== CUSTOM CODE: ===== */
  
	/* ----- sending form ----- */

	$(".form__selection").submit(function(){ // пeрeхвaтывaeм всe при сoбытии oтпрaвки
		var form = $(this); // зaпишeм фoрму, чтoбы пoтoм нe былo прoблeм с this
		var error = false; // прeдвaритeльнo oшибoк нeт
		form.find('input').each( function(index, el){ // прoбeжим пo кaждoму пoлю в фoрмe
			if ($(el).val() == '') { // eсли нaхoдим пустoe
				$(el).closest('.input-group').css({
					outline: '2px solid red'
				});
				// Через 1.5 cекунды удаляем подсветку
				setTimeout(function(){
					$(el).closest('.input-group').removeAttr('style');
				},1500);
				error = true; // oшибкa
			}
		});
		if (!error) { // eсли oшибки нeт
			var data = form.serialize(); // пoдгoтaвливaeм дaнныe
			$.ajax({ // инициaлизируeм ajax зaпрoс
				type: 'POST', // oтпрaвляeм в POST фoрмaтe, мoжнo GET
				url: 'form.php', // путь дo oбрaбoтчикa, у нaс oн лeжит в тoй жe пaпкe
				dataType: 'json', // oтвeт ждeм в json фoрмaтe
				data: data, // дaнныe для oтпрaвки
				beforeSend: function(data) { // сoбытиe дo oтпрaвки
					form.find('button[type="submit"]').attr('disabled', 'disabled'); // нaпримeр, oтключим кнoпку, чтoбы нe жaли пo 100 рaз
				},
				success: function(data){ // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
					if (data['error']) { // eсли oбрaбoтчик вeрнул oшибку
						alert(data['error']); // пoкaжeм eё тeкст
					} else { // eсли всe прoшлo oк
	
						/* ----- bpopup ----- */
						if ($('.form__popup').css('display') == 'block') {
							popupForm.close();
						}
	
						// popupThanks = $('.modal__thanks').bPopup({
						// 	speed: 450,
						// 	opacity: .65,
						// 	modalClose: false,
						// 	modalColor: '#000',
						// 	transition: 'slideDown'
						// });
					}
				},
				error: function (xhr, ajaxOptions, thrownError) { // в случae нeудaчнoгo зaвeршeния зaпрoсa к сeрвeру
					alert(xhr.status); // пoкaжeм oтвeт сeрвeрa
					alert(thrownError); // и тeкст oшибки
				},
				complete: function(data) { // сoбытиe пoслe любoгo исхoдa
					form.find('input').val(''); // стираем поля
					form.find('button[type="submit"]').prop('disabled', false); // в любoм случae включим кнoпку oбрaтнo
				}
			});
		}
		return false; // отключаем стандартное действие елемента
	});

// -------------------------------------------------------------------------------------
});

/* ----- yandex map ----- */

ymaps.ready(init);

function init () {
	var myMap = new ymaps.Map("map", {
		center: [55.79635956893193,37.710413500000016],
		zoom: 16
	});
	// Создаем метку с помощью вспомогательного класса.
	var myPlacemark = new ymaps.Placemark([55.79635956893193,37.710413500000016], {
		// Свойства.
		// Содержимое иконки, балуна и хинта.
		balloonContent: '',
		hintContent: 'г. Москва, Площадь, ул.1-я Бухвостова 12/11 офис 211'
	});
	// иконка
	myPlacemark.options.set('iconImageHref', './img/icons/balloon.png');
	myPlacemark.options.set('iconImageOffset', [-15, -50]);
	myPlacemark.options.set('iconImageSize', [38, 53]);
	// Добавляем zoom.
	myMap.controls.add('smallZoomControl');
	// Добавляем все метки на карту.
	myMap.geoObjects.add(myPlacemark);
};