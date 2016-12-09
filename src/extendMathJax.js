import stylesheet from './stylesheet';
import { copy } from './utils';

/**
 * This will extend MathJax so that we can put our simple
 * cursor there.
 */
export default function extendMathJax() {
  const TEX = MathJax.InputJax.TeX;
  const MML = MathJax.ElementJax.mml;

  // This removes the pause (in milliseconds) between input and output 
  // phases of MathJax's processing. So it looks seamless!
  MathJax.Hub.processSectionDelay = 0;

  MathJax.Hub.Register.StartupHook("TeX Jax Ready", () => {
    TEX.Definitions.Add({
      macros: {
        cursor: 'Cursor'
      }
    }, null, true);

    MML.mcursor = MML.mbase.Subclass({
      type: 'cursor',
      isToken: true,
      isSpacelike: () => true,
      texClass: MML.TEXCLASS.ORD,
      defaults: {
        mathvariant: MML.INHERIT,
        mathsize: MML.INHERIT,
        mathbackground: MML.INHERIT,
        mathcolor: MML.INHERIT,
        dir: MML.INHERIT
      }
    });

    TEX.Parse.Augment({
      Cursor(name) {
        const $cursor = MML.mcursor('0');
        this.Push($cursor);
      }
    });
  });

  /**
   * Append our editor styles on the DOM.
   * Maybe an external dependency with real CSS extension instead?
   */

  const $style = document.createElement('style');
  $style.innerHTML = stylesheet;
  document.head.appendChild($style);
}