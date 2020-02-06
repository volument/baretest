
![Baretest logo](https://volument.com/blog/img/baretest/logomark.png | width=400)

*Baretest* is an extremely simple JavaScript test runner. It has a tiny footprint, near-instant performance, and a brainless API. It makes testing tolerable.


### Install

```
npm install --save-dev baretest
```

With [pnpm](https://pnpm.js.org)

```
pnpm install --save-dev baretest
```

#### Links

[Documentation](https://volument.com/baretest)

... [Getting started](https://volument.com/baretest#getting-started)

... [API reference](https://volument.com/baretest#api-reference)

... [FAQ](https://volument.com/baretest#faq)


### Why Baretest?
We constantly hit `CMD + B` on *Sublime Text* to test a function we are actively working on. We do this all the time, sometimes hundreds of times a day. With Jest, each of these runs would take seconds, but Baretest runs under 100ms.

![A typical setup in Sublime Text](https://volument.com/blog/img/baretest/sublime.png | width=600)

![Comparing Jest vs Baretest](https://volument.com/blog/img/baretest/render.gif | width=600)


Another reason for building Baretest was to have an extremely simple API. Typically we only use `test()` and the Node's built-in `assert.equals()` methods to run our tests. We've never needed automatic re-ordering, file watchers, "mocking" or "snapshotting".


``` javascript
const test = require('baretest'),
  assert = require('assert'),
  app = require('my-app')

test('add user', async function() {
  const user = await app.addUser('test@cc.com')
  assert.equals(user.name, 'Test')
})

test('reject duplicate emails', async function() {
  await assert.rejects(async function() {
    await app.addUser('duplicate@address.com')
  })
})

// ...
```

We think a good test runner stays out of your way. We want to focus on the task at hand and not deal with the complexities of testing. We don't want to commit to a massive framework that dictates our work.

![How Baretest fits on the testing landscape](https://volument.com/blog/img/baretest/tester-matrix-big.png | width=600)


## License

Copyright 2020 OpenJS Foundation and contributors. Licensed under [MIT](./LICENSE).




