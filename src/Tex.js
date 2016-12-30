import { inArray, listToCharacterRegex } from './utils';
import constants from './constants';

const {
  nearClosureHaystack,
  supOrSub, cursorTex,
  emptyTex, escType,
  spacingTex, relationCommands
} = constants;

const test = {
  isNumber: constants.number,
  isVariable: constants.variable,
  isOperator: listToCharacterRegex(constants.operators),
  isEscapedOperator: listToCharacterRegex(constants.escapedOperators)
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
    this.isPartOfCommand = {};

    this.parse();
  }

  /**
   * Place the cursor at `displayTex` if it is
   * in the given index, and was not placed before.
   * 
   * @param {Number} index
   * 
   * @return {Void}
   */
  addCursorToTexDisplay(index) {
    if (!this.cursorPlaced && this.cursorIndex === index) {
      this.cursorPlaced = true;
      this.displayTex += cursorTex;
    }
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

    this.cursorPlaced = false;
    
    for (; i < length; i++) {
      const index = i;
      const nextIndex = i + 1;
      const char = tex[index];
      const nextChar = tex[nextIndex];
      const lastChar = tex[index - 1];
      const nearClosure = inArray(nextChar, nearClosureHaystack);
      const isComma = (char === ',');
      const isGrOrLeSign = inArray(char, ['<', '>']);
      const isNumber = test.isNumber.exec(char);
      const isVariable = test.isVariable.exec(char);
      const isOperator = test.isOperator.exec(char);
      const isNextCharEscapedOperator = test.isEscapedOperator.exec(nextChar);
      const shouldBeAroundBraces = isComma || isNumber || isGrOrLeSign;

      this.addCursorToTexDisplay(index);

      if (shouldBeAroundBraces || this.isRelationCommand(index)) {
        this.displayTex += '{';
      }

      // Closing a command block, add spacing.
      if (char === '}' && lastChar !== '\\') {
        if (!this.isPartOfCommandThatStartsWith(index, supOrSub)) {
          this.displayTex += spacingTex;
        }
      }

      // Add char to tex that are displayed on editor.
      this.displayTex += char;

      if (shouldBeAroundBraces) {
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
      if (isOperator && !this.isPartOfCommand.hasOwnProperty(index)) {
        this.elements.push({
          is: 'operator',
          type: 'mo',
          index,
          nearClosure
        });
      }

      if (char === '\\' && isNextCharEscapedOperator) {
        const type = escType[nextChar] ? escType[nextChar] : 'mo';
        this.elements.push({
          is: 'operator',
          type,
          index,
          nearClosure,
          props: {
            start: index,
            end: nextIndex
          }
        });
        this.displayTex += nextChar;
        i += 1;
      }

      // Newline up ahead.
      if (char === '\\' && nextChar === '\\') {
        const newLine = { start: index, end: nextIndex };
        this.newLines[index] = newLine;
        this.newLines[nextIndex] = newLine;
        this.displayTex += '\\';
        this.elements.push({
          is: 'eol',
          type: 'block',
          index
        });
        i += 1;
      }

      // A command.
      if (char === '\\' && test.isVariable.exec(nextChar)) {
        i = this.parseCommand(i);
      }

      // Sup and sub commands.
      if (inArray(char, supOrSub)) {
        i = this.parseCommand(i);
      }

      // Opening a command block.
      if (char === '{') {
        if (nextChar === '}') {
          this.addCursorToTexDisplay(nextIndex);
          this.displayTex += emptyTex;
        }
        else {
          if (!this.isPartOfCommandThatStartsWith(index, supOrSub)) {
            this.displayTex += spacingTex;
          }
        }
        continue;
      }

      if (char === ' ') {

        continue;
      }

      cursorPoints.push(index);
    }

    // Last line eol element.
    if (length) {
      this.elements.push({
        is: 'eol',
        type: 'block',
        index: length
      });
    }

    // Add cursor at the end if it was not placed.
    this.addCursorToTexDisplay(length);

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
    const firstChar = tex[iterator];
    const partOfCommandObject = { firstChar };
    let opening = null; // the first place the cursor can be placed inside this command
    let blocks = [];
    let brackets = null; 
    let openBlocks = 0;
    let type = '';
    let subType = null;
    let is = 'command'; // we assume it is a command but it can be operator or variable
    let start = iterator; // index command starts
    let end = null; // index command ends
    let nearClosure = false;

    switch (firstChar) {
      case '^':
        type = 'subsup';
        subType = 'sup';
        break;
      case '_':
        type = 'subsup';
        subType = 'sub';
        break;
    }

    for (i = iterator; i < length; i++) {
      const char = tex[i];
      const nextIndex = i + 1;
      const nextChar = tex[nextIndex];
      const isVariable = test.isVariable.exec(char);

      if (opening === null) {
        this.displayTex += (!inArray(char, ['\\', '^', '_']) ? char : '');
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

        // Add symbol of empty.
        if (nextChar === ']') {
          this.displayTex += emptyTex;
        }
      }

      // Closing brackets!
      if (char === ']') {
        brackets.closeIndex = i;
        this.isPartOfCommand[i] = partOfCommandObject;
      }

      // Find a block being openned.
      if (char === '{') {
        // If it is this command block...
        if (openBlocks === 0) {
          blocks.push({ openIndex: i });
          this.isPartOfCommand[i] = partOfCommandObject;
        }
        openBlocks += 1;
        if (opening === null) {
          opening = i;

          if (!inArray(firstChar, supOrSub)) {
            this.displayTex += spacingTex;
          }

          // Place the cursor if it is there.
          this.addCursorToTexDisplay(nextIndex);
          
          if (nextChar === '}') {
            this.displayTex += emptyTex;
          }
        }
      }

      // Find a block being closed.
      if (char === '}') {
        openBlocks -= 1;
        // If it is this command block...
        if (openBlocks === 0) {
          const key = blocks.length - 1;
          blocks[key].closeIndex = i;
          blocks[key].length = i - blocks[key].openIndex;
          this.isPartOfCommand[i] = partOfCommandObject;
        }
      }

      if (opening === null && char === ' ') {
        const shouldBeAroundBraces = inArray(type, relationCommands);
        type = this.decideType(type);
        is = type === 'mo' ? 'operator' : 'variable';
        end = i;
        opening = i;
        if (inArray(nextChar, nearClosureHaystack)) {
          nearClosure = true;
        }
        if (shouldBeAroundBraces) {
          this.displayTex += '}';
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
      index: iterator,
      nearClosure,
      props: {
        subType,
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

  /**
   * Check if the command where the character of the given index
   * starts with any of characters inside haystack.
   * 
   * @param {Number} index
   * @param {Array} haystack
   * 
   * @return {Boolean}
   */
  isPartOfCommandThatStartsWith(index, haystack) {
    const data = this.isPartOfCommand[index];
    if (!data) {
      return false;
    }
    return inArray(data.firstChar, haystack);
  }

  /**
   * Check if a relation command is ahead.
   * (In the future can be extended to other commands).
   * This to avoid MathJax from joining two elements into one, and
   * so bugging the cursor placement.
   * 
   * @param {Number} index
   * 
   * @return {Void}
   */
  isRelationCommand(index) {
    const { tex } = this;
    const length = tex.length;

    if (tex[index] !== '\\') {
      return;
    }

    let i = index + 1;
    let name = '';

    for (; i < length; i++) {
      const char = tex[i];

      if (!test.isVariable.exec(char) && char !== ' ') {
        return false;
      }
      else if (char === ' ') {
        return inArray(name, relationCommands);
      }
      name += char;
    }

    return false;
  }
}

export default Tex;