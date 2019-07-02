# 開発環境

Gulp + Webpack を使用した開発環境です。
使い方、ディレクトリなど開発環境について紹介します。

## 初期設定

### node.js のインストール

インストールされていれば不要です。
インストールされていない場合は <a href="https://nodejs.org/ja/" target="_blank">公式サイト</a>からダウンロードしてください。

### モジュールのインストール

pakage.json のあるフォルダでコマンドプロトコルを開き「npm install」を実行してください。
pakage.json の記載されたモジュールがインストールされます。

### 注意点

#### PHP を使用する場合

gulp で PHP を使用する場合は特殊な設定が必要になります。
この開発環境では「<a href="https://www.apachefriends.org/jp/index.html" target="_blank">XAMPP</a>」を使用することを想定しています。
PHP をインストールし使用するとなると各 PC での設定で差異が出やすいため、差異がでないように XAMPP を使用します。
XAMPP をインストール後は<a href="https://pc-karuma.net/xampp-php-path/" target="_blank">環境変数の設定</a>を行います。
その後は PC を再起動すれば設定完了となります。
後は、gulpfile/config.js の設定を調整致します。

#### ※ gulp-cil を使用しない

通常 gulp を使用する場合は gulp-cil をグローバルインストールする必要があります。
一度インストールすれば、それ以降する必要はなくなりますが、バージョンの管理が難しくなります。
この開発環境では、色々なプロジェクトで複数人を想定しているため、バージョン管理のしやすい構造を目指しました。

## コマンド

「npm install」が終わった後に実行します。

<dl>
<dt>npx gulp build</dt>
<dd>srcを元にdocsを作成します。<br>すでにdocsがある場合は削除後docsが作成されます。</dd>

<dt>npx gulp</dt>
<dd>docsをルートにWebサーバーを立ち上げます。<br>立ち上げた後、srcを編集すると自動で反映されるようになります。</dd>
</dl>

## ディレクトリルール

<dl>
<dt>gulpfile</dt>
<dd>gulp、webpackなど開発環境の設定ファイルを格納。</dd>

<dt>src</dt>
<dd>開発用のファイルを格納。<br>設定ファイル以外、ここに格納。</dd>

<dt>docs</dt>
<dd>開発用のファイルをコンパイルしたときに出力先となるフォルダ。<br>Webサーバーによりこのフォルダが表示。</dd>

<dt>lint</dt>
<dd>各linterの設定ファイルを格納。</dd>
</dl>

### 全体の構成

root
┣gulpfile
┃┠task - gulp の設定ファイルを格納
┃┠confing.js - gulp や webpack で使用する設定をまとめたファイル
┃┗webpack.config.js - webpack の設定ファイル
┃
┣lint
┃┠.eslintrc.json - ESlint の設定ファイル
┃┠.htmlhintrc - HTMLHint の設定ファイル
┃┗.sass-lint.yml - SASS の設定ファイル
┃
┣src
┃┣assets
┃┃┠img - jpg|png|gif を格納。
┃┃┠svg - svg ファイルを格納。コンパイル後は「docs/assets/img」に出力
┃┃┠sass - scss ファイルを格納。コンパイル後は「docs/assets/css」に出力
┃┃┠js - js ファイルを格納。
┃┃┠json - json ファイル。コンパイル後は「docs/assets/js」に出力
┃┃┗include - include するファイル
┃┗index.html|.php
┃
┣.gitignore
┣gulpfile.js
┣package.json
┗README.md

※外部ファイルは全て assets フォルダに格納。
※複数のディレクトリに CSS や画像が入る場合には gulpfile.js の setting 変数の変更が必要です。

## パッケージの分類

### 全体

- browser-sync
- del
- gulp
- gulp-changed
- gulp-connect-php
- gulp-if
- gulp-load-plugins
- gulp-notify
- gulp-path
- gulp-plumber
- gulp-path
- require-dir
- run-sequence

### HTML 関連

- gulp-htmlhint

### 画像関連

- gulp-imagemin
- imagemin-jpegtran
- imagemin-optipng
- imagemin-svgo

### SVG 関連

- gulp-cheerio
- gulp-svgmin
- gulp-svgstore

### CSS(SASS)関連

- css-mqpacker
- gulp-autoprefixer
- gulp-csso
- gulp-postcss
- gulp-sass
- gulp-sass-lint
- gulp-sourcemaps

### JS 関連

- babel-core
- babel-loader
- babel-preset-env
- eslint
- eslint-loader
- gulp-uglify-es
- jquery
- uglifyjs-webpack-plugin
- webpack
- webpack-stream

## gulp プラグインのバージョン管理

npm-check-updates を使用し管理します。<br>
<a href="http://tacamy.hatenablog.com/entry/2016/08/10/193603" target="_blank">参考サイト</a>を参考に対応

## その他

### babel のバージョンの注意

babel-core、6.26.3 の場合<br>
babel-loader はバージョン 7 でないとエラーがでる

### CSS の記述順

CSS の順序は<a href="https://github.com/sasstools/sass-lint/blob/develop/lib/config/property-sort-orders/concentric.yml" target="_blank">concentric</a>を使用

### sass-lint の設定

sass-lint は<a href="https://github.com/sasstools/sass-lint/tree/develop/docs/rules" target="_blank">こちら</a>を確認

## 最後に

gulpfile.js で何を行っているのか、package.json にあるモジュールは何かを事前に把握して使用してください。
