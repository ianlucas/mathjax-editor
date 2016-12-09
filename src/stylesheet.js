module.exports = `
.mjx-cursor {
  -webkit-animation: 1s mj-ed-blink step-end infinite;
  -moz-animation: 1s mj-ed-blink step-end infinite;
  -ms-animation: 1s mj-ed-blink step-end infinite;
  -o-animation: 1s mj-ed-blink step-end infinite;
  animation: 1s mj-ed-blink step-end infinite;
}

@keyframes mj-ed-blink {
  from, to {
    color: black;
  }
  50% {
    color: transparent;
  }
}

@-moz-keyframes mj-ed-blink {
  from, to {
    color: transparent;
  }
  50% {
    color: black;
  }
}

@-webkit-keyframes mj-ed-blink {
  from, to {
    color: transparent;
  }
  50% {
    color: black;
  }
}

@-ms-keyframes mj-ed-blink {
  from, to {
    color: transparent;
  }
  50% {
    color: black;
  }
}

@-o-keyframes mj-ed-blink {
  from, to {
    color: transparent;
  }
  50% {
    color: black;
  }
}
`;