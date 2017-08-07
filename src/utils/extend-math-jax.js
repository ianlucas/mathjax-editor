window.addEventListener('load', () => {
  if (!MathJax) {
    throw new Error('MathjaxEditor: MathJax is missing.')
  }
  
  MathJax.Hub.processSectionDelay = 0;
})