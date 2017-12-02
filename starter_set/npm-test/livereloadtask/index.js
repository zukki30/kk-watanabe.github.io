const fs     = require('fs-extra')
const path   = require('path')
const glob   = require('glob')
const sass   = require('./lib/sass')
const config = require('./config/config')
const cmd    = process.argv[2]
const bs     = require('browser-sync').create()
const gaze   = require('gaze')

let srcDir = 'src'
let distDir = 'public'
let sassPtn = path.join(srcDir, '/style/**/!(_)*.scss')

/* ターミナルから受け取ったコマンドを実行 */
switch (cmd) {
  case 'sass':
    fileList(sassPtn)
      .then(files => {
        Promise.all(files.map(buildSass.bind(null, config.sass)))
      })
      .then(() => console.log('Sass build finished!'))
      .catch(err => console.error(err))
    break
  case 'server':
    startServer(config.server)
    break
}

/* ビルド関数 */
function buildSass (config, file) {
  readFile(file)
    .then(sass.bind(null, config))
    .then(data => data.css.toString())
    .then(outputFile.bind(null, distPath('css', file)))
    .catch(err => console.error(err))
}

function startServer () {
  bs.init({
    server: distDir,
    files: path.join(distDir, '/**/+(*.html|*.js|*.css)')
  })
  gaze(path.join(srcDir, '/**/*.scss'), (err, watcher) => {
    if (err) console.error(err)
    watcher.on('all', (ev, file) => buildSass(config.sass, file))
  })
}

/* ユーティリティ */
function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function fileList (pattern, option = {}) {
  return new Promise((resolve, reject) => {
    glob(pattern, option, (err, files) => {
      if (err) reject(err)
      else resolve(files)
    })
  })
}

function outputFile (file, data) {
  return new Promise((resolve, reject) => {
    fs.outputFile(file, data, err => {
      if (err) reject(err)
      else resolve()
    })
  })
}

function distPath (ext, file) {
  let parse = path.parse(file)
  return path.join(parse.dir.replace(srcDir, distDir), `${parse.name}.${ext}`)
}
