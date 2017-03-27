
const assert = require('assert'),
  rgb = require('rgb')

function toWidth(str, len) {
  return str + ' '.repeat(len - str.length)
}

function printError(e) {
  var msg = e.stack

  if (msg) {
    var i = msg.indexOf('\n')
    rgb.yellow(msg.slice(0, i) + '\n')
    rgb.gray(msg.slice(i))

  } else {
    rgb.yellow(e)

  }

}

const baretest = module.exports = function(suite_title) {
  var tests = {},
    before,
    after,
    only

  function self(title, fn) {
    if (!only) tests[title] = fn
  }

  self.before = function(fn) { before = fn }
  self.after = function(fn) { after = fn  }
  self.skip = function(fn) { }


  self.only = function(title, fn) {
    if (only) throw 'only already defined: ' + only
    tests = {}
    self(title, fn)
    only = title
  }

  self.throws = async function(msg, fn) {
    try {
      await fn()
      throw 'nothing'

    } catch(e) {
      if (typeof e == 'string') {
        assert.equal(e, msg)

      } else {
        e = JSON.stringify(e)
        assert(e.toString().includes(msg), `${e} includes ${msg}`)

      }
    }
  }

  self.run = async function() {
    var titles = Object.keys(tests),
      count = 0

    rgb.cyan(toWidth(suite_title, 20))

    for (var i = 0, title; (title = titles[i]); i++) {
      var fn = tests[title]

      try {
        if (before) await before()
        await fn()
        rgb.gray(' •')
        count++

      } catch(e) {
        if (after) await after()
        var nll = '\n\n'
        console.info(e)
        rgb.red(nll + '✖ ' + title + ': ')
        printError(e)
        throw nll
      }

    }

    if (after) await after()

    rgb.green(` ✓ ${ count }\n`)
  }

  return self

}

baretest.runAll = require('./run-all')



