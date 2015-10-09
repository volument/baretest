
var assert = require('assert'),
    co = require('co'),
    tests = {},
    before,
    debug,
    only

// string colors
require('./color')


function* run() {
  var suite = only || tests,
      titles = Object.keys(suite)

  for (var i = 0, title; (title = titles[i]); i++) {
    var fn = suite[title]

    try {
      if (before) yield before()
      yield fn()
      console.info('  ✓'.green, title)

    } catch(e) {
      console.error('  ✖'.red, title.underline, e.stack.gray)
    }

  }
}

// override to support generators
assert.throws = function* (fn, msg) {
  try {
    yield fn()
  } catch(e) {
    assert.equal(e, msg)
  }
}

function test(title, fn) {
  if (!title) {
    return co(function* () {
      yield run()
      console.info('\n')
    })
  }

  if (typeof title == 'function') { fn = title; title = '' }
  tests[title] = fn
  return test
}


test.title = function(title, fn) {
  console.info('\n' + title.bold + '\n')
}

test.before = function(fn) {
  before = fn
  return test
}

test.only = function(title, fn) {
  only = {}
  only[title] = fn
  return test
}


module.exports = test

