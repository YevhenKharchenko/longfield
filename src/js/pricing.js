import Swiper from 'swiper';
import 'swiper/css/bundle';

const pricingLeftArrow = document.getElementById('pricingLeftArrow');
const pricingRightArrow = document.getElementById('pricingRightArrow');

let pricingSwiper;

pricingSwiper = new Swiper('.pricing-swiper-container', {
  direction: 'horizontal',
  loop: false,
  grabCursor: true,
  slidesPerView: 1,
  initialSlide: 1,
  spaceBetween: 60,
  grabCursor: true,
  allowTouchMove: true,
  speed: 500,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    1440: {
      slidesPerView: 3,
      grabCursor: false,
      allowTouchMove: false,
      spaceBetween: 0,
    },
  },
  on: {
    init: () => {
      document.querySelector('.pricing-swiper-container').classList.add('show');
    },
    slideChange: function () {
      updatePricingArrows(this);
    },
  },
});

updatePricingArrows(pricingSwiper);

function updatePricingArrows(swiper) {
  pricingLeftArrow.disabled = swiper.isBeginning;
  pricingRightArrow.disabled = swiper.isEnd;
}

pricingLeftArrow.addEventListener('click', () => {
  pricingSwiper.slidePrev();
});

pricingRightArrow.addEventListener('click', () => {
  pricingSwiper.slideNext();
});
