module.exports = `
.mjx-cursor {
  -webkit-animation: 1s mj-ed-blink step-end infinite;
  -moz-animation: 1s mj-ed-blink step-end infinite;
  -ms-animation: 1s mj-ed-blink step-end infinite;
  -o-animation: 1s mj-ed-blink step-end infinite;
  animation: 1s mj-ed-blink step-end infinite;
  border-right: 2px solid #000;
  color: transparent;
}

.mjx-cursor.wasRecentlyPlaced {
  border-right-color: black !important;
}

.mj-ed-input {
  left: -100%;
  position: absolute;
  top: -100%;
}

.mj-ed-display {
  box-sizing: border-box;
}

.mj-ed-display * {
  outline: none;
}

.mj-ed-selectionButton {
  cursor: text;
}

.mjx-isEmpty {
  color: #ccc;
}

@keyframes mj-ed-blink {
  from, to {
    border-color: black;
  }
  50% {
    border-color: transparent;
  }
}

@-moz-keyframes mj-ed-blink {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: black;
  }
}

@-webkit-keyframes mj-ed-blink {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: black;
  }
}

@-ms-keyframes mj-ed-blink {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: black;
  }
}

@-o-keyframes mj-ed-blink {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: black;
  }
}
`;