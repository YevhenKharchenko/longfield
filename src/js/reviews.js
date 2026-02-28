import Swiper from 'swiper';
import 'swiper/css/bundle';

const reviewsLeftArrow = document.getElementById('reviewsLeftArrow');
const reviewsRightArrow = document.getElementById('reviewsRightArrow');
const reviewsDots = document.querySelectorAll('.reviews-dot');

let reviewsSwiper;

reviewsSwiper = new Swiper('.reviews-swiper-container', {
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
      document.querySelector('.reviews-swiper-container').classList.add('show');
    },
    slideChange: function () {
      updateReviewsArrows(this);
      updateReviewsDots(this.realIndex);
    },
  },
});

function updateReviewsArrows(swiper) {
  reviewsLeftArrow.disabled = swiper.isBeginning;
  reviewsRightArrow.disabled = swiper.isEnd;
}

reviewsLeftArrow.addEventListener('click', () => {
  reviewsSwiper.slidePrev();
});

reviewsRightArrow.addEventListener('click', () => {
  reviewsSwiper.slideNext();
});

function updateReviewsDots(index) {
  reviewsDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

reviewsDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    reviewsSwiper.slideTo(index);
  });
});
