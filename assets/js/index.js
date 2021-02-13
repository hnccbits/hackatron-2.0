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