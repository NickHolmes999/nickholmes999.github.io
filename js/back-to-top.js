/**
 * Universal Back to Top Button
 * Adds a circular gradient button that appears on scroll
 */
(function() {
  'use strict';
  
  // Create back to top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTop';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.setAttribute('title', 'Back to top');
  
  // Add button to page when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(backToTopBtn);
    });
  } else {
    document.body.appendChild(backToTopBtn);
  }
  
  // Show/hide button on scroll
  let ticking = false;
  function updateButtonVisibility() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 400) {
      backToTopBtn.classList.add('visible', 'show');
    } else {
      backToTopBtn.classList.remove('visible', 'show');
    }
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateButtonVisibility);
      ticking = true;
    }
  });
  
  // Smooth scroll to top
  backToTopBtn.addEventListener('click', () => {
    // Fallback for browsers that don't support smooth scroll
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Polyfill for smooth scroll
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(() => {
          window.scrollTo(0, currentScroll - (currentScroll / 8));
          if (window.pageYOffset > 0) {
            backToTopBtn.click();
          }
        });
      }
    }
  });
  
  // Optional: Add keyboard shortcut (Shift + Up Arrow)
  document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === 'ArrowUp') {
      e.preventDefault();
      backToTopBtn.click();
    }
  });
})();
