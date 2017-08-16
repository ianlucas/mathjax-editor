import { readFileSync } from 'fs'
import { resolve } from 'path'
import toDom from '../src/utils/to-dom'

export default function loadHtml(file) {
  return toDom(readFileSync(resolve(__dirname, file), 'utf-8'))
}