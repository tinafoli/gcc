// Save scroll position before page unload
export const saveScrollPosition = () => {
  if (typeof window !== 'undefined') {
    const scrollPosition = window.scrollY;
    sessionStorage.setItem('scrollPosition', scrollPosition.toString());
  }
};

// Restore scroll position after page load
export const restoreScrollPosition = () => {
  if (typeof window !== 'undefined') {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      // Use setTimeout to ensure the DOM is fully rendered
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition));
      }, 0);
      // Clear the saved position after restoring
      sessionStorage.removeItem('scrollPosition');
    }
  }
}; 