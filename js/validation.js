document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('surveyForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    
    // Q1：店舗選択のバリデーション
    const storeOptions = document.querySelectorAll('input[name="store"]');
    let storeSelected = false;
    storeOptions.forEach(option => {
      if (option.checked) {
        storeSelected = true;
      }
    });
    if (!storeSelected) {
      valid = false;
      const q1 = document.getElementById('q1');
      q1.classList.add('error');
      q1.querySelector('.error-message').textContent = '店舗を選択してください。';
      q1.scrollIntoView({ behavior: 'smooth' });
      highlightTemporary(q1);
    } else {
      document.getElementById('q1').classList.remove('error');
      document.getElementById('q1').querySelector('.error-message').textContent = '';
    }
    
    // Q2：星評価のバリデーション
    const ratingValue = document.getElementById('starRating').getAttribute('data-rating');
    if (!ratingValue) {
      valid = false;
      const q2 = document.getElementById('q2');
      q2.classList.add('error');
      q2.querySelector('.error-message').textContent = '評価を選択してください。';
      q2.scrollIntoView({ behavior: 'smooth' });
      highlightTemporary(q2);
    } else {
      document.getElementById('q2').classList.remove('error');
      document.getElementById('q2').querySelector('.error-message').textContent = '';
    }
    
    if (valid) {
      submitForm();
    }
  });

  function highlightTemporary(element) {
    element.classList.add('highlight');
    setTimeout(() => {
      element.classList.remove('highlight');
    }, 2000);
  }
});
