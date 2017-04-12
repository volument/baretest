
const test = require('..')('sum'),
  assert = require('assert'),
  sum = require('./sum')

test('sum', function() {
  assert.equal(sum(1, 2), 3)
})


test.run()
