const animation = 
`from, to { opacity: 1 }
 50% { opacity: 0 }`;

export default {
  '.Mathjax_Editor': {
    '-moz-user-select': 'none',
    '-webkit-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none'
  },

  '.Mathjax_EditorCursor.wasRecentlyPlaced': {
    'animation': 'none !important',
    'opacity': '1 !important'
  },

  '.Mathjax_EditorInput': {
    left: '-100%',
    position: 'absolute',
    top: '-100%'
  },

  '.Mathjax_EditorDisplay': {
    'box-sizing': 'border-box',
    'cursor': 'text',
    'overflow-Y': 'overflow'
  },

  '.Mathjax_EditorDisplay *': {
    outline: 'none'
  },

  '.Mathjax_EditorCursor': {
    '-webkit-animation': '1s Mathjax_EditorCursorBlink step-end infinite',
    '-moz-animation': '1s Mathjax_EditorCursorBlink step-end infinite',
    '-ms-animation': '1s Mathjax_EditorCursorBlink step-end infinite',
    '-o-animation': '1s Mathjax_EditorCursorBlink step-end infinite',
    animation: '1s Mathjax_EditorCursorBlink step-end infinite',
    'background-color': '#000',
    position: 'absolute',
    width: '2px'
  },

  '.mjx-isEmpty': {
    color: '#ccc'
  },

  '@keyframes Mathjax_EditorCursorBlink': animation,
  '@-moz-keyframes Mathjax_EditorCursorBlink': animation,
  '@-webkit-keyframes Mathjax_EditorCursorBlink': animation,
  '@-ms-keyframes Mathjax_EditorCursorBlink': animation,
  '@-o-keyframes Mathjax_EditorCursorBlink': animation
};