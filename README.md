# MathJax Editor

This is my personal try on building a mathematics editor. I'm trying to integrate it with MathJax because it would make the editor lightweight, since the MathJax would be responsible for rendering the mathematics. (And if you is using an editor for mathematics, you'll probably need a mathematics renderer anyway).

## Installation

You can install it through NPM:

``` bash
npm install # coming soon :3
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

#### `editor.insertCommand(command[, blocks = 1])`

This inserts a command into the editor. "Blocks" ({}) is the quantity the command requires (e.q. `\sqrt` requires 1, and `\frac` requires 2).

---

**License:** MIT