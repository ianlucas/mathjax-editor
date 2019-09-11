export default function view() {
  /** @type {HTMLElement} */
  const wrapper = MathJax.HTML.Element('div', { className: 'mje-wrapper' })
  /** @type {HTMLElement} */
  const container = MathJax.HTML.Element('div', { className: 'mje-container' })
  /** @type {HTMLElement} */
  const cursor = MathJax.HTML.Element('div', { className: 'mje-cursor hidden' })
  /** @type {HTMLElement} */
  const input = MathJax.HTML.Element('input', { className: 'mje-input' })
  
  /** @type {Object} MathJax's Jax element. */
  let jax = null
  /** @type {Boolean} Focus state of the controller. */
  let focused = false
  /** @type {Boolean} Hover state of the controller. */
  let hover = false
  /** @type {Number} Blink interval id. */
  let blinker = null
  /** @type {Object} Event handlers of the controller. */
  let events = {
    click: null,
    input: null,
    code: null
  }
  
  /**
   * Update the user interface.
   * @return {Void}
   */
  const update = () => {
    if (focused) {
      cursor.classList.remove('hidden')
      container.classList.add('focused')
    }
    else {
      cursor.classList.add('hidden')
      container.classList.remove('focused')
    }
  }

  /**
   * Handle outside UI bounds clicks.
   * @return {Void}
   */
  const handleOutsideClick = () => {
    if (!hover) {
      focused = false
      input.blur()
      return update()
    }
  }

  /**
   * Handle inside UI bounds clicks.
   * @param {MouseEvent} e 
   * @return {Void}
   */
  const handleInsideClick = e => {
    focused = true
    events.click(e.clientX, e.clientY + window.pageYOffset)
    input.focus()
    update()
  }

  /**
   * Handle UI mouseenter event.
   * @return {Void}
   */
  const handleMouseEnter = () => {
    hover = true
  }

  /**
   * Handle UI mouseleave event.
   * @return {Void}
   */
  const handleMouseLeave = () => {
    hover = false
  }

  /**
   * Handle input blur event.
   * @return {Void}
   */
  const handleBlur = () => {
    if (!hover) {
      focused = false
      return update()
    }
    input.focus()
    return update()
  }

  /**
   * Handle input event.
   * @return {Void}
   */
  const handleInput = e => {
    events.input(String.fromCharCode(e.which))
  }

  /**
   * Handle input keydown event.
   * @param {KeyboardEvent} e
   * @return {Void}
   */
  const handleKeydown = e => {
    events.code(e.keyCode)
  }

  /**
   * Handle cursor blinking.
   * @return {Void}
   */
  const blink = () => {
    if (focused) {
      cursor.classList.toggle('hidden')
    }
    blinker = setTimeout(blink, 700)
  }

  /**
   * Stop shortly the cursor blink.
   * @return {Void}
   */
  const unblink = () => {
    if (!focused) {return}
    cursor.classList.remove('hidden')
    clearTimeout(blinker)
    blinker = setTimeout(blink, 700)
  }

  wrapper.appendChild(container)
  wrapper.appendChild(cursor)
  wrapper.appendChild(input)

  document.addEventListener('click', handleOutsideClick)
  container.addEventListener('click', handleInsideClick)
  container.addEventListener('mouseenter', handleMouseEnter)
  container.addEventListener('mouseleave', handleMouseLeave)
  input.addEventListener('blur', handleBlur)
  input.addEventListener('keypress', handleInput)
  input.addEventListener('keydown', handleKeydown)
  blinker = setTimeout(blink, 700)

  return {
    events,
    unblink,

    /**
     * Get the main wrapper.
     * @return {HTMLElement}
     */
    wrapper() {
      return wrapper
    },

    /**
     * Set display mathematics.
     * @param {HTMLElement} val 
     */
    value(val) {
      unblink()
      return new Promise(resolve => {
        if (jax) {
          return jax.Text(val, resolve)
        }
        container.innerHTML = val
        const render = () => {
          MathJax.Hub.Queue(['Typeset', MathJax.Hub, container, () => {
            jax = MathJax.Hub.getAllJax(input)[0]
            resolve()
          }])
        }
        if (MathJax.isReady) {
          render()
        }
        else {
          // When MathJax first load all its contents, even when it
          // triggers the "End" event, it may be still rendering
          // the webfont and markup, so the `recalculate` function
          // may get wrong size and position values. We add an one
          // second delay to ensure it will be ready so far.
          // (still not the perfect solution)
          MathJax.Hub.Register.StartupHook('End', () => {
            setTimeout(render, 1000)
          })
        }
      })
    },

    /**
     * Draw cursor.
     * @param {Object} data 
     */
    draw(data) {
      if (!data) {return}
      cursor.style.left = `${data.x}px`
      cursor.style.top = `${data.y}px`
      cursor.style.height = `${data.height}px`
      input.style.left = `${data.x}px`
      input.style.top = `${data.y}px`
    }
  }
}