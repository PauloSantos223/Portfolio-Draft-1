
console.log("Script JS is working :)");


document.addEventListener("DOMContentLoaded", function() {
    // Get elements
    const navTrigger = document.getElementById('navTrigger');
    const hiddenNav = document.getElementById('hiddenNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.getElementById('logo');
    const body = document.body;
    const secretPath = document.getElementById('secretPath');
    const portalEffect = document.getElementById('portalEffect');
  
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
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });

    secretPath.addEventListener('click', function() {
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

secretPath.addEventListener('click', function() {
  // 1. Start combo recording
  document.addEventListener("keydown", checkKonami);
  alert("Secret mode activated! Enter the code...");
});

function checkKonami(e) {
  combo.push(e.key);
  if (combo.length > konamiCode.length) combo.shift();
  
  if (combo.join() === konamiCode.join()) {
    // 2. Unlock 8-bit game style
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
  }
}













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