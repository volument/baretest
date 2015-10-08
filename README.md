
## Mimimal test lib for JS generator functions

I hate you. Why do we possibly need another test library, for christ sake!

- 98% smaller codebase, 50% faster startup
- only what you want: test, test.only, test.before
- ridiculously small, easy to gasp, trivial to contribute
- output based on the standard `debug` libr
- require('assert') is your friend



``` javascript
var test = require('baretest')('users')

// run before tests
test.before(function* () {})

// unit test with title
test('create new site', function* () {})

// run this test only
test.only('this here', function* () { })

// run tests
test()
```
