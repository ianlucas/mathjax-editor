/**
 * This class helps to iterate over a string.
 */
class Iterator {
  /**
   * @param {String} tex
   * @constructor
   */
  constructor(tex) {
    this.tex = tex;
  }

  /**
   * Get character at given index.
   * 
   * @param {Number} index
   * 
   * @return IteratorCharacter
   */
  at(index) {
    return new IteratorCharacter(this.tex, index);
  }
}

/**
 * This class represents a text character.
 */
class IteratorCharacter {
  /**
   * @param {String} tex - Text it came from.
   * @param {Number} index - Its index in that text.
   *
   * @constructor
   */
  constructor(tex, index) {
    this.tex = tex;
    this.index = index;
    this.value = tex[index];
  }

  /**
   * Check if this character is equals to any of given arguments.
   * 
   * @param {String} ...chars
   * 
   * @return {Boolean}
   */
  is(...chars) {
    return !!~chars.indexOf(this.value);
  }

  /**
   * If the char is equals to any of given arguments,
   * returns a logic constructor.
   * 
   * @param {String} ...char
   * 
   * @return {IteratorFlow}
   */
  when(...chars) {
    return new IteratorFlow(this, this.is(...chars));
  }

  /**
   * Get the character previous to this character.
   * 
   * @return {IteratorCharacter}
   */
  previousCharacter() {
    return new IteratorCharacter(this.tex, this.index - 1);
  }

  /**
   * Get the character next to this character.
   * 
   * @return {IteratorCharacter}
   */
  nextCharacter() {
    return new IteratorCharacter(this.tex, this.index + 1);
  }
}

class IteratorFlow {
  /**
   * @param {IteratorCharacter} char
   * @param {Boolean} assertion
   * 
   * @constructor
   */
  constructor(char, assertion) {
    this.assertion = assertion;
    this.char = char;
    this.tex = char.tex;
    this.iterator = char.index;
  }

  /**
   * @param {Boolean} expression
   */
  and(expression) {
    if (this.assertion) {
      this.assertion = !!expression;
    }
  }

  /**
   * Check if next character is equals to the expected.
   * 
   * @param {String} expected
   * 
   * @return {IteratorFlow} this
   */
  andNextCharacterIs(expected) {
    this.and(this.char.nextCharacter().is(expected));
    return this;
  }

  /**
   * Check if next character is not equals to the expected.
   * 
   * @param {String} expected
   * 
   * @return {IteratorFlow} this
   */
  andNextCharacterNotIs(expected) {
    this.and(!this.char.nextCharacter().is(expected));
    return this;
  }

  /**
   * Check if previous character is equals to the expected.
   * 
   * @param {String} expected
   * 
   * @return {IteratorFlow} this
   */
  andPreviousCharacterIs(expected) {
    this.and(this.char.previousCharacter().is(expected));
    return this;
  }

  /**
   * Check if previous character is not equals to the expected.
   * 
   * @param {String} expected
   * 
   * @return {IteratorFlow} this
   */
  andPreviousCharacterNotIs(expected) {
    this.and(!this.char.previousCharacter().is(expected));
    return this;
  }

  /**
   * Find backwards any of the given chars.
   * 
   * This will change `this.iterator` which is passed 
   * to `this.then` callback.
   * 
   * @param {String} ...chars
   * 
   * @return {IteratorFlow} this
   */
  findBackwards(...chars) {
    const tex = this.tex;
    let i = this.iterator;

    while (i--) {
      if (~chars.indexOf(tex[i])) {
        break;
      }
    }

    this.iterator = i;
    return this;
  }

  /**
   * Find forwards any of the given chars.
   * 
   * This will change `this.iterator` which is passed 
   * to `this.then` callback.
   * 
   * @param {String} ...chars
   * 
   * @return {IteratorFlow} this
   */
  findForwards(...chars) {
    const tex = this.tex;
    const length = tex.length;
    let i = this.iterator;

    while (i++ < length) {
      if (~chars.indexOf(tex[i])) {
        break;
      }
    }

    this.iterator = i;
    return this;
  }

  /**
   * If the assertion is truthy, call the given callback.
   * 
   * @param {Function} callback
   * 
   * @return {Void}
   */
  then(callback) {
    if (!this.assertion) {
      return;
    }
    callback(this.iterator);
  }
}

export default Iterator;