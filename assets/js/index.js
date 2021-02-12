$(document).ready(function () {
  $('.detail-register').tilt({
    axis: 'x',
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
