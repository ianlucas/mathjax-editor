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

### `MathJaxEditor(options)`

#### `options.el`

The target element. It can be a selector string or a DOM Element.

#### `options.debug`

Enable the debug mode. Default is **`false`**.

#### `options.newLine`

Enable new line insertion. Default is **`false`**.

#### `options.value`

Define the default editor value.

### API

#### `editor.insertCommand(command[, blockCount = 1, brackets = false])`

This inserts a command into the editor. `blockCount` is the quantity of blocks (`{}`) the command requires (e.q. `\sqrt` requires 1, and `\frac` requires 2). If it is a character like alpha (`\alpha`), you **must** specify `blockCount` as `0`.

#### `editor.insert(value)`

This insert a text into the editor. You can use this method to insert numbers (`0-9`), and variables (`a-z`). Also symbols like `+`, `-`.

#### `editor.moveCursorLeft()`

This will move the cursor to the left.

#### `editor.moveCursorRight()`

This will move the cursor to the right.

#### `editor.erase()`

This will erase the character before the cursor.

#### `editor.focus()`

Focus the editor.

#### `editor.blur()`

Blur the editor.

#### `editor.getValue()`

Get the editor's value.

---

**License:** MIT