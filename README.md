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

#### `editor.insertCommand(command[, blockCount = 0, brackets = false])`

This inserts a command into the editor. `blockCount` is the quantity of blocks (`{}`) the command requires (e.q. `\sqrt` requires 1, and `\frac` requires 2). Tested commands: Greek symbols, `\sqrt, \frac, \geq, \leq`.

#### `editor.insert(char)`

This insert a character at cursor position. The allowed characters are numbers (`0` to `9`), and variables (`a` to `z`).

#### `editor.insertSymbol(symbol)`

This insert a symbol at cursor position. Currently supported symbols:  `'+', '-', '/', '=', '<', '>', ',', '.', ':', ';', '?', '(', ')', '[', ']', '%'`.

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

#### `editor.on(type, listener)`

Listen to a editor event. Currently available: `focus`, and `blur`.

#### `editor.getValue()`

Get the editor's value.

---

**License:** MIT