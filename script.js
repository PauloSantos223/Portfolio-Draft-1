
console.log("Script JS is working :)");


document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const navTrigger = document.getElementById('navTrigger');
  const hiddenNav = document.getElementById('hiddenNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const logo = document.getElementById('logo');
  const body = document.body;
  const secretPath = document.getElementById('secretPath');
  const portalEffect = document.getElementById('portalEffect');
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.project-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const cardWidth = cards[0].offsetWidth + 32;
  let currentPosition = 0;

  const totalWidth = cardWidth * cards.length


  function updateButtons() {
    prevBtn.disabled = currentPosition === 0;
    nextBtn.disabled = currentPosition <= -(totalWidth - cardWidth * Math.floor(track.offsetWidth / cardWidth));
  }

// Moves carousel
function moveCarousel() {
  track.style.transform = `translateX(${currentPosition}px)`;
  updateButtons();
}

nextBtn.addEventListener('click', () => {
  const maxPosition = -(totalWidth - track.offsetWidth);
  currentPosition = Math.max(currentPosition - cardWidth, maxPosition);
  moveCarousel();
});

prevBtn.addEventListener('click', () => {
  currentPosition = Math.min(currentPosition + cardWidth, 0);
  moveCarousel();
});

updateButtons();

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

track.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, {passive: true});

function handleSwipe() {
  if (touchEndX < touchStartX) {
    // Swipe left - next
    nextBtn.click();
  } else if (touchEndX > touchStartX) {
    // Swipe right - prev
    prevBtn.click();
  }
}






  // Toggle navigation menu
  navTrigger.addEventListener('click', function () {
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

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  secretPath.addEventListener('click', function () {
    // Play portal opening animation
    gsap.to(portalEffect, {
      duration: 1.5,
      width: '200vw',
      height: '200vh',
      opacity: 1,
      ease: "power4.out",
      onStart: () => {
        portalEffect.classList.remove('portal-hidden');
        createParticles(50); // Initial particle burst
      },
      onComplete: () => {
        // Transform the entire viewport
        gsap.to(body, {
          duration: 2,
          backgroundColor: '#2a628f',
          ease: "sine.inOut"
        });

        // Create continuous particles
        const particleInterval = setInterval(() => {
          createParticles(5);
        }, 300);

        // Reset after 5 seconds
        setTimeout(() => {
          clearInterval(particleInterval);
          resetSecretPath();
        }, 5000);
      }
    });

    // Button animation
    gsap.to(secretPath, {
      duration: 0.5,
      scale: 0.9,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  });



  function createParticles(count) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('secret-particle');

      // Random properties
      const size = Math.random() * 10 + 5;
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      const color = `hsl(${Math.random() * 60 + 20}, 80%, 60%)`;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;

      document.body.appendChild(particle);

      // Animate particle
      gsap.to(particle, {
        x: posX + (Math.random() * 200 - 100),
        y: posY + (Math.random() * 200 - 100),
        opacity: 0,
        scale: 0,
        duration: Math.random() * 3 + 2,
        ease: "power1.out",
        onComplete: () => particle.remove()
      });
    }
  }

  function resetSecretPath() {
    gsap.to(portalEffect, {
      duration: 1,
      width: 0,
      height: 0,
      opacity: 0,
      ease: "power2.in",
      onComplete: () => {
        portalEffect.classList.add('portal-hidden');
        gsap.to(body, {
          duration: 1,
          backgroundColor: '#003366'
        });
      }
    });

    // Animate all existing particles out
    gsap.to('.secret-particle', {
      opacity: 0,
      scale: 0,
      duration: 1,
      stagger: 0.1,
      onComplete: () => {
        document.querySelectorAll('.secret-particle').forEach(p => p.remove());
      }
    });
  }



  let combo = [];
  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

  secretPath.addEventListener('click', function () {
    // 1. Starts combo recording
    document.addEventListener("keydown", checkKonami);
    alert("Secret mode activated! Enter the code...");
  });

  function checkKonami(e) {
    combo.push(e.key);
    if (combo.length > konamiCode.length) combo.shift();

    if (combo.join() === konamiCode.join()) {
      // 2. Unlocks an 8-bit game style
      document.removeEventListener("keydown", checkKonami);

      gsap.to("body", {
        duration: 1,
        background: "#000",
        color: "#0f0",
        onComplete: () => {
          // 3. Create pixel art elements
          const pixelScreen = document.createElement("div");
          pixelScreen.innerHTML = `
          <div style="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); 
                     font-family:'Courier New'; text-align:center; z-index:10000">
            <pre style="font-size:10px; line-height:1; color:#0f0">
 ───────────────────────────────
───────────────████─███────────
──────────────██▒▒▒█▒▒▒█───────
─────────────██▒────────█──────
─────────██████──██─██──█──────
────────██████───██─██──█──────
────────██▒▒▒█──────────███────
────────██▒▒▒▒▒▒───▒──██████───
───────██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒███─
──────██▒▒▒▒─────▒▒▒▒▒▒▒▒▒▒▒▒█─
──────██▒▒▒───────▒▒▒▒▒▒▒█▒█▒██
───────██▒▒───────▒▒▒▒▒▒▒▒▒▒▒▒█
────────██▒▒─────█▒▒▒▒▒▒▒▒▒▒▒▒█
────────███▒▒───██▒▒▒▒▒▒▒▒▒▒▒▒█
─────────███▒▒───█▒▒▒▒▒▒▒▒▒▒▒█─
────────██▀█▒▒────█▒▒▒▒▒▒▒▒██──
──────██▀██▒▒▒────█████████────
────██▀███▒▒▒▒────█▒▒██────────
█████████▒▒▒▒▒█───██──██───────
█▒▒▒▒▒▒█▒▒▒▒▒█────████▒▒█──────
█▒▒▒▒▒▒█▒▒▒▒▒▒█───███▒▒▒█──────
█▒▒▒▒▒▒█▒▒▒▒▒█────█▒▒▒▒▒█──────
██▒▒▒▒▒█▒▒▒▒▒▒█───█▒▒▒███──────
─██▒▒▒▒███████───██████────────
──██▒▒▒▒▒██─────██─────────────
───██▒▒▒██─────██──────────────
────█████─────███──────────────
────█████▄───█████▄────────────
──▄█▓▓▓▓▓█▄─█▓▓▓▓▓█▄───────────
──█▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓█──────────
──█▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓█──────────
──▀████████▀▀███████▀──────────


            </pre>
            <p>SECRET LEVEL UNLOCKED!</p>
          </div>
        `;
          document.body.appendChild(pixelScreen);

          // 4. Add blinking cursor
          const cursor = document.createElement("div");
          cursor.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 10px;
          height: 20px;
          background: #0f0;
          animation: blink 0.5s infinite;
        `;
          document.body.appendChild(cursor);
        }



      });

      gsap.to("#portal", {
        duration: 2,
        width: "200vmax",
        height: "200vmax",
        opacity: 0.9,
        ease: "power4.out",
        onStart: () => {
          // 2. Suck all page elements toward the portal
          gsap.to("header, section, footer", {
            duration: 3,
            x: () => Math.random() * 200 - 100,
            y: () => Math.random() * 200 - 100,
            rotation: () => Math.random() * 360,
            scale: 0.8,
            opacity: 0.7,
            stagger: 0.1
          });

          // 3. Emit cosmic particles
          for (let i = 0; i < 100; i++) {
            const star = document.createElement("div");
            star.className = "cosmic-star";
            star.style.cssText = `
            position: fixed;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: hsl(${Math.random() * 60 + 200}, 100%, 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
          `;
            document.body.appendChild(star);

            gsap.to(star, {
              x: Math.random() * 500 - 250,
              y: Math.random() * 500 - 250,
              opacity: 0,
              duration: 3,
              onComplete: () => star.remove()
            });
          }
        }
      });

      // 4. Transform the entire page
      gsap.to("body", {
        background: "radial-gradient(circle, #000428 0%, #004e92 100%)",
        color: "white",
        duration: 3
      });

      // 5. Make logo float away
      gsap.to("#logo", {
        y: -100,
        rotation: 360,
        scale: 1.5,
        duration: 4,
        ease: "power1.out"
      });


    }
  }













  // Logo click handler (for layout change)
  logo.addEventListener('click', function () {
    body.classList.toggle('new-layout');
  });

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function (e) {
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