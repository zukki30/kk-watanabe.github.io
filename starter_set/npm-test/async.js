let promise = new Promise((resolve, reject) => { // #1
  console.log('#1')
  resolve('Hello ')
})

promise.then((msg) => { // #2
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('#2')
      resolve(msg + "I'm ")
    }, 500)
  })
}).then((msg) => { // #3
  console.log('#3')
  return msg + 'Jeccy.'
}).then((msg) => { // #4
  console.log('#4')
  console.log(msg)
}).catch(() => { // エラーハンドリング
  console.error('Something wrong!')
})
