document.addEventListener('DOMContentLoaded', function () {
  const inputs = document.querySelectorAll(
    '.booking-form-input[type="date"], .booking-form-input[type="time"]'
  );

  inputs.forEach(input => {
    const label = input.closest('.booking-form-label');
    const placeholder = label.querySelector('.placeholder-text');

    function updatePlaceholder() {
      if (input.value) {
        placeholder.style.opacity = '0';
        placeholder.style.visibility = 'hidden';
        input.classList.add('has-value');
      } else {
        placeholder.style.opacity = '1';
        placeholder.style.visibility = 'visible';
        input.classList.remove('has-value');
      }
    }

    function hidePlaceholder() {
      placeholder.style.opacity = '0';
      placeholder.style.visibility = 'hidden';
    }

    function showPlaceholderIfEmpty() {
      if (!input.value) {
        placeholder.style.opacity = '1';
        placeholder.style.visibility = 'visible';
      }
    }

    input.addEventListener('change', updatePlaceholder);
    input.addEventListener('input', updatePlaceholder);
    input.addEventListener('focus', hidePlaceholder);
    input.addEventListener('blur', showPlaceholderIfEmpty);

    updatePlaceholder();
  });

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

        const inputs = document.querySelectorAll(
          '.booking-form-input[type="date"], .booking-form-input[type="time"]'
        );
        inputs.forEach(input => {
          const label = input.closest('.booking-form-label');
          const placeholder = label.querySelector('.placeholder-text');
          placeholder.style.opacity = '1';
          placeholder.style.visibility = 'visible';
          input.classList.remove('has-value');
        });

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
