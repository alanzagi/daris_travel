// Start Fungsi untuk penambahan angka
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          const duration = 2000;
          const start = 0;
          let startTime = null;

          const updateCounter = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            counter.textContent = Math.floor(progress * target) + "+";
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + "+";
            }
          };

          requestAnimationFrame(updateCounter);
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.1 }
  );

  counters.forEach((counter) => observer.observe(counter));
});
// End Fungsi untuk penambahan angka

document.querySelectorAll(".hubungi").forEach(function (button) {
  button.addEventListener("click", function () {
    window.location.href = "https://wa.me/6281521550913?text=halo";
  });
});
