import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import css from './build/css'
import { terser } from 'rollup-plugin-terser'

const libName = 'MathJaxEditor'
const isProduction = (process.env.BUILD === 'PRD')

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
