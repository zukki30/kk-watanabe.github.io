# 開発環境の使い方（Gulp Expert）
全てコマンドプロンプトから実行します。
OSはWindowsを想定してます。

## 初期設定
WPなど制作用（src）と表示用（httpdocs）を分けた場合に使用するgulp

## コマンド
<dl>
<dt>gulp build</dt>
<dd>imagemin、jsminifyを実行するためのコマンド</dd>

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

## gulpプラグインのバージョン管理
npm-check-updatesを使用し管理します。<br>
<a href="http://tacamy.hatenablog.com/entry/2016/08/10/193603" target="_blank">参考サイト</a>を参考に対応

## 最後に
gulpfile.js で何を行っているのか、package.json にあるモジュールは何かを事前に把握して使用してください。
