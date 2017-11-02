const fs   = require('fs-extra')
const sass = require('node-sass')
const path = require('path')

const args = process.argv // 引数を取得

let src  = args[2] // 入力(sass)
let dist = args[3] // 出力(css)

// sassをビルドするオプション
let option = {
  // sassのimport時の相対パスの起点を、
  // import元のsassファイルのディレクトリにする
  includePaths: [path.dirname(src)]
}

Promise.resolve()
  .then(() => {
    // sassファイルの内容を読み込む
    return new Promise((resolve, reject) => {
      console.log('Read File...')

      fs.readFile(src, (err, data) => {
        if (err) reject(new Error(err))
        else resolve(data)
      })
    })
  }).then((data) => {
    // sassをcssに変換する(ファイルに出力はしない)
    return new Promise((resolve, reject) => {
      console.log('Compile Sass...')

      option.data = data.toString()

      sass.render(option, (err, data) => {
        if (err) reject(new Error(err))
        else resolve(data)
      })
    })
  }).then((data) => {
    // 変換後のcssをファイルに出力する
    return new Promise((resolve, reject) => {
      console.log('Output...')

      fs.outputFile(dist, data.css, (err) => {
        if (err) reject(new Error(err))
        else resolve()
      })
    })
  }).then(() => {
    console.log('Completed!')
  })
  .catch((error) => {
    // エラーハンドリング
    console.error(error)
  })
