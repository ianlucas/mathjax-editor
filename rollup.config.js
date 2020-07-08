import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import CleanCSS from 'clean-css'
import { createFilter } from '@rollup/pluginutils'

const libName = 'MathJaxEditor'
const isProduction = (process.env.BUILD === 'PRD')

function css (options = {}) {
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

function addConfig (file, plugins = []) {
  const defaultPlugins = [
    css(),
    commonjs(),
    babel({
      babelHelpers: 'bundled'
    })
  ]
  return {
    input: './src/index.js',
    output: {
      file,
      format: 'umd',
      name: libName
    },
    plugins: defaultPlugins.concat(plugins)
  }
}

const configs = [addConfig(
  isProduction
    ? `dist/${libName}.js`
    : `test/${libName}.js`
)]

if (isProduction) {
  configs.push(addConfig(`dist/${libName}.min.js`, [terser()]))
}

export default configs
