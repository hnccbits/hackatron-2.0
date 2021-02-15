//jshint esversion:6

$(document).ready(function () {
  $('.detail-register').tilt({
    axis: 'x',
  });

  $('.prize__box>*').tilt({
    scale: 1.1
  });
});

const translate = document.querySelectorAll('.translate');
const header = document.querySelector('.header');
const logo = document.querySelector('.logo');
const layerBottom = document.querySelector('.layer');
const details = document.querySelector('.details');
const stemBg = document.querySelector('.stem-background');

const detailHeight = details.offsetHeight;
const headerHeight = header.offsetHeight;
window.addEventListener('scroll', () => {
  let scroll = window.pageYOffset;
  let mainY = details.getBoundingClientRect();

  translate.forEach((element) => {
    let speed = element.dataset.speed;
    element.style.transform = `translateY(${scroll * speed}px)`;
  });

  logo.style.opacity = -(scroll / headerHeight) + 1;

  if (scroll * 0.12 >= 50) {
    layerBottom.style.height = `${scroll * 0.12}px`;
  } else layerBottom.style.height = `50px`;
  
});




// Code for Accordion
$('.accordion-header').click(function (e) {

  let $this = $(this);
  const x = $this.parent().parent().find('.show');
  x.prev().children().last().toggleClass('rotate-clockwise');

  if ($this.next().hasClass('show')) {
    $this.children().last().removeClass('rotate-clockwise');
    $this.next().removeClass('show');
    $this.next().slideUp(400);
  } else {
    $this.children().last().addClass('rotate-clockwise');
    $this.parent().parent().find('.accordion-content').removeClass('show');
    $this.parent().parent().find('.accordion-content').slideUp(400);
    $this.next().toggleClass('show');
    $this.next().slideToggle(400);
  }
});


// Code for Problem Tracks

const nodes = [].slice.call(document.querySelectorAll('li'), 0);
const directions = {
  0: 'top',
  1: 'right',
  2: 'bottom',
  3: 'left'
};
const classNames = ['in', 'out'].map((p) => Object.values(directions).map((d) => `${p}-${d}`)).reduce((a, b) => a.concat(b));

const getDirectionKey = (ev, node) => {
  const {
    width,
    height,
    top,
    left
  } = node.getBoundingClientRect();
  const l = ev.pageX - (left + window.pageXOffset);
  const t = ev.pageY - (top + window.pageYOffset);
  const x = (l - (width / 2) * (width > height ? (height / width) : 1));
  const y = (t - (height / 2) * (height > width ? (width / height) : 1));
  return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
};

class Item {
  constructor(element) {
    this.element = element;
    this.element.addEventListener('mouseover', (ev) => this.update(ev, 'in'));
    this.element.addEventListener('mouseout', (ev) => this.update(ev, 'out'));
  }

  update(ev, prefix) {
    this.element.classList.remove(...classNames);
    this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
  }
}

nodes.forEach(node => new Item(node));


(function($) {

	$(document).ready(function() {
		setupFade();
		setupClickToScroll();
		setupPostAnimation();
		setupScrollToTop();
     enableScrollAbortion();

		// Trigger window.scroll, this will initiate some of the scripts
		$(window).scroll();
  });
  
  
  // Allow user to cancel scroll animation by manually scrolling
  function enableScrollAbortion() {
    var $viewport = $('html, body');
    $viewport.on('scroll mousedown DOMMouseScroll mousewheel keyup', function(e) {
        if ( e.which > 0 || e.type === 'mousedown' || e.type === 'mousewheel') {
             $viewport.stop();
        }
    });
  }

	function setupScrollToTop() {
		var scrollSpeed = 750;
		$('.trigger-scroll-to-top').click(function(e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, scrollSpeed);
		});
	}


	function setupPostAnimation() {
		var posts = $('.post-wrapper .post');
		$(window).on('scroll resize', function() {

			var currScroll = $(window).scrollTop() > $(document).scrollTop() ? $(window).scrollTop() : $(document).scrollTop(),
				windowHeight = $(window).height(), // Needs to be here because window can resize
				overScroll = Math.ceil(windowHeight*.20),
				treshhold = (currScroll + windowHeight) - overScroll;

			posts.each(function() {

				var post = $(this),
					postScroll = post.offset().top

				if(postScroll > treshhold) {
					post.addClass('hidden');
				} else {
					post.removeClass('hidden');
				}

			});

		});
	}

	function setupFade() {

		var posts = $('.post-wrapper .post').reverse(),
			stemWrapper = $('.stem-wrapper'),
			halfScreen = $(window).height() / 2;

		$(window).on('scroll resize', function() {

			delay(function() {

				var currScroll = $(window).scrollTop() > $(document).scrollTop() ? $(window).scrollTop() : $(document).scrollTop(),
					scrollSplit = currScroll + halfScreen;

				posts.removeClass('active').each(function() {

					var post = $(this),
						postOffset = post.offset().top;

					if(scrollSplit > postOffset) {

						// Add active class to fade in
						post.addClass('active')

						// Get post color
						var color = post.data('stem-color') ? post.data('stem-color') : null,
							allColors = 'color-green color-yellow color-white'

						stemWrapper.removeClass(allColors);

						if(color !== null) {
							stemWrapper.addClass('color-' + color);
						}

						return false;
					}

				});
			}, 20);

		});

	}


	// function setupClickToScroll(post) {

	// 	var scrollSpeed = 750;

	// 	$('.post-wrapper .post .stem-overlay .icon').click(function(e) {
	// 		e.preventDefault();

	// 		var icon = $(this),
	// 			post = icon.closest('.post'),
	// 			postTopOffset = post.offset().top,
	// 			postHeight = post.height(),
	// 			halfScreen = $(window).height() / 2,
	// 			scrollTo = postTopOffset - halfScreen + (postHeight/2);

	// 		$('html, body').animate({
	// 			scrollTop: scrollTo
	// 		}, scrollSpeed);
	// 	});

	// }

	$("#to-top").click(function() {
		$('html,body').animate({
			scrollTop: $("#time-head").offset().top},
			'slow');
	});

})(jQuery);




/*==========  Helpers  ==========*/


// Timeout function
var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

$.fn.reverse = function() {
    return this.pushStack(this.get().reverse(), arguments);
};