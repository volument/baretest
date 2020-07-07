
const rgb = require('barecolor')

module.exports = function(headline) {
  const suite = [],
    before = [],
    after = [],
    only = []

  let quiet = true

  function self(name, fn) {
    suite.push({ name: name, fn: fn })
  }

  self.only = function(name, fn) {
    only.push({ name: name, fn: fn })
  }

  self.before = function(fn) { before.push(fn) }
  self.after = function(fn) { after.push(fn)  }
  self.skip = function(fn) {}

  self.group = function(name) {
    suite.push({ group: name })
  }

  self.quiet = function(_quiet) {
    quiet = _quiet
  }

  self.run = async function() {
    const tests = only[0] ? only : suite

    rgb.cyan(headline + '\n')

    for (const test of tests) {
      if (test.group) {
        rgb.cyan(`${ quiet ? '\n' : '' }  ${ test.group }${ quiet ? ' ' : '\n' }`)
        continue
      }

      try {
        for (const fn of before) await fn()
        await test.fn()
        if (quiet) {
          rgb.gray('• ')
        }
        else {
          rgb.gray(`    ${ test.name } `)
        }

      } catch(e) {
        for (const fn of after) await fn()
        if (quiet) {
          rgb.red(`\n\n! ${test.name} \n\n`)
        }
        else {
          rgb.redln('✘')
        }
        prettyError(e)
        return false
      }

      if (!quiet) {
        rgb.greenln('✓')
      }
    }

    for (const fn of after) await fn()
    rgb.greenln(`\n✓ ${ tests.filter( test => typeof test.group === 'undefined' ).length }`)
    console.info('\n')
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
