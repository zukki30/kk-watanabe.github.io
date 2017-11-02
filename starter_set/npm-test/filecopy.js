const fs   = require('fs-extra')

const args = process.argv

let from = args[2]
let to   = args[3]

fs.copy(from, to)
