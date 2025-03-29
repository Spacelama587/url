document.addEventListener("DOMContentLoaded", function () {
    let tl = gsap.timeline({ paused: true });
    const buttonContainer = document.querySelector('.button-container');
    
    // Store the animation duration for synchronization
    const menuAnimationDuration = 1; // Same as your menu animation duration
  
    tl.to(".menu-overlay", {
        duration: menuAnimationDuration,
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
        
        // Immediately hide the button container when opening menu
        if (buttonContainer) {
            gsap.to(buttonContainer, {
                zIndex: 999, // Lower than nav (1001)
                duration: 0.1
            });
            
            // Also fade out the opacity for smoother visual transition
            gsap.to(buttonContainer, {
                opacity: 0,
                duration: 0.2
            });
        }
        
        tl.play();
    }
  
    function closeMenu() {
        document.querySelector(".menu-overlay").style.pointerEvents = "none";
        document.querySelector(".menu-toggle-circle").classList.remove('active');
        
        // Start menu closing animation
        tl.reverse();
        
        // Wait for menu animation to complete before showing buttons
        gsap.delayedCall(menuAnimationDuration, function() {
            if (buttonContainer) {
                // First restore z-index
                gsap.set(buttonContainer, {
                    zIndex: 1002 // Higher than nav (1001)
                });
                
                // Then fade in with opacity for smooth appearance
                gsap.to(buttonContainer, {
                    opacity: 1,
                    duration: 0.3
                });
            }
        });
    }
  
    const menuToggleCircle = document.querySelector('.menu-toggle-circle');
    menuToggleCircle.addEventListener('click', function() {
        if (menuToggleCircle.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
  
    // Initialize button container state
    if (buttonContainer) {
        // Ensure it's visible and at correct z-index on page load
        buttonContainer.style.zIndex = "1002";
        buttonContainer.style.opacity = "1";
    }
  
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