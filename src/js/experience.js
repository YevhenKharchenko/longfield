import Swiper from 'swiper';
import 'swiper/css/bundle';
import sprite from '../img/sprite.svg';

const experienceLeftArrow = document.getElementById('experienceLeftArrow');
const experienceRightArrow = document.getElementById('experienceRightArrow');
const experienceDots = document.querySelectorAll('.experience-dot');

let experienceSwiper;

experienceSwiper = new Swiper('.experience-swiper-container', {
  direction: 'horizontal',
  loop: false,
  grabCursor: true,
  slidesPerView: 1,
  initialSlide: 0,
  spaceBetween: 16,
  grabCursor: true,
  allowTouchMove: true,
  speed: 500,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
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
        .querySelector('.experience-swiper-container')
        .classList.add('show');
    },
    slideChange: function () {
      updateExperienceArrows(this);
      updateArrowIcons();
      updateExperienceDots(this.realIndex);
    },
  },
});

updateExperienceArrows(experienceSwiper);

function updateExperienceArrows(swiper) {
  experienceLeftArrow.disabled = swiper.isBeginning;
  experienceRightArrow.disabled = swiper.isEnd;
}

experienceLeftArrow.addEventListener('click', () => {
  experienceSwiper.slidePrev();
});

experienceRightArrow.addEventListener('click', () => {
  experienceSwiper.slideNext();
});

function updateArrowIcons() {
  const leftIcon = experienceLeftArrow.querySelector('use');
  const rightIcon = experienceRightArrow.querySelector('use');

  if (experienceLeftArrow.disabled) {
    leftIcon.setAttribute('href', `${sprite}#icon-arrow-left`);
  } else {
    leftIcon.setAttribute('href', `${sprite}#icon-arrow-left-filled`);
  }

  if (experienceRightArrow.disabled) {
    rightIcon.setAttribute('href', `${sprite}#icon-arrow-right`);
  } else {
    rightIcon.setAttribute('href', `${sprite}#icon-arrow-right-filled`);
  }
}

updateArrowIcons();

function updateExperienceDots(index) {
  experienceDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

experienceDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    experienceSwiper.slideTo(index);
  });
});
