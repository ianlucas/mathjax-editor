import { isAny } from './utils';

const NEAR_CLOSURE_HAYSTACK = ['}', ']', '\\'];

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
   * 
   * @constructor
   */
  constructor(tex) {
    this.tex = tex;
    this.cursorPoints = [];
    this.elements = [];
    this.length = tex.length;

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
    let i = 0;
    
    for (; i < length; i++) {
      const index = i;
      const char = tex[index];
      const nextChar = tex[index + 1];
      const lastChar = tex[index - 1];
      const nearClosure = isAny(nextChar, NEAR_CLOSURE_HAYSTACK);

      // Check if character is a number.
      if (test.isNumber.exec(char)) {
        this.elements.push({
          is: 'number',
          type: 'mn',
          index,
          nearClosure
        });
      }

      // Check if character is a variable.
      if (test.isVariable.exec(char)) {
        this.elements.push({
          is: 'variable',
          type: 'mi',
          index,
          nearClosure
        });
      }

      // Check if character is an operator.
      if (test.isOperator.exec(char)) {
        this.elements.push({
          is: 'operator',
          type: 'mo',
          index,
          nearClosure
        });
      }

      if (test.isEscapedOperator.exec(char) && lastChar === '\\') {
        this.elements.push({
          is: 'operator',
          type: 'mo',
          index,
          nearClosure
        });
      }

      // Newline up ahead.
      if (char === '\\' && nextChar === '\\') {
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
        continue;
      }

      cursorPoints.push(index);
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

      if (opening === null && test.isVariable.exec(char)) {
        type += char;
      }
      
      // Bracket found!
      if (char === '[') {
        brackets = { openIndex: i };
        if (opening === null) {
          opening = i;
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
        if (isAny(nextChar, NEAR_CLOSURE_HAYSTACK)) {
          nearClosure = true;
        }
        break;
      }

      if (char === '}' && nextChar !== '{') {
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