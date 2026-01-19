// Demo Enhancements - Fullscreen and Grouped View
(function() {
  // Add fullscreen overlay to DOM
  const overlay = document.createElement('div');
  overlay.id = 'fullscreenOverlay';
  overlay.className = 'fullscreen-overlay';
  overlay.innerHTML = `
    <div class="fullscreen-content">
      <div class="fullscreen-header">
        <h1 id="fullscreenTitle" class="fullscreen-title"></h1>
        <button class="close-fullscreen-btn" onclick="closeFullscreen()">
          <i class="fas fa-times"></i> Close
        </button>
      </div>
      <div id="fullscreenContent"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Add expand buttons to all demo cards
  const cards = document.querySelectorAll('.demo-card');
  cards.forEach(card => {
    const expandBtn = document.createElement('button');
    expandBtn.className = 'expand-btn';
    expandBtn.title = 'Open Fullscreen';
    expandBtn.innerHTML = '<i class="fas fa-expand"></i>';
    expandBtn.onclick = (e) => {
      e.stopPropagation();
      openFullscreen(card);
    };
    card.style.position = 'relative';
    card.insertBefore(expandBtn, card.firstChild);
    card.setAttribute('data-original', 'true');
  });

  // Start with grouped view on load for a modern, organized look
  setTimeout(() => {
    if (document.querySelector('.category-btn.active[data-category="all"]')) {
      showGroupedDemos();
    }
  }, 100);
})();
