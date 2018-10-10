# 開発環境

Gulp + Webpackを使用した開発環境です。
使い方、ディレクトリなど開発環境について紹介します。

## 初期設定
### node.jsのインストール
インストールされていれば不要です。
インストールされていない場合は <a href="https://nodejs.org/ja/" target="_blank">公式サイト</a>からダウンロードしてください。

### モジュールのインストール
pakage.jsonのあるフォルダでコマンドプロトコルを開き「npm install」を実行してください。
pakage.jsonの記載されたモジュールがインストールされます。

### 注意点

#### PHPを使用する場合
gulpでPHPを使用する場合は特殊な設定が必要になります。
この開発環境では「<a href="https://www.apachefriends.org/jp/index.html" target="_blank">XAMPP</a>」を使用することを想定しています。
PHPをインストールし使用するとなると各PCでの設定で差異が出やすいため、差異がでないようにXAMPPを使用します。
XAMPPをインストール後は<a href="https://pc-karuma.net/xampp-php-path/" target="_blank">環境変数の設定</a>を行います。
その後はPCを再起動すれば設定完了となります。
後は、gulpfile/config.jsの設定を調整致します。

#### ※ gulp-cilを使用しない
通常gulpを使用する場合はgulp-cilをグローバルインストールする必要があります。
一度インストールすれば、それ以降する必要はなくなりますが、バージョンの管理が難しくなります。
この開発環境では、色々なプロジェクトで複数人を想定しているため、バージョン管理のしやすい構造を目指しました。

## コマンド
「npm install」が終わった後に実行します。

<dl>
<dt>npm run build</dt>
<dd>srcを元にhttpdocsを作成します。<br>すでにhttpdocsがある場合は削除後httpdocsが作成されます。</dd>

<dt>npm run start</dt>
<dd>httpdocsをルートにWebサーバーを立ち上げます。<br>立ち上げた後、srcを編集すると自動で反映されるようになります。</dd>
</dl>

## ディレクトリルール
<dl>
<dt>gulpfile</dt>
<dd>gulp、webpackなど開発環境の設定ファイルを格納。</dd>

<dt>src</dt>
<dd>開発用のファイルを格納。<br>設定ファイル以外、ここに格納。</dd>

<dt>httpdocs</dt>
<dd>開発用のファイルをコンパイルしたときに出力先となるフォルダ。<br>Webサーバーによりこのフォルダが表示。</dd>

<dt>lint</dt>
<dd>各linterの設定ファイルを格納。</dd>
</dl>

root
┣gulpfile
┃┠task              - gulpの設定ファイルを格納
┃┠confing.js        - gulpやwebpackで使用する設定をまとめたファイル
┃┗webpack.config.js - webpackの設定ファイル
┃
┣lint
┃┠.eslintrc.json - ESlintの設定ファイル
┃┠.htmlhintrc    - HTMLHintの設定ファイル
┃┗.sass-lint.yml - SASSの設定ファイル
┃
┣src
┃┣assets
┃┃┠img     - jpg|png|gifを格納。
┃┃┠svg     - svgファイルを格納。コンパイル後は「httpdocs/assets/img」に出力
┃┃┠sass    - scssファイルを格納。コンパイル後は「httpdocs/assets/css」に出力
┃┃┠js      - jsファイルを格納。
┃┃┠json    - jsonファイル。コンパイル後は「httpdocs/assets/js」に出力
┃┃┗include - includeするファイル
┃┗index.html|.php
┃
┣.gitignore
┣gulpfile.js
┣package.json
┗README.md

※外部ファイルは全てassetsフォルダに格納。
※複数のディレクトリにCSSや画像が入る場合にはgulpfile.jsのsetting変数の変更が必要です。

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

### HTML関連
- gulp-htmlhint

### 画像関連
- gulp-imagemin
- imagemin-jpegtran
- imagemin-optipng
- imagemin-svgo

### SVG関連
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

### JS関連
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

## gulpプラグインのバージョン管理
npm-check-updatesを使用し管理します。<br>
<a href="http://tacamy.hatenablog.com/entry/2016/08/10/193603" target="_blank">参考サイト</a>を参考に対応

## その他
### babelのバージョンの注意
babel-core、6.26.3の場合<br>
babel-loaderはバージョン 7 でないとエラーがでる

### CSSの記述順
CSSの順序は<a href="https://github.com/sasstools/sass-lint/blob/develop/lib/config/property-sort-orders/concentric.yml" target="_blank">concentric</a>を使用

### sass-lintの設定
sass-lintは<a href="https://github.com/sasstools/sass-lint/tree/develop/docs/rules" target="_blank">こちら</a>を確認

## 最後に
gulpfile.js で何を行っているのか、package.json にあるモジュールは何かを事前に把握して使用してください。
