<?php
/*****************************************************************
Project Name    : gulp_php
File Name       : set.php
Encoding        : UTF-8
Creation Date   : 2018-10-16

© 2018 K.watanabe

This source code or any portion thereof must not be
reproduced or used in any manner whatsoever
*****************************************************************/

#ライブラリの読み込み
require_once(dirname(__FILE__).'/../config/config.php'); #ユーザ管理クラス
require_once(dirname(__FILE__).'/units.php'); 		 #ユーティリティクラス

#各種インスタンスの作成
$units = new units;

#言語の設定
mb_language('japanese');
mb_internal_encoding('UTF-8');

