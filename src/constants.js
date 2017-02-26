module.exports = {
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
  },

  relationCommands: [
    'geq',
    'leq',
    'll',
    'gg',
    'doteq',
    'equiv',
    'approx',
    'cong',
    'simeq',
    'sim',
    'propto',
    'neq',
    'subset',
    'subseteq',
    'nsubseteq',
    'sqsubset',
    'sqsubseteq',
    'preceq',
    'supset',
    'supseteq',
    'nsupseteq',
    'sqsupset',
    'sqsupseteq',
    'succeq'
  ]
};