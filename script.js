
console.log("Script JS is working :)");


document.addEventListener("DOMContentLoaded", function () {

    
    const button = document.getElementById("floatingButton");
    const nav = document.getElementById("hiddenNav");
    

    // Create 10 particles inside the floating button
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        // Randomly position each particle within the button container
       
        const positionY = Math.random() * 20 - 10; // Random Y position between -10px and 10px
        particle.style.position = "absolute";
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;

        // Append the particle to the floating button
        button.appendChild(particle);
    }

    // Show the navigation bar when the button is clicked
    button.addEventListener("click", function () {
        // Toggle the navigation visibility
        if (nav.style.display === "none" || nav.style.display === "") {
            nav.style.display = "block";
            nav.classList.add("showNav");
        } else {
            nav.style.display = "none";
            nav.classList.remove("showNav");
        }
    });

    const logo = document.getElementById("logo");
    const body = document.body;

    logo.addEventListener("click", function () {
        body.classList.toggle("new-layout");
    });


    // Trigger animations for project cards
    if (body.classList.contains("new-layout")) {
        projectCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add("fade-in");
        });
    } else {
        projectCards.forEach((card) => {
            card.classList.remove("fade-in");
        });
    }



    // Reveal project details on click
    const projects = document.querySelectorAll(".project");


    projects.forEach((project) => {
        project.addEventListener("click", () => {
            alert(`You clicked on ${project.querySelector("h3").textContent}`);
        });
    });

    // Create glowing secret button animation (Easter Egg)
    const secretPath = document.getElementById("secretPath");
    secretPath.style.display = 'block';

    secretPath.addEventListener("click", () => {
        alert("You found the secret path!");
    });

    // Glow effect on hover
    secretPath.addEventListener("mouseover", () => {
        gsap.to(secretPath, {
            duration: 0.5,
            scale: 1.2,
            ease: "bounce.out"
        });
    });

    secretPath.addEventListener("mouseout", () => {
        gsap.to(secretPath, {
            duration: 0.5,
            scale: 1,
            ease: "bounce.out"
        });
    });
});
