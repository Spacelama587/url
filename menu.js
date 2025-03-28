

document.addEventListener("DOMContentLoaded", function () {
  let tl = gsap.timeline({ paused: true });

  tl.to(".menu-overlay", {
      duration: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      ease: "power2.out",
  });

  // Animate art grid items
  tl.from(
      ".art-grid-item",
      {
          opacity: 0,
          y: 60,
          stagger: 0.1,
          duration: 0.75,
          ease: "power1.inOut",
      },
      "<"
  );

  // Add animation for section titles and divider
  tl.from(
      ".section-title, .section-divider",
      {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.5,
          ease: "power1.inOut",
      },
      "<"
  );

  function openMenu() {
      document.querySelector(".menu-overlay").style.pointerEvents = "all";
      document.querySelector(".menu-toggle-circle").classList.add('active');
      tl.play();
  }

  function closeMenu() {
      document.querySelector(".menu-overlay").style.pointerEvents = "none";
      document.querySelector(".menu-toggle-circle").classList.remove('active');
      tl.reverse();
  }

  const menuToggleCircle = document.querySelector('.menu-toggle-circle');
  menuToggleCircle.addEventListener('click', function() {
      if (menuToggleCircle.classList.contains('active')) {
          closeMenu();
      } else {
          openMenu();
      }
  });

  tl.reverse();
});
   // GSAP animation for grid items
   gsap.from(".grid-item", {
    opacity: 0,
    scale: 0.8,
    stagger: 0.1,
    duration: 0.5,
    ease: "power2.out"
});