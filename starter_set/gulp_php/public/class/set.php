<?php
/******************************************************************************
 * 共通設定ファイル
 * Copyright(c) K.Sasaki All Rights Reserved.
 * @Author : K.Sasaki
 * @access : public
 *
 * エラー情報は、メンバ変数である$errorに格納
 *
 *
 * このクラスではシステムで使用する共通の変数を提供し、インスタンスを作成する。
 *
 *****************************************************************************/

#ライブラリの読み込み
require_once(dirname(__FILE__).'/../config/config.php'); #ユーザ管理クラス
//require_once(dirname(__FILE__).'/news.php'); 			#ユーザ管理クラス
//require_once(dirname(__FILE__).'/news_image.php'); 		#ユーザ管理クラス
require_once(dirname(__FILE__).'/utils.php'); 			#ユーティリティクラス
require_once(dirname(__FILE__).'/sanitize.php'); 		#ユーティリティクラス
require_once(dirname(__FILE__).'/pager.php'); 			#ページャークラス

#各種インスタンスの作成
// $news			= new news;
// $news_image		= new news_image;
$utils			= new utils;
$sanitize		= new sanitize;

#言語の設定
mb_language("japanese");
mb_internal_encoding("UTF-8");

