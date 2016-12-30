export default {
  cursorTex: '{\\cursor}',

  emptyTex: '\\isEmpty',

  spacingTex: '\\;',

  number: /^[0-9]$/,

  variable: /^[a-zA-Z]$/,

  nearClosureHaystack: ['}', ']'],

  supOrSub: ['^', '_'],

  operators: [
    '+', '-', '=', '<', '>', ',', '.',
    ':', ';', '?', '(', ')', '[', ']',
    '|'
  ],

  escapedOperators: [
    '{', '}', '%'
  ],

  escType: {
    '%': 'mi'
  },

  charToCommand: {
    '*': 'cdot',
    '/': 'div'
  }
};