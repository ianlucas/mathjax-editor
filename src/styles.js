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

  '.mj-ed-input': {
    left: '-100%',
    position: 'absolute',
    top: '-100%'
  },

  '.mj-ed-display': {
    'box-sizing': 'border-box',
//    'overflow-x': 'scroll'
  },

  '.mj-ed-display *': {
    outline: 'none'
  },

  '.mj-ed-selectionButton': {
    cursor: 'text'
  },

  '.mjx-isEmpty': {
    color: '#ccc'
  },

  '@keyframes mj-ed-blink': animation,
  '@keyframes mj-ed-blink': animation,
  '@-moz-keyframes mj-ed-blink': animation,
  '@-webkit-keyframes mj-ed-blink': animation,
  '@-ms-keyframes mj-ed-blink': animation,
  '@-o-keyframes mj-ed-blink': animation
};