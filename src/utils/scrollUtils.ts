// Save scroll position before page unload
export const saveScrollPosition = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
  }
};

// Restore scroll position after page load
export const restoreScrollPosition = () => {
  if (typeof window !== 'undefined') {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      // Use requestAnimationFrame for smoother restoration
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedPosition));
        // Clear the saved position after restoring
        sessionStorage.removeItem('scrollPosition');
      });
    }
  }
}; 