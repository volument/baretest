
function testable(path) {
  var els = process.env.TEST || ''
  if (!els || els == '*') return true
  els = els.split(',')

  for (var i = 0, el; (el = els[i]); i++) {
    if (path.includes(el)) return true
  }
}

module.exports = function* (paths) {

  for (var i = 0, path, test; (path = paths[i]); i++) {
    if (testable(path)) {
      test = require(process.cwd() + '/' + path)
      yield test.run()
    }
  }

}