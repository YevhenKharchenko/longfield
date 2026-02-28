import Swiper from 'swiper';
import 'swiper/css/bundle';

const illusionsLeftArrow = document.getElementById('illusionsLeftArrow');
const illusionsRightArrow = document.getElementById('illusionsRightArrow');
const illusionsDots = document.querySelectorAll('.illusions-dot');

let illusionsSwiper;

illusionsSwiper = new Swiper('.illusions-swiper-container', {
  direction: 'horizontal',
  loop: false,
  grabCursor: true,
  slidesPerView: 1,
  initialSlide: 0,
  spaceBetween: 24,
  grabCursor: true,
  allowTouchMove: true,
  speed: 500,
  breakpoints: {
    1440: {
      slidesPerView: 4,
      grabCursor: false,
      allowTouchMove: false,
      spaceBetween: 0,
    },
  },
  on: {
    init: () => {
      document
        .querySelector('.illusions-swiper-container')
        .classList.add('show');
    },
    slideChange: function () {
      updateIllusionsArrows(this);
      updateIllusionsDots(this.realIndex);
    },
  },
});

function updateIllusionsArrows(swiper) {
  illusionsLeftArrow.disabled = swiper.isBeginning;
  illusionsRightArrow.disabled = swiper.isEnd;
}

illusionsLeftArrow.addEventListener('click', () => {
  illusionsSwiper.slidePrev();
});

illusionsRightArrow.addEventListener('click', () => {
  illusionsSwiper.slideNext();
});

function updateIllusionsDots(index) {
  illusionsDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

illusionsDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    illusionsSwiper.slideTo(index);
  });
});
