
var assert = require('assert'),
    co = require('co'),
    tests = {},
    before,
    debug,
    only

function run() {
  var suite = only || tests,
      titles = Object.keys(suite)

  co(function* () {

    for (var i = 0, title; (title = titles[i]); i++) {
      var fn = suite[title]

      try {
        if (before) yield before()
        yield fn()
        debug('✓', title)

      } catch(e) {
        console.error(title, ': ', e.stack)
        throw e
      }
    }
  })
}

function baretest(title, fn) {
  if (!title) return run()
  if (typeof title == 'function') { fn = title; title = '' }
  tests[title] = fn
  return baretest
}

// override to support generators
assert.throws = function* (fn, msg) {
  try {
    yield fn()
  } catch(e) {
    assert.equal(e, msg)
  }
}

baretest.before = function(fn) {
  before = fn
  return baretest
}

baretest.only = function(title, fn) {
  only = {}
  only[title] = fn
  return baretest
}

module.exports = function(category) {
  process.env.DEBUG += ',' + category
  debug = require('debug')(category)
  return baretest
}

