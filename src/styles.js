const animation = 
`from, to { border-color: #000 }
 50% { border-color: transparent }`;

export default {
  '.mjx-cursor': {
    '-webkit-animation': '1s mj-ed-blink step-end infinite',
    '-moz-animation': '1s mj-ed-blink step-end infinite',
    '-ms-animation': '1s mj-ed-blink step-end infinite',
    '-o-animation': '1s mj-ed-blink step-end infinite',
    animation: '1s mj-ed-blink step-end infinite',
    'border-right': '2px solid #000',
    color: 'transparent'
  },

  '.mjx-cursor.wasRecentlyPlaced': {
    'border-right-color': '#000 !important'
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
  
  '.mjx-isEmpty': {
    color: '#ccc'
  },

  '@keyframes mj-ed-blink': animation,
  '@-moz-keyframes mj-ed-blink': animation,
  '@-webkit-keyframes mj-ed-blink': animation,
  '@-ms-keyframes mj-ed-blink': animation,
  '@-o-keyframes mj-ed-blink': animation
};