document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('surveyForm');
  const submitBtn = document.getElementById('submitBtn');
  const reviewPromotionSection = document.getElementById('reviewPromotion');
  const thankYouSection = document.getElementById('thankYou');
  const reviewStarMessage = document.getElementById('reviewStarMessage');
  const copyReviewBtn = document.getElementById('copyReview');
  const gotoReviewBtn = document.getElementById('gotoReview');

  // submitForm()はvalidation.jsから呼ばれる
  window.submitForm = function() {
    const formData = new FormData(form);
    // 星評価はフォームデータに含まれないため、明示的に追加
    const starRating = document.getElementById('starRating').getAttribute('data-rating');
    formData.append('rating', starRating);
    
    // 送信前に必要に応じて他のフィードバック（例：回答済みマーク）の実装を追加可能
    
    // Google Apps Script へデータ送信
    fetch(window.CONFIG.APPS_SCRIPT_WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    }).then(() => {
      // 評価に応じた表示分岐
      if (parseInt(starRating) >= 4) {
        // 高評価の場合：口コミ促進画面を表示
        const store = formData.get('store');
        reviewStarMessage.textContent = (starRating == 5 ? '星5ありがとうございます！' : '星4ありがとうございます！');
        reviewPromotionSection.classList.remove('hidden');
        form.classList.add('hidden');
        // 選択店舗に応じたGoogleマップ口コミURLを設定
        if (window.CONFIG.STORE_REVIEW_URLS[store]) {
          gotoReviewBtn.addEventListener('click', function() {
            window.location.href = window.CONFIG.STORE_REVIEW_URLS[store];
          });
        }
      } else {
        // 低評価の場合：シンプルなお礼メッセージを表示
        thankYouSection.classList.remove('hidden');
        form.classList.add('hidden');
      }
    }).catch(error => {
      console.error('Error!', error.message);
    });
  };

  // 口コミ促進画面のクリップボードコピー機能
  copyReviewBtn.addEventListener('click', function() {
    const reviewText = `星${document.getElementById('starRating').getAttribute('data-rating')}ありがとうございます！
いつも当店をご利用いただき、誠にありがとうございます。
もしよろしければ、以下のコメントをコピーして「Googleマップ」にご投稿いただけますと大変励みになります。

- ボタンを押すと簡単にコピーできます
- 投稿ページが開いたらペーストしていただくだけでOKです

今後とも皆様に喜んでいただけるよう、スタッフ一同さらに技術を磨いてまいります。
どうぞよろしくお願いいたします。`;
    navigator.clipboard.writeText(reviewText).then(() => {
      alert('口コミ文をコピーしました。');
    }).catch(err => {
      alert('コピーに失敗しました。手動でコピーしてください。');
    });
  });
});
