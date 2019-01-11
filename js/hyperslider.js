/*
 * Hyperslider Plugin
 * Copyright 2018 by Pogadz
 */

(function($){

	$.fn.hyperslider = Hyperslider;

	// Set your default config here
	Hyperslider.DEFAULTS = {
		animation: 'fade', // slide | fade | flash
		autoplay: false, // set true if you want the slide to autoplay
		delay:  1000, // delay per slide
		controls: true, // enable/disable prev/next
		navigation: true, // enable/disable slide navigation index
		after: function(){}, // callback - fires before slide is loaded
		before: function(){} // callback - fires after slide is loaded
	}

	function Hyperslider(options){

		var self = this,
			settings = $.extend({}, Hyperslider.DEFAULTS, options, self.data()),
			renderFn = function(fn){
				var fn = Function('return (' + fn + ')')();
				if(typeof fn == 'function') return fn(self, settings);
			};

		renderFn(settings.before);

		carouselController(self, settings);

		renderFn(settings.after);

		return settings;

	}

	function carouselController(el, settings){

		var carousel = new Carousel(el, settings),

		resetTimeout = function(){
			carousel.resetDelay();
			if(settings.autoplay) carousel.autoplay(settings.delay);
		}

		carousel.init(el);

		$(el).find('.slide-nav span').on('click', function(){
			carousel.indicator($(this).text());
			carousel.removeNoTransition(el);
			resetTimeout();
		});

		$(el).find('.slide-box').each(function(){
			var self = $(this);
			var index = self.index() + 1;
			self.attr('id', 'slide-box-' + index);

		});

		$(el).find('.slide-prev').click(function(){
			carousel.previous(el);
			carousel.disableClickTransition(this);
			resetTimeout();
		});

		$(el).find('.slide-next').click(function(){
			carousel.next(el) ;
			carousel.disableClickTransition(this);
			resetTimeout();
		});

	}


	function Carousel(el, settings){

		var self = this,
		hypercount = 1,
		timeout;

		self.init = function(){

			self.generateIndicator();
			self.setCurrentIndicator(1);

			$(el).find('.slides').addClass(settings.animation);

			if($(el).find('active')) $(el).addClass('no-transition').find('.slide-box').first().addClass('active');

			if(settings.autoplay) self.autoplay(settings.delay);

			if(!settings.controls) $(el).find('.slide-control').remove();

			if(!settings.navigation) $(el).find('.slide-nav').remove();

			if(el.find('.slide-box').length <= 1) $(el).find('.slide-control, .slide-nav').remove();

		}

		self.previous = function(){

			hypercount = hypercount > 1 ? hypercount - 1 :  el.find('.slide-box').length;
			self.setCurrent(hypercount);
			self.setCurrentIndicator(hypercount);
			self.removeNoTransition();

		}

		self.next = function(){

			hypercount = hypercount < $(el).find('.slide-box').length ? hypercount + 1 : 1;
			self.setCurrent(hypercount);
			self.setCurrentIndicator(hypercount);
			self.removeNoTransition();

		}

		self.indicator = function(index){
			self.setCurrent(index);
			hypercount = parseInt(index);
			self.setCurrentIndicator(index);

		}

		self.setCurrentIndicator = function(currentIndex){
			el.find('.slide-nav span').removeClass('active');
			el.find('.slide-nav-' + currentIndex).addClass('active');
		}

		self.setCurrent = function(index){
			el.find('.slide-box').removeClass('active');
			el.find('#slide-box-' + index).addClass('active');
		}

		self.generateIndicator = function(){

			var slideNav = '';

			for(i = 1; i <= el.find('.slide-box').length; i++){
				slideNav += '<span class="slide-nav-' + i + '">' + i + '</span>';
			}

			el.append('<div class="slide-nav"></div>');
			el.find('.slide-nav').html(slideNav);

		}

		self.removeNoTransition = function(){
			$(el).removeClass('no-transition');
		}

		self.disableClickTransition = function(elem){
			$(elem).prop('disabled', true);

			setTimeout(function(){
				$(elem).prop('disabled', false);
			}, 500);
		}

		self.autoplay = function(delay){
			timeout = setTimeout(function(){
				self.autoplay();
				self.next(el);
			}, settings.delay);

		}

		self.resetDelay = function(){
			clearTimeout(timeout);
		}

	}

	$(function(){
		$('[data-hyperslider]').each(function(){
			$(this).hyperslider();
		});
	});

})(jQuery);