import { readFileSync } from 'fs'
import { resolve } from 'path'

export default function loadHtml(file) {
  const tmp = document.createElement('div')
  tmp.innerHTML = readFileSync(resolve(__dirname, file), 'utf-8')
  return tmp.firstElementChild
}