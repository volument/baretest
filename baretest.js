
const rgb = require('barecolor')

module.exports = function(headline) {
  const suite = [],
    before = [],
    after = [],
    only = []

  function self(name, fn) {
    suite.push({ name: name, fn: fn })
  }

  self.only = function(name, fn) {
    only.push({ name: name, fn: fn })
  }

  self.before = function(fn) { before.push(fn) }
  self.after = function(fn) { after.push(fn)  }
  self.skip = function(fn) {}

  self.run = async function() {
    const tests = only[0] ? only : suite

    rgb.cyan(headline + ' ')

    for (const test of tests) {
      try {
        for (const fn of before) await fn()
        await test.fn()
        rgb.gray('• ')

      } catch(e) {
        for (const fn of after) await fn()
        rgb.red(`\n\n! ${test.name} \n\n`)
        prettyError(e)
        return false
      }
    }

    for (const fn of after) await fn()
    rgb.greenln(`✓ ${ tests.length }`)
    return true
  }

  return self

}


function prettyError(e) {
  const msg = e.stack
  if (!msg) return rgb.yellow(e)

  const i = msg.indexOf('\n')
  rgb.yellowln(msg.slice(0, i))
  rgb.gray(msg.slice(i))
}

