/* global MathJax, MathJaxEditor, FontFaceObserver, QUnit */

QUnit.config.autostart = false

function createEditor (config = {}) {
  const context = document.createElement('div')
  const textarea = document.createElement('textarea')
  context.appendChild(textarea)
  document.body.appendChild(context)
  return MathJaxEditor.create(Object.assign(config, {
    mathJax: MathJax,
    target: textarea
  }))
}

function wipe (element) {
  if (!element) {
    return wipe('iframe.mathjax-editor-input')
  }
  if (typeof element === 'string') {
    return Array.from(document.querySelectorAll(element)).forEach((other) => (
      wipe(other)
    ))
  }
  element.parentNode.removeChild(element)
}

Promise.all([
  new FontFaceObserver('MJXTEX').load(),
  new FontFaceObserver('MJXZERO').load()
]).then(() => {
  QUnit.module('MathJaxEditor#create', () => {
    QUnit.test('should place the editor correctly in the DOM', (assert) => {
      const context = document.createElement('div')
      const textarea = document.createElement('textarea')
      document.body.appendChild(context)
      context.appendChild(textarea)
      assert.equal(context.firstChild, textarea, 'initially, textarea is the first child.')
      const editor = MathJaxEditor.create({
        mathJax: MathJax,
        target: textarea
      })
      assert.notEqual(context.firstChild, textarea, 'first child is no longer the textarea.')
      assert.equal(context.firstChild, editor.display.iframe.element, 'editor iframe is the first child.')
      assert.equal(context.firstChild.className, 'mathjax-editor-input', 'editor has its class for styling.')
      wipe(context)
    })
  })

  QUnit.module('MathJaxEditor#initialize', () => {
    QUnit.test('should replace all <mathjax-editor> tags with an editor.', (assert) => {
      const mathjaxEditorElement1 = document.createElement('mathjax-editor')
      const mathjaxEditorElement2 = document.createElement('mathjax-editor')
      document.body.appendChild(mathjaxEditorElement1)
      document.body.appendChild(mathjaxEditorElement2)
      MathJaxEditor.initialize()
      assert.equal(document.querySelectorAll('mathjax-editor').length, 0, 'original elements are gone.')
      assert.equal(document.querySelectorAll('iframe.mathjax-editor-input').length, 2, 'there are two editors on the DOM')
      wipe()
    })
  })

  QUnit.module('Option allowNewline', () => {
    QUnit.test('editor should allow new line insertion when empty', (assert) => {
      const editor = createEditor()
      editor.insertNewline()
      assert.equal(editor.getValueAsString(), '<math><mspace linebreak="newline"></mspace></math>', 'should have two lines.')
      wipe()
    })
    QUnit.test('editor should allow new line insertion when true', (assert) => {
      const editor = createEditor({
        allowNewline: true
      })
      editor.insertNewline()
      assert.equal(editor.getValueAsString(), '<math><mspace linebreak="newline"></mspace></math>', 'should have two lines.')
      wipe()
    })
    QUnit.test('editor should disallow new line insertion when false', (assert) => {
      const editor = createEditor({
        allowNewline: false
      })
      editor.insertNewline()
      assert.equal(editor.getValueAsString(), '<math></math>', 'should have no lines.')
      wipe()
    })
  })

  QUnit.module('Option readonly', () => {
    QUnit.test('editor should not be editable when true.', (assert) => {
      const editor = createEditor({
        readonly: true
      })
      editor.insertNumber('1')
      editor.insertIdentifier('a')
      editor.insertOperator('+')
      assert.equal(editor.getValueAsString(), '<math></math>', 'should have nothing.')
      wipe()
    })
    QUnit.test('editor should be editable when false.', (assert) => {
      const editor = createEditor({
        readonly: false
      })
      editor.insertNumber('1')
      editor.insertIdentifier('a')
      editor.insertOperator('+')
      assert.equal(editor.getValueAsString(), '<math><mn>1</mn><mi>a</mi><mo>+</mo></math>', 'should have "1a+".')
      wipe()
    })
    QUnit.test('editor should be editable when empty.', (assert) => {
      const editor = createEditor()
      editor.insertNumber('1')
      editor.insertIdentifier('a')
      editor.insertOperator('+')
      assert.equal(editor.getValueAsString(), '<math><mn>1</mn><mi>a</mi><mo>+</mo></math>', 'should have "1a+".')
      wipe()
    })
  })

  QUnit.start()
})
