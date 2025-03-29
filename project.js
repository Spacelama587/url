document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-button");
  const gridItems = Array.from(document.querySelectorAll(".grid-item"));

  filterButtons.forEach(button => {
      button.addEventListener("click", function () {
          const category = this.textContent.toLowerCase();

          // Activate the selected button
          filterButtons.forEach(btn => btn.classList.remove("active"));
          this.classList.add("active");

          // Store positions before filtering
          const positionsBefore = new Map();
          gridItems.forEach(item => {
              positionsBefore.set(item, item.getBoundingClientRect());
          });

          // Apply filter logic
          gridItems.forEach(item => {
              const itemCategory = item.getAttribute("data-category").toLowerCase();
              item.style.display = (category === "all" || itemCategory === category) ? "block" : "none";
          });

          // Wait for DOM to update
          requestAnimationFrame(() => {
              const positionsAfter = new Map();
              gridItems.forEach(item => {
                  if (item.style.display === "block") {
                      positionsAfter.set(item, item.getBoundingClientRect());
                  }
              });

              // Animate items to their new positions
              positionsAfter.forEach((newPos, item) => {
                  const oldPos = positionsBefore.get(item);
                  if (oldPos) {
                      const dx = oldPos.left - newPos.left;
                      const dy = oldPos.top - newPos.top;

                      // Only animate if the item actually moved
                      if (dx !== 0 || dy !== 0) {
                          gsap.fromTo(
                              item,
                              { x: dx, y: dy, opacity: 1, scale: 1 },
                              {
                                  x: 0,
                                  y: 0,
                                  opacity: 1,
                                  scale: 1,
                                  duration: 1.5, // **Slower, smoother animation**
                                  ease: "power4.out"
                              }
                          );
                      }
                  }
              });
          });
      });
  });
});
