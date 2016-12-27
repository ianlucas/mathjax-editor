import { isAny, inArray } from './utils';

const nearClosureHaystack = ['}', ']', '\\'];
const cursorTex = '{\\cursor}';
const emptyTex = '\\isEmpty';

const test = {
  isNumber: /[0-9]/,
  isVariable: /[a-z]/,
  isOperator: /[\+\-\=\,\.\[\]]/,
  isEscapedOperator: /[\{\}]/
};

class Tex {
  /**
   * This class will parse the given tex and produce `cursorPoints` (indexes)
   * where cursor can be placed, and `elements` (that are passed to Placer).
   * 
   * @param {String} tex
   * @param {Number} cursorIndex
   * 
   * @constructor
   */
  constructor(tex, cursorIndex = null) {
    this.tex = tex;
    this.cursorPoints = [];
    this.elements = [];
    this.newLines = {};
    this.length = tex.length;
    this.displayTex = '';
    this.cursorIndex = cursorIndex;

    this.parse();
  }

  /**
   * Parse the given tex.
   * 
   * @return {Void}
   */
  parse() {
    const cursorPoints = [];
    const tex = this.tex;
    const length = this.tex.length;
    const cursorIndex = this.cursorIndex;
    let cursorPlaced = false;
    let i = 0;
    
    for (; i < length; i++) {
      const index = i;
      const nextIndex = i + 1;
      const char = tex[index];
      const nextChar = tex[nextIndex];
      const lastChar = tex[index - 1];
      const nearClosure = isAny(nextChar, nearClosureHaystack);
      const isComma = (char === ',');
      const isNumber = test.isNumber.exec(char);
      const isVariable = test.isVariable.exec(char);
      const isOperator = test.isOperator.exec(char);
      const isEscapedOperator = test.isEscapedOperator.exec(char);

      if (!cursorPlaced && cursorIndex === index) {
        cursorPlaced = true;
        this.displayTex += cursorTex;
      }

      if (isComma || isNumber) {
        this.displayTex += '{';
      }

      // Add char to tex that are displayed on editor.
      this.displayTex += char;

      if (isComma || isNumber) {
        this.displayTex += '}';
      }

      // Check if character is a number.
      if (isNumber) {
        this.elements.push({
          is: 'number',
          type: 'mn',
          index,
          nearClosure
        });
      }

      // Check if character is a variable.
      if (isVariable) {
        this.elements.push({
          is: 'variable',
          type: 'mi',
          index,
          nearClosure
        });
      }

      // Check if character is an operator.
      if (isOperator) {
        this.elements.push({
          is: 'operator',
          type: 'mo',
          index,
          nearClosure
        });
      }

      if (isEscapedOperator && lastChar === '\\') {
        this.elements.push({
          is: 'operator',
          type: 'mo',
          index,
          nearClosure
        });
      }

      // Newline up ahead.
      if (char === '\\' && nextChar === '\\') {
        const newLine = { start: i, end: i + 1};
        this.newLines[i] = newLine;
        this.newLines[i + 1] = newLine;
        i += 1;
      }

      // A command.
      if (char === '\\' && test.isVariable.exec(nextChar)) {
        i = this.parseCommand(i);
      }

      // Sup and sub commands.
      if (isAny(char, ['^', '_'])) {
        i = this.parseCommand(i);
      }

      // Closing a command block.
      if (char === '}' && lastChar !== '\\') {
        //
      }

      // Opening a command block.
      if (char === '{') {
        if (nextChar === '}') {
          if (!cursorPlaced && nextIndex === cursorIndex) {
            cursorPlaced = true;
            this.displayTex += cursorTex;
          }
          this.displayTex += emptyTex;
        }

        continue;
      }

      cursorPoints.push(index);
    }

    // Add cursor at the end if it was not placed.
    if (!cursorPlaced && cursorIndex === length) {
      cursorPlaced = true;
      this.displayTex += cursorTex;
    }

    // Cursor can always be placed at the end.
    cursorPoints.push(length);

    this.cursorPoints = cursorPoints;
  }

  /**
   * Parse a command that start at the given index.
   * 
   * @param {Number} i
   * 
   * @return {Number}
   */
  parseCommand(i) {
    const iterator = i;
    const tex = this.tex;
    const length = this.tex.length;
    let opening = null; // the first place the cursor can be placed inside this command
    let blocks = [];
    let brackets = null; 
    let openBlocks = 0;
    let type = '';
    let is = 'command'; // we assume it is a command but it can be operator or variable
    let start = iterator; // index command starts
    let end = null; // index command ends
    let nearClosure = false;

    for (i = iterator; i < length; i++) {
      const char = tex[i];
      const nextChar = tex[i + 1];
      const isVariable = test.isVariable.exec(char);

      if (opening === null) {
        this.displayTex += (char !== '\\' ? char : '');
        if (isVariable) {
          type += char;
        }
      }
      
      // Bracket found!
      if (char === '[') {
        brackets = { openIndex: i };
        if (opening === null) {
          opening = i;
        }
        if (nextChar === ']') {
          this.displayTex += emptyTex;
        }
      }

      // Closing brackets!
      if (char === ']') {
        brackets.closeIndex = i;
      }

      // Find a block being openned.
      if (char === '{') {
        // If it is this command block...
        if (openBlocks === 0) {
          blocks.push({ openIndex: i });
        }
        openBlocks += 1;
        if (opening === null) {
          opening = i;
        }
      }

      // Find a block being closed.
      if (char === '}') {
        openBlocks -= 1;
        // If it is this command block...
        if (openBlocks === 0) {
          blocks[blocks.length - 1].closeIndex = i;
        }
      }

      if (char === ' ') {
        type = this.decideType(type);
        is = type === 'mo' ? 'operator' : 'variable';
        end = i;
        opening = i;
        if (isAny(nextChar, nearClosureHaystack)) {
          nearClosure = true;
        }
        break;
      }

      if (char === '}' && nextChar !== '{' && openBlocks === 0) {
        end = i;
        break;
      }
    }

    if (type === 'sqrt' && brackets !== null) {
      type = 'root';
    }

    if (opening === null) {
      throw new SyntaxError('Looks like this TeX is invalid. Now have a hard time finding where, lul.');
    }

    this.elements.push({
      is,
      type,
      nearClosure,
      props: {
        start,
        end,
        opening,
        blocks,
        brackets
      }
    });

    return opening;
  }

  /**
   * Decide the type based on the given type (lul).
   *     \{type}
   *     \alpha ---> mi
   *     \geq   ---> mo
   *     \sqrt  ---> msqrt
   * 
   * @param {String} type
   * 
   * @return {String}
   */
  decideType(type) {
    const list = {
      'alpha': 'mi',
      'beta': 'mi',
      'gamma': 'mi',
      'Gamma': 'mi',
      'delta': 'mi',
      'Delta': 'mi',
      'epsilon': 'mi',
      'varepsilon': 'mi',
      'zeta': 'mi',
      'eta': 'mi',
      'theta': 'mi',
      'vartheta': 'mi',
      'Theta': 'mi',
      'iota': 'mi',
      'kappa': 'mi',
      'lambda': 'mi',
      'mu': 'mi',
      'nu': 'mi',
      'xi': 'mi',
      'Xi': 'mi',
      'pi': 'mi',
      'Pi': 'mi',
      'rho': 'mi',
      'varrho': 'mi',
      'sigma': 'mi',
      'Sigma': 'mi',
      'tau': 'mi',
      'upsilon': 'mi',
      'Upsilon': 'mi',
      'phi': 'mi',
      'varphi': 'mi',
      'Phi': 'mi',
      'chi': 'mi',
      'psi': 'mi',
      'Psi': 'mi',
      'omega': 'mi',
      'Omega': 'mi',
      '%': 'mi'
    };

    return list.hasOwnProperty(type) ? list[type] : 'mo';
  }
}

export default Tex;