
var assert = require('assert'),
    color = require('./color'),
    co = require('co')

// override to support generators
assert.throws = function* (fn, msg) {
  try {
    yield fn()
  } catch(e) {
    assert.equal(e, msg)
  }
}

function toWidth(str, len) {
  return str + ' '.repeat(len - str.length)
}

function printError(e) {
  var msg = e.stack || e
      i = msg.indexOf('\n')

  color.yellow(msg.slice(0, i) + '\n')
  color.gray(msg.slice(i))

}

module.exports = function(suite_title) {

  var tests = {},
      before,
      only

  function self(title, fn) {
    if (!only) tests[title] = fn
  }

  self.before = function(fn) {
    before = fn
  }

  self.only = function(title, fn) {
    tests = {}
    self(title, fn)
    only = true
  }

  self.run = function* run() {
    var titles = Object.keys(tests),
        count = 0

    color.cyan(toWidth(suite_title, 20))

    for (var i = 0, title; (title = titles[i]); i++) {
      var fn = tests[title]

      try {
        if (before) yield before()
        yield fn()
        color.gray(' •')
        count++

      } catch(e) {
        var nll = '\n\n'
        color.red(nll + title + ': ')
        printError(e)
        throw nll
      }

    }

    color.green(` ✓ ${ count }\n`)
  }

  return self

}

