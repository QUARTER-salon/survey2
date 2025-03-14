document.addEventListener('DOMContentLoaded', function() {
  const otherServiceCheckbox = document.querySelector('input[name="services"][value="その他"]');
  if (otherServiceCheckbox) {
    otherServiceCheckbox.addEventListener('change', function() {
      let otherInput = document.getElementById('otherServiceInput');
      if (this.checked) {
        if (!otherInput) {
          otherInput = document.createElement('input');
          otherInput.type = 'text';
          otherInput.name = 'otherServiceDetail';
          otherInput.id = 'otherServiceInput';
          otherInput.placeholder = '具体的なサービス内容を入力';
          this.parentElement.appendChild(otherInput);
        }
      } else {
        if (otherInput) {
          otherInput.remove();
        }
      }
    });
  }
});
