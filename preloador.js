document.addEventListener("DOMContentLoaded", () => {

    gsap.to(".preloader span", {
        duration: 1.5,
        opacity: 1,
        y: "-10px",
        stagger: 0.1,
        ease: "power4.out",
    
        onComplete: () => {
            gsap.to(".preloader", {
                duration: 1,
                opacity: 0,
                scale: 1.2,
                ease: "power4.inOut",
                onComplete: () => {
                    document.querySelector(".preloader").remove();
                    gsap.to(".main-content", { opacity: 1, duration: 1 });
                 
                }
            });
        }
    });

   
    
  });
  