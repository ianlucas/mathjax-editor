import each from './each'
import lower from './lower'
import id from './id'
import newline from './newline'

/**
 * Get the viewport coordinates of draw mathematics by MathJax.
 * This will then be used to draw the cursor.
 * @param {HTMLElement} math 
 * @todo HIGHLY REFACTOR THIS CODE!!!
 */
export default function recalculate(math) {
  const cache = {}
  /** @type {Array} */
  const path = []
  /** @type {HTMLElement} */
  let previous = null
  /** @type {Object} */
  let prevData = null
  /** @type {Object} */
  let lastParentRect
  /** @type {Object} */
  let lastLineRect

  const bounding = (element, id) => {
    if (!element) {return}
    if (!cache.hasOwnProperty(id)) {
      const bounding = element.getBoundingClientRect()
      bounding.x = bounding.left // edge
      bounding.y = bounding.top  // edge
      bounding.y += window.pageYOffset
      cache[id] = bounding
    }
    return cache[id]
  }

  const firstBlockBounding = () => {
    const bounding = document.getElementById(math.id)
      .querySelector('.mjx-block')
      .getBoundingClientRect()
    bounding.x = bounding.left // edge
    bounding.y = bounding.top  // edge
    return bounding
  }

  const findBlock = (element) => {
    let el = element.parentNode
    while (el) {
      if (el.className == 'mjx-math') {
        return false
      }
      if (el.className == 'mjx-box') {
        // assign an id for caching.
        el.setAttribute('id', id())
        return el
      }
      el = el.parentNode
    }
    // this really should not be called...
    console.warning('mathJaxEditor: could not found a block for this line')
    return false
  }

  each(math, source => {
    const element = document.getElementById(source.id)
    if (!element) {return}
    const has = source.children.length
    const last = element.lastElementChild
    const parent = source.parentNode
    const tag = lower(source.tagName)
    const rect = bounding(element, source.id)
    let parentElement
    let parentRect
    let parentId
    let flag
    const data = {
      y: rect.top,
      height: rect.height,
      source,
      previous
    }

    if (parent && tag !== 'mrow') {
      flag = false
      parentId = parent.id

      if (parent === math) {
        flag = true
        parentElement = findBlock(element)
      }
      if (parentElement) {
        parentId = parentElement.id
      }
      else {
        parentElement = document.getElementById(parent.id)
      }
    
      parentRect = bounding(parentElement, parentId)
      data.y = parentRect.top
      data.height = parentElement.clientHeight
      
      if (flag) {
        if (!lastLineRect) {lastLineRect = parentRect}
        if (lastParentRect && parentRect !== lastParentRect) {
          lastLineRect = lastParentRect
        }
        lastParentRect = parentRect
      }
    }

    if (prevData) {
      prevData.next = source
    }

    switch (lower(tag)) {
    case 'mspace':
      if (!newline(source)) {break}
      const sibling = source.previousElementSibling
      const prevline = sibling && newline(sibling)
      const first = math.firstElementChild === source
      const other = first ? firstBlockBounding() : lastLineRect
      data.x = other.x + (first ? 0 : (prevline ? 0 : other.width))
      data.y = other.y
      data.height = other.height
      break

    case 'math':
      const lastChild = source.lastElementChild
      const dont = lastChild && newline(lastChild)
      if (lastParentRect) {
        data.x = lastParentRect.x + (dont ? 0 : lastParentRect.width)
        data.y = lastParentRect.y
        data.height = lastParentRect.height
      }
      else {
        data.x = (has ? rect.width : 0) + rect.left
      }
      break

    case 'mrow':
      data.x = (has ? rect.width - last.clientWidth : 0) + rect.left
      break

    default:
      data.x = rect.left
      break
    }

    path.push(data)
    previous = source
    prevData = data
  })
  
  return path
}