export default {
  cursorTex: '{\\cursor}',

  emptyTex: '\\isEmpty',

  spacingTex: '\\;',

  number: /^[0-9]$/,

  variable: /^[a-z]$/,

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
  }
};