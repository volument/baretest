
function testable(path) {
  var els = process.env.TEST || ''
  if (!els || els == '*') return true
  els = els.split(',')

  for (var i = 0, el; (el = els[i]); i++) {
    if (path.includes(el)) return true
  }
}

module.exports = async function() {
  for (const path of arguments) {
    if (testable(path)) {
      const test = require(process.cwd() + '/' + path)
      await test.run()
    }
  }
}