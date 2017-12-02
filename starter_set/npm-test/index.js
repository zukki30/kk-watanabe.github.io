const fs   = require('fs')

const args = process.argv

let target = args[2]

fs.readFile(target, 'utf-8', (err, str) => {
  if (err) throw err
  console.log(str)
})
