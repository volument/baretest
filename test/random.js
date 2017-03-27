
function wait() {
  return new Promise(function(done, fail) {
    setTimeout(done, 100)
  })
}

const foo = async function() {
  console.info('jooooopa')
}

async function kama() {
  await wait()
  ;[1, 2].forEach(async function() {
    await foo()
  })

  console.info('joo')
}

kama()