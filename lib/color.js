
var supported = process.env.COLORTERM || /^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)

var codes = {
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39]
}

var color = {}

Object.keys(codes).forEach(function (name) {
  var els = codes[name]

  color[name] = function(str) {
    if (supported) str ='\u001b[' + els[0] + 'm' + str + '\u001b[' + els[1] + 'm'
    process.stdout.write(str)
  }

})

module.exports = color

