
var supported = process.env.COLORTERM || /^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)

var codes = {
  // reset: [0, 0],
  // strikethrough: [9, 29],
  // italic: [3, 23],
  // dim: [2, 22],

  bold: [1, 22],
  underline: [4, 24],
  hidden: [8, 28],
  bg: [7, 27],

  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39]

}

Object.keys(codes).forEach(function (color) {
  var els = codes[color]

  String.prototype.__defineGetter__(color, function() {
    return supported ? '\u001b[' + els[0] + 'm' + this + '\u001b[' + els[1] + 'm' : '' + this
  })

})

