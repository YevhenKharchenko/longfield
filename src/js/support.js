import sprite from '../img/sprite.svg';

const supportBtns = document.querySelectorAll('.support-top-text-btn');
supportBtns.forEach(btn => btn.addEventListener('click', onBtnClick));

function onBtnClick(e) {
  const supportTop = e.currentTarget;
  const supportContainer = supportTop.closest('.support-list-item');
  const bottomText = supportContainer.querySelector('.support-bottom-text');
  const iconUse = supportTop.querySelector('use');

  document.querySelectorAll('.support-list-item').forEach(item => {
    if (item !== supportContainer) {
      item.classList.remove('support-open');
      item.querySelector('.support-bottom-text').classList.remove('is-visible');
      item
        .querySelector('use')
        .setAttribute('href', `${sprite}#icon-question-mark`);
    }
  });

  bottomText.classList.toggle('is-visible');

  if (bottomText.classList.contains('is-visible')) {
    supportContainer.classList.add('support-open');
    iconUse.setAttribute('href', `${sprite}#icon-exclamation-mark`);
  } else {
    supportContainer.classList.remove('support-open');
    iconUse.setAttribute('href', `${sprite}#icon-question-mark`);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const popup = document.getElementById('success-popup');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch('form.php', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) throw new Error('Network error');
        return response.text();
      })
      .then(() => {
        form.reset();
        popup.classList.remove('hidden');
        popup.classList.add('show');

        setTimeout(() => {
          popup.classList.remove('show');
          popup.classList.add('hidden');
        }, 3000);
      })
      .catch(error => {
        console.error('Form error:', error);
      });
  });
});
