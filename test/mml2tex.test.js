import loadHtml from './load-html'
import mml2Tex from '../src/mml2tex'

const gravityFormula = loadHtml('./gravity-formula.html')
const massEnergyEquivalence = loadHtml('./mass-energy-equivalence.html')
const quadraticFormula = loadHtml('./quadratic-formula.html')

test('Quadratic formula', () => {
  expect(mml2Tex(quadraticFormula)).toBe('x=\\frac{-b\\pm\\sqrt{{b}^{2}-4ac}}{2a}')
})

test('Mass-Energy equivalence', () => {
  expect(mml2Tex(massEnergyEquivalence)).toBe('e=m{c}^{2}')
})

test('Gravity formula', () => {
  expect(mml2Tex(gravityFormula)).toBe('F=\\frac{G{m}_{1}{m}_{2}}{{d}^{2}}')
})