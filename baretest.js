
const rgb = require('barecolor')

module.exports = function(headline) {
  const suite = [],
    before = [],
    after = [],
    only = []

  let bail = true,
    quiet = true,
    tap = false,
    count = 0,
    passed = true

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

  self.bail = function(_bail) { bail = _bail }
  self.quiet = function(_quiet) { quiet = _quiet }
  self.tap = function(_tap) { tap = _tap }

  self.run = async function() {
    const tests = only[0] ? only : suite

    if (tap) {
      console.log(`# ${ headline }`)
      console.log(`1..${ tests.filter(test => typeof test.group === 'undefined').length}`)
    }
    else {
      rgb.cyan(headline + '\n')
    }

    for (const test of tests) {
      if (test.group) {
        emit(test)
        continue
      }

      try {
        ++count;
        for (const fn of before) await fn()
        await test.fn()
        emit({
          count,
          test,
          passed: true
        });
      } catch(e) {
        emit({
          count,
          test,
          failed: true,
          e
        })

        if (bail) {
          for (const fn of after) await fn()

          if (tap) {
            console.log('Bail out!')
          }
          return false
        }

        passed = false
      }
    }

    for (const fn of after) await fn()
    if (!tap) {
      rgb.greenln(`\n✓ ${ tests.filter( test => typeof test.group === 'undefined' ).length }`)
    }
    console.info('\n')
    return passed
  }

  function emit(result) {
    if (result.group) {
      if (tap) {
        console.log( `#   ${ result.group }` )
      }
      else if (quiet) {
        rgb.cyan(`\n  ${ result.group } `)
      }
      else {
        rgb.cyan(`  ${ result.group }\n`)
      }
    }
    else if (result.passed) {
      if (tap) {
        console.log(`ok ${ result.count } ${ result.test.name }`)
      }
      else if (quiet) {
        rgb.gray('• ')
      }
      else {
        rgb.gray(`    ${ result.test.name } `)
        rgb.greenln( '✓' )
      }
    }
    else if (result.failed) {
      if (tap) {
        console.log(`not ok ${ result.count } ${ result.test.name }`)
      }
      else if (quiet) {
        rgb.red(`\n\n! ${ result.test.name } \n\n`)
      }
      else {
        rgb.gray(`    ${ result.test.name } `)
        rgb.redln( '✘' )
        console.log('')
      }

      if (tap) {
        console.log((result.e.stack ? result.e.stack.toString() : result.e.toString()).split('\n').map(line => `  ${ line }`).join( '\n'))
      }
      else {
        prettyError(result.e)
      }
    }
  }

  return self
}

function prettyError(e) {
  const msg = e.stack
  if (!msg) return rgb.yellow(e)

  const i = msg.indexOf('\n')
  rgb.yellowln(msg.slice(0, i))
  rgb.gray(msg.slice(i))
  console.log('\n\n')
}