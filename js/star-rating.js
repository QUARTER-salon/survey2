document.addEventListener('DOMContentLoaded', function() {
  const starRatingContainer = document.getElementById('starRating');
  const numericRatingDisplay = document.querySelector('.numeric-rating');
  let currentRating = 0;
  
  // 5つの星を生成
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.classList.add('star');
    star.dataset.value = i;
    star.innerHTML = '☆'; // デフォルトは空の星
    star.addEventListener('click', function() {
      currentRating = this.dataset.value;
      updateStars(currentRating);
      starRatingContainer.setAttribute('data-rating', currentRating);
      numericRatingDisplay.textContent = currentRating;
      // ※低評価（例：1～3星）の場合のフィードバックはsubmit後の処理で対応
    });
    star.addEventListener('mouseover', function() {
      updateStars(this.dataset.value);
    });
    star.addEventListener('mouseout', function() {
      updateStars(currentRating);
    });
    starRatingContainer.appendChild(star);
  }

  function updateStars(rating) {
    const stars = starRatingContainer.querySelectorAll('.star');
    stars.forEach(star => {
      if (star.dataset.value <= rating) {
        star.innerHTML = '★'; // 塗りつぶし星
        star.classList.add('selected');
      } else {
        star.innerHTML = '☆'; // 空の星
        star.classList.remove('selected');
      }
    });
  }
});
