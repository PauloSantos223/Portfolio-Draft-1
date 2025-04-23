
console.log("Script JS is working :)");


document.addEventListener("DOMContentLoaded", function() {
    // Get elements
    const navTrigger = document.getElementById('navTrigger');
    const hiddenNav = document.getElementById('hiddenNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.getElementById('logo');
    const body = document.body;
  
    // Toggle navigation menu
    navTrigger.addEventListener('click', function() {
      // Toggle active class on nav
      hiddenNav.classList.toggle('active');
      
      // Toggle open class on button
      this.classList.toggle('open');
      
      // Animate links
      navLinks.forEach((link, index) => {
        if (hiddenNav.classList.contains('active')) {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index * 0.1 + 0.3}s`;
        } else {
          link.style.animation = '';
        }
      });
    });
  
    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hiddenNav.classList.remove('active');
        navTrigger.classList.remove('open');
      });
    });
  
    // Logo click handler (for layout change)
    logo.addEventListener('click', function() {
      body.classList.toggle('new-layout');
    });

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', function(e) {
        // Don't trigger if clicking on links
        if (e.target.tagName !== 'A') {
          const link = this.querySelector('.project-link');
          if (link) {
            window.location.href = link.href;
          }
        }
      });

  });
});