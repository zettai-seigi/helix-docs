// Helix Documentation - Custom JavaScript

// Auto-copy UID on click
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.uid').forEach(function(el) {
    el.style.cursor = 'pointer';
    el.title = 'Click to copy';
    el.addEventListener('click', function() {
      navigator.clipboard.writeText(el.textContent).then(function() {
        const original = el.textContent;
        el.textContent = 'Copied!';
        setTimeout(function() {
          el.textContent = original;
        }, 1000);
      });
    });
  });
});
