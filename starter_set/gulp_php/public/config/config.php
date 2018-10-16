<?php
//SEOファイルのインクルード
require_once('seo_config.php');
define("_SITE_TITLE_"		, "ログイン"); 	// Titleタグ


/******************************************************************************
 * データベース管理
 * Copyright(c) K.Sasaki All Rights Reserved.
 * @Author : K.Sasaki
 * @access : public
 *
 *****************************************************************************/
// define("__DB_SERVER__"		, "mysql448.db.sakura.ne.jp"); 			// サーバ
// define("__DB_NAME__"		, "early-cross_db"); 			// データベース
// define("__DB_USER__"		, "early-cross"); 			// ユーザ
// define("__DB_PASSWD__"		, "dOTrV2wGY3");  	// パスワード
// define("__DB_DEBUG__"		,  FALSE); 			// デバッグモード
// define("__DB_CHARACTER__"	, 'UTF8'); 			// 文字コード
define("__DB_SERVER__"		, "localhost"); 			// サーバ
define("__DB_NAME__"		, "early_cross_db"); 			// データベース
define("__DB_USER__"		, "early"); 			// ユーザ
define("__DB_PASSWD__"		, "early");  	// パスワード
define("__DB_DEBUG__"		,  FALSE); 			// デバッグモード
define("__DB_CHARACTER__"	, 'UTF8'); 			// 文字コード
/******************************************************************************

 * ログインユーザ管理
 * Copyright(c) K.Sasaki All Rights Reserved.
 * @Author : K.Sasaki
 * @access : public
 *
 *****************************************************************************/
define("_LOGIN_USER_TBL_"		, "login_user"); 	// ログインユーザテーブル名
define("_LOGIN_USERNAME_"		, "username"); 		// ログインユーザー名
define("_LOGIN_PASSWORD_"		, "password"); 		// パスワード
define("_LOGIN_NICKNAME_"		, "nickname");  	// ニックネーム
define("_LOGIN_EMAIL_"			, "email"); 		// EMAIL
define("_LOGIN_SU_"				, 'su'); 			// スーパーユーザフラグ

define("_COOKIE_NAME_"			, 'manage_sess'); 	// セッション名
define("_COOKIE_TIME_"			, 60); 				// セッション生存期間（分）
define("_COOKIE_PASS_"			, '/'); 			// セッション有効エリア
define("_MAGIC_"				, 'aoimika'); 		// セッションマジック
define("_USER_COOKIE_NAME_"		, 'user_manage_sess'); 	// セッション名
define("_USER_COOKIE_TIME_"		, 60); 					// セッション生存期間（分）
define("_USER_COOKIE_PASS_"		, '/'); 				// セッション有効エリア
define("_USER_MAGIC_"			, 'syusukemika'); 		// セッションマジック

/******************************************************************************
 * ニュース管理
 * Copyright(c) K.Sasaki All Rights Reserved.
 * @Author : K.Sasaki
 * @access : public
 *
 *****************************************************************************/
define("_NEWS_TBL_"			, "news"); 			// ニューステーブル名
define("_NEWS_ID_"			, "id"); 			// ID
define("_NEWS_DATE_"		, "date"); 			// 更新日
define("_NEWS_TITLE_"		, "title"); 		// タイトル
define("_NEWS_COMMENT_"		, "comment"); 		// 本文
define("_NEWS_PUBLIC_"		, "public"); 		// 公開別
define("_NEWS_CREATE_AT_"	, "create_at"); 	// データ新規作成日

/******************************************************************************
 * ニュース画像管理
 * Copyright(c) K.Sasaki All Rights Reserved.
 * @Author : K.Sasaki
 * @access : public
 *
 *****************************************************************************/
define("_NEWS_IMG_TBL_"			, "news_image"); 				// ロゴテーブル名
define("_NEWS_IMG_ID_"			, "news_image_id"); 						// ロゴID
define("_NEWS_IMG_IMG_ID_"		, "news_image_no"); 			// ロゴID
define("_NEWS_IMG_NAME_"		, "news_image_name"); 			// ロゴ名
define("_NEWS_IMG_PATH_"		, "news_image_path"); 			// ロゴパス
define("_NEWS_IMG_THUMBS_PATH_"	, "news_image_thumbs_path"); 	// ロゴサムネイル画像パス


/******************************************************************************
 * 画像
 * Copyright(c) K.Sasaki All Rights Reserved.
 * @Author : K.Sasaki
 * @access : public
 *
 *****************************************************************************/
define('_THUMBS_IMG_QUALITY_',100);//サムネイル画像のクオリティ(0～100)
define('_THUMBS_IMG_WIDTH_'  ,700);# px
$allow_filetypes = array('image','application');
$allow_extensions = array('jpg','JPG','jpeg','JPEG','png','PNG','gif','GIF','tiff','TIFF','pjpeg','PJPEG');
define("_ROOT_UPDIR_"	, '/home/early-cross/www/img/upfile'); //アップロードするルートディレクトリ
define("_DS_"	, '/'); 					// セパレータ
define("_DOMAIN_"	, 'http://early-cross.co.jp'); 	// ドメイン
define("_IMAGE_NEWS_COUNT_"	, 2); 	// アップロード可能枚数

/******************************************************************************
 * フロントの1ページ内で表示する記事の数
 * Copyright(c) K.Sasaki All Rights Reserved.
 * @Author : K.Sasaki
 * @access : public
 *
 *****************************************************************************/
//ページャ指定の数を割る数を指定
define("_PAGER_COUNT_RATE_",5);



/******************************************************************************
 * EC事業の制作実績
 * Copyright(c) K.Watanabe All Rights Reserved.
 * @Author : K.Watanabe
 * @access : public
 *
 *****************************************************************************/
// define("_INDEX_FILE_" , "/portfolio/index.php");
// define("_DETAILE_FILE_" , "/portfolio/detail.php");

// $portfolio_sites = ['fusenshi', 'original-memo', 'ringmemo', 'fiber-cloth', 'uchiwa', 'box-tissue', 'clearfile', 'clip'];
// $portfolio_urls  = array(
// 	'fusenshi'   => array(
// 		'title' => 'ふせん紙王国 制作',
// 		'url'   => 'https://www.e-fusenshi.com',
// 	),
// 	'original-memo'       => array(
// 		'title' => 'メモ帳王国 制作',
// 		'url'   => 'https://www.original-memo.com',
// 	),
// 	'ringmemo'   => array(
// 		'title' => 'リングメモ王国 制作',
// 		'url'   => 'https://www.ringmemo.com',
// 	),
// 	'fiber-cloth' => array(
// 		'title' => 'ファイバークロス王国 制作',
// 		'url'   => 'https://www.fiber-cloth.com',
// 	),
// 	'uchiwa'     => array(
// 		'title' => 'うちわ王国 制作',
// 		'url'   => 'https://www.ee-uchiwa.com',
// 	),
// 	'box-tissue'  => array(
// 		'title' => 'ボックスティッシュ王国 制作',
// 		'url'   => 'https://www.box-tissue.com',
// 	),
// 	'clearfile'  => array(
// 		'title' => 'クリアファイル王国 制作',
// 		'url'   => 'https://www.e-clearfile.com',
// 	),
// 	'clip'       => array(
// 		'title' => 'クリップ王国 制作',
// 		'url'   => 'https://www.original-clip.com',
// 	),
// );
