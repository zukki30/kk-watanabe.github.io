# 開発環境の使い方（Gulp Expert）
全てコマンドプロンプトから実行します。
OSはWindowsを想定してます。

## 初期設定
###node.jsのインストール
インストールされていれば不要です。
コマンドプロンプトを開いて`node -v`と入力・実行し、バージョン表記が表示されればインストールされています。
インストールされていない場合は <a href="https://nodejs.org/" target="_blank">node.js</a> 公式サイトからダウンロードしてインストールしてください。

###gulpのインストール
コマンドプロンプトで`npm install gulp -g`と入力・実行してください。

## モジュールのインストール
package.json があるフォルダで[Shift+右クリック]→[コマンドウィンドウでここを開く]を選択してコマンドプロンプトを開き、npm install と入力・実行してください。
node_modules というフォルダが作成され、その中にインストールされます。
この操作は案件が変わり別のディレクトリなった場合にはもう一度必要になります。

## コマンド
<dl>
<dt>gulp clean</dt>
<dd>httpdocs を削除する。</dd>

<dt>gulp build</dt>
<dd>src フォルダを元にコンパイルしたファイルを httpdocs フォルダに出力する。<br>
      すでに httpdocs がある場合は一度削除するため、httpdocs に直接ファイルを置かないように気をつける。<br>
      上記で紹介しているコマンドを一括で実行する。</dd>

<dt>gulp</dt>
<dd>httpdocsフォルダをルートにWebサーバを立ち上げる。<br>
      ローカルとイントラネット内で確認できるAccess URLsを発行してくれる。<br>
      PHPを使用する場合は、setting.browserSync.server をコメントアウトし、<br>
      setting.browserSync.proxyにxamppで作成したローカルテスト環境のドメインを指定する。</dd>
</dl>

## 主なパッケージの概要
<dl>
<dt>gulp-browserSync</dt>
<dd>gulpコマンドで立ち上げたWebサーバへのAccess URLにアクセスしているブラウザの挙動（スクロールやリロードなど）を同期する。<br>
xxx:3001 にアクセスすることで同期する挙動の制御などができる。</dd>

<dt>gulp-sass</dt>
<dd>scssファイルのコンパイル</dd>

<dt>gulp-imagemin</dt>
<dd>画像ファイルの圧縮（デフォルトでは無効）</dd>

<dt>gulp-autoprefixer</dt>
<dd>ベンダープレフィックスの付与</dd>

<dt>gulp-csso</dt>
<dd>CSSを圧縮、不要な記述を取り除くなどして軽量化／最適化する</dd>

<dt>css-mqpacker</dt>
<dd>CSS3のメディアクエリをひとまとめにする</dd>

<dt>gulp-postcss</dt>
<dd>多様なプラグインを用いてCSSを変換する</dd>

<dt>gulp-uglify</dt>
<dd>JSコードのミニファイ（デフォルトでは無効）</dd>

</dl>

##ディレクトリルール
<dl>
<dt>src</dt>
<dd>開発用のデータを入れるフォルダ。このフォルダに全てのデータを格納するようにする。</dd>
<dt>httpdocs</dt>
<dd>開発用のデータをコンパイルしたときに出力先となるフォルダ。Webサーバで確認するときのルートフォルダになる。</dd>
</dl>

src
┣assets
┃┠img     - jpg|png|gif|svg
┃┠sass    - scss
┃┠js      - js
┃┠include - includeするファイル
┃┗etc     - 上記に含まれないもの全て
┠sitemap.xml
┗index.html|.php

※外部ファイルは全てassetsフォルダに入れる。
※上記のフォルダ以外のフォルダに入ったファイルは全てコピーされます。
※複数のディレクトリにCSSや画像が入る場合にはgulpfile.jsのsetting変数の変更が必要です。

## gulpプラグインのバージョン管理
npm-check-updatesを使用し管理します。<br>
<a href="http://tacamy.hatenablog.com/entry/2016/08/10/193603" target="_blank">参考サイト</a>を参考に対応

## 最後に
gulpfile.js で何を行っているのか、package.json にあるモジュールは何かを事前に把握して使用してください。

## メモ
gulp-cliを使用しない
忘れてしまうから

そのかわり下のコマンドを使用する

### コマンド
start : npm run gulp
build : npm run build

## メモ2
importは使用しない
追記でバベルのプラグインが必要なため
設定ファイルも追加が必要

### メモ3
babel-core、6.26.3の場合、
babel-loaderはバージョン 7 でないとエラーがでる

### メモ4
CSSの順序は下記を対応
https://github.com/sasstools/sass-lint/blob/develop/lib/config/property-sort-orders/concentric.yml

### メモ5
sass-lintは下記を確認
https://github.com/sasstools/sass-lint/tree/develop/docs/rules

### メモ6
sublime text で「Hayaku」を使用すると「:（コロン）」前にスペースを入れられない
emmentであれば設定で対応可能

### メモ7
xamppを使用しPHPを環境変数にする場合、PCを再起動する必要がある場合がある
