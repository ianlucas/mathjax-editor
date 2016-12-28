export default {
  cursorTex: '{\\cursor}',

  emptyTex: '\\isEmpty',

  number: /^[0-9]$/,

  variable: /^[a-z]$/,

  nearClosureHaystack: ['}', ']'],

  operators: [
    '+', '-', '=', '<', '>', ',', '.',
    ':', ';', '?', '(', ')', '[', ']'
  ],

  escapedOperators: [
    '{', '}', '%'
  ],

  escType: {
    '%': 'mi'
  }
};