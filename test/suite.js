
var baretest = require('..')

require('co')(function* () {
  yield baretest.runAll('test/a', 'test/b')


}).catch(function(e) {
  console.error(e)

})

