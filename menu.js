document.addEventListener("DOMContentLoaded", function () {
    let tl = gsap.timeline({ paused: true });
  
    tl.to(".menu-overlay", {
      duration: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      ease: "power2.out",
    });
  
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
  
    function openMenu() {
      document.querySelector(".menu-overlay").style.pointerEvents = "all";
      tl.play();
    }
  
    function closeMenu() {
      document.querySelector(".menu-overlay").style.pointerEvents = "none";
      tl.reverse();
    }
  
    document.querySelector(".menu-open-btn").addEventListener("click", openMenu);
    document.querySelector(".menu-close-btn").addEventListener("click", closeMenu);
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