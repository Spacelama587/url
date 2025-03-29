document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-button");
  const gridItems = Array.from(document.querySelectorAll(".grid-item"));
  
  // Set initial positions for all grid items
  const originalGrid = new Map();
  
  function storeOriginalPositions() {
    gridItems.forEach(item => {
      originalGrid.set(item, item.getBoundingClientRect());
    });
  }
  
  // Store positions after the page is fully loaded
  window.addEventListener('load', storeOriginalPositions);
  
  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      const category = this.textContent.toLowerCase();
      
      // Activate the selected button
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
      
      // First, capture current positions of visible items
      const currentPositions = new Map();
      gridItems.forEach(item => {
        if (getComputedStyle(item).display !== "none") {
          currentPositions.set(item, item.getBoundingClientRect());
        }
      });
      
      // Then update which items should be visible based on filter
      gridItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category").toLowerCase();
        if (category === "all" || itemCategory === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
      
      // Now get new positions after filter is applied
      requestAnimationFrame(() => {
        // Get final positions
        const finalPositions = new Map();
        gridItems.forEach(item => {
          if (getComputedStyle(item).display !== "none") {
            finalPositions.set(item, item.getBoundingClientRect());
          }
        });
        
        // Apply animation for each visible item
        finalPositions.forEach((newPos, item) => {
          // If item was already visible, animate from its previous position
          if (currentPositions.has(item)) {
            const oldPos = currentPositions.get(item);
            const dx = oldPos.left - newPos.left;
            const dy = oldPos.top - newPos.top;
            
            // Only animate if position changed
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
              gsap.fromTo(
                item,
                { x: dx, y: dy },
                {
                  x: 0,
                  y: 0,
                  duration: 1.6, // Much slower for luxury feel
                  ease: "power2.inOut", // Smoother easing
                  clearProps: "transform" // Clean up after animation
                }
              );
            }
          } else {
            // If item wasn't visible before, fade it in with a slight scale
            gsap.fromTo(
              item,
              { 
                opacity: 0,
                scale: 0.98,
                x: 0,
                y: 40 // Slight lift from below
              },
              {
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                duration: 1.5, // Slower fade in
                ease: "power3.out",
                delay: 0.3, // Slight delay for staggered effect
                clearProps: "transform,opacity" // Clean up after animation
              }
            );
          }
        });
      });
    });
  });
});