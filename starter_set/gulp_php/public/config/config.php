<?php
//SEOファイルのインクルード
require_once('seo_config.php');

/*****************************************************************
Project Name    : gulp_php
File Name       : config.php
Encoding        : UTF-8
Creation Date   : 2018-10-16

© 2018 K.watanabe

This source code or any portion thereof must not be
reproduced or used in any manner whatsoever
*****************************************************************/

//////////////////////////////////////////////////////////////////////////////////
////プロジェクト情報
//////////////////////////////////////////////////////////////////////////////////
define('_SITE_NAME_'  , 'site名');
define('_SITE_URL_'   , 'http://dummy.com');
define('_SITE_EMAIL_' , 'no-reply@dummy.com');

//////////////////////////////////////////////////////////////////////////////////
////データベース管理
//////////////////////////////////////////////////////////////////////////////////
// サーバ
define('__DB_SERVER__' , 'localhost');

// データベース
define('__DB_NAME__' , 'db_name');

// ユーザ
define('__DB_USER__' , 'db_user');

// パスワード
define('__DB_PASSWD__' , 'db_pass');

// デバッグモード
define('__DB_DEBUG__' , false);

// 文字コード
define('__DB_CHARACTER__' , 'utf8');

// WordPress データベーステーブルの接頭辞
define('__WP_PREFIX__' , 'wp_');

//////////////////////////////////////////////////////////////////////////////////
////SNS管理
//////////////////////////////////////////////////////////////////////////////////
define('__OG_IMG__' , _SITE_URL_.'assets/common/dummy.png');
define('__OG_LOCALE__' , 'ja_JP');

define('__TWITTER_CARD__' , 'summary');
define('__TWITTER_DOMEIN__' , 'Twitterユーザー名');
define('__TWITTER_SITE__' , '@'.__TWITTER_DOMEIN__);
