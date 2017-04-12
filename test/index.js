
// Tests for Baretest
const test = require('..')('test'),
  assert = require('assert')

let count = 0

function incr() {
  count++
}

test.before(incr)

test('A', incr)

test.skip('B', incr)


test('rejects', async function() {
  await assert.rejects(async function() {
    throw new TypeError('Oops')
  },
    { name: 'TypeError', message: 'Oops' }
  )
})


!(async function() {
  try {
    await test.run()
    assert.equal(count, 3)

  } finally {
    process.exit()
  }
})()