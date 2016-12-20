# MathJax Editor

This is my personal try on building a mathematics editor. I'm trying to integrate it with MathJax because it would make the editor lightweight, since the MathJax would be responsible for rendering the mathematics. (And if you are using an editor for mathematics, you'll probably need a mathematics renderer anyway).

## Installation

You can install it through NPM:

``` bash
npm install mathjax-editor
```

or grab `MathJaxEditor.js` at `dist/` folder.

## Usage

``` html
<textarea id="myEditor"></textarea>
```

``` javascript
const editor = new MathJaxEditor({
  el: '#myEditor' // or document.getElementById('myEditor')
});
```

### API

#### `editor.insertCommand(command[, blockCount = 1, brackets = false])`

This inserts a command into the editor. `blockCount` is the quantity of blocks (`{}`) the command requires (e.q. `\sqrt` requires 1, and `\frac` requires 2). If it is a character like alpha (`\alpha`), you **must** specify `blockCount` as `0`.

#### `editor.focus()`

Focus the editor.

#### `editor.blur()`

Blur the editor.

#### `editor.getJax()`

Get the editor's value.

---

**License:** MIT