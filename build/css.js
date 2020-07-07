import CleanCSS from 'clean-css'
import { createFilter } from '@rollup/pluginutils'

export default function css (options = {}) {
  const filter = createFilter(options.include, options.exclude)

  return {
    name: 'css',

    transform (css, id) {
      if (id.slice(-4) !== '.css' || !filter(id)) {
        return null
      }

      const minified = new CleanCSS().minify(css)
      return `var style = document.createElement('style');style.innerHTML = '${minified.styles}';export default style`
    }
  }
}
