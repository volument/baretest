
## Mimimal testing for JavaScript generator functions
98% smaller than Mocha, faster startup, designed to `yield`, beautiful output

> Why do we possibly need another test library, for christ sake! I hate you.


- yield is a different beast, demands a new approach
- ridiculously small, easy to gasp, trivial to contribute
- only what you want: test(), test.only(), test.before()
- output based on the standard `debug` library
- the node- native `require('assert')` is your friend
- 98% smaller codebase (no kidding), 50%-80% faster startup
- no dependencies



``` javascript
var test = require('baretest')('users')

// run before tests
test.before(function* () {})

// unit test with title
test('create new site', function* () {})

// run this test only
test.only('this here', function* () { })

// run tests
yield test.run()
```


### Running multiple tests

``` javascript
var baretest = require('baretest')

yield baretest.run(['server/tests', 'user/tests'])
```