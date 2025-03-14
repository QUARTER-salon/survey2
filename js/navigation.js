document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.fixed-nav li');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60, // 固定ナビ分のオフセット
          behavior: 'smooth'
        });
      }
    });
  });
});
