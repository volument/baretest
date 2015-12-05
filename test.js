
var baretest = require('.')


require('co')(function* () {

  // users
  var test = baretest('User test suite')
  test('User 1', function* () {})
  test('User 2', function* () { false && process.ak() })
  test('User 3', function* () {})
  yield test.run()


  // sites
  test = baretest('Site tests')
  test('Site 1', function* () {})
  test('Site 2', function* () {})
  test('Site 3', function* () {})
  yield test.run()


}).catch(function(e) {
  console.error(e)

})

