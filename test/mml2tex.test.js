import loadHtml from './load-html'
import mml2Tex from '../src/mml2tex'

const cotangentFunction = loadHtml('./cotangent-function.html')
const findX = loadHtml('./find-x.html')
const gravityFormula = loadHtml('./gravity-formula.html')
const massEnergyEquivalence = loadHtml('./mass-energy-equivalence.html')
const quadraticFormula = loadHtml('./quadratic-formula.html')

test('Quadratic formula (frac, sup, sqrt)', () => {
  expect(mml2Tex(quadraticFormula)).toBe('x=\\frac{-b\\pm\\sqrt{{b}^{2}-4ac}}{2a}')
})

test('Mass-Energy equivalence (sup)', () => {
  expect(mml2Tex(massEnergyEquivalence)).toBe('e=m{c}^{2}')
})

test('Gravity formula (frac, sup, sub)', () => {
  expect(mml2Tex(gravityFormula)).toBe('F=\\frac{G{m}_{1}{m}_{2}}{{d}^{2}}')
})

test('Find X (frac, newline)', () => {
  expect(mml2Tex(findX)).toBe('2x+10=20\\\\2x=20-10\\\\2x=10\\\\x=\\frac{10}{2}\\\\x=5')
})

test('Cotangent function', () => {
  expect(mml2Tex(cotangentFunction)).toBe('\\cot\\theta=\\frac{\\cos\\theta}{\\sin\\theta}=\\tan(\\frac{\\pi}{2}-\\theta)=\\frac{1}{\\tan\\theta}')
})