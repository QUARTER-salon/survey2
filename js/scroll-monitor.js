document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.form-section');
  const navItems = document.querySelectorAll('.fixed-nav li');

  function onScroll() {
    let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    sections.forEach(section => {
      if (section.offsetTop - 70 <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
        const id = section.getAttribute('id');
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('data-target') === id) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll);
});
