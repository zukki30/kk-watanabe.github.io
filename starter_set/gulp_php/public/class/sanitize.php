<?php
require_once(dirname(__FILE__).'/../config/config.php');
require_once(dirname(__FILE__).'/../config/seo_config.php');
/******************************************************************************
 * サニタイズクラス
 * K.Sasaki All Rights Reserved.
 * @Author : K.Sasaki
 * @access : public
 *
 * このクラスでは、サニタイズ（XSS、SQLインジェクション）の関数を提供する
 * エラー情報は、メンバ変数である$Errorに格納
 *
 *****************************************************************************/
class sanitize
{
    var $Error;     //エラーコメント

    var $title;

    var $description;

    var $body_id;

    var $portfolio_urls;

    var $portfolio_sites;

	function __construct()
	{
		global $title;
		$this->title = $title;

		global $description;
		$this->description = $description;

		global $body_id;
		$this->body_id = $body_id;

		global $portfolio_urls;
		$this->portfolio_urls = $portfolio_urls;

		global $portfolio_sites;
		$this->portfolio_sites = $portfolio_sites;
	}

   /**
    *コンストラクタ
    **/
    function sanitize() {
    }


   /***************************************************************************
    * ポスト値操作
    * 関数群
    *     alter_post
    *     add_slashes
    *     strip_slashes
    ***************************************************************************/

   /****************************************************************************
    * Protected
    * XSS対策
    * 二次元配列まで対応。
    * 非配列も対応
    * 引数が空のときはFALSEを戻す
    * 引数：
    *      $post  	 --- $_POSTの値
    *      $class    --- 1 → エンテティ化
    *				 --- 2 → 逆エンテティ化
    * 終了値：
    *      $post     --- エンティティ化or逆エンテティ化した$_POSTの値
    **/
    function sanitize_entity_post($post,$class=1)
    {
		if ( empty($post) ) {
			return FALSE;
		}

		//配列
		if ( is_array($post) ) {
			foreach ( $post as $k1 => $v1 ) {
				//二次元配列の場合
				if (is_array($v1)) {
					foreach ($v1 as $k2 => $v2) {
						//三次元配列の場合
						if (is_array($v2)) {
							foreach ($v2 as $k3 => $v3) {
								if (!empty($v3)) {
									if ($class == 1) {
										$post[$k1][$k2][$k3] = htmlspecialchars($v3);
									} else
									if ($class == 2) {
										$post[$k1][$k2][$k3] = htmlspecialchars_decode($v3);
									}
								}
							}
						} else {
							//二次元配列の場合
							if (!empty($v2)) {
								if ($class == 1) {
									$post[$k1][$k2] = htmlspecialchars($v2);
								} else
								if ($class == 2) {
									$post[$k1][$k2] = htmlspecialchars_decode($v2);
								}
							}
						}
					}
				//一次元配列の場合
				} else {
					if (!empty($v1)) {
						if ($class == 1) {
							$post[$k1] = htmlspecialchars($v1);
						} else
						if ($class == 2) {
							$post[$k1] = htmlspecialchars_decode($v1);
						}
					}
				}
			}
		//非配列
		} else {
			if (!empty($post)) {
				if ($class == 1) {
					$post = htmlspecialchars($post);
				} else
				if ($class == 2) {
					$post = htmlspecialchars_decode($post);
				}
			}
		}
        return $post;
    }


   /****************************************************************************
    * Protected
    * SQLインジェクション対策
    * 二次元配列まで対応。
    * 非配列も対応
    * 引数が空のときはFALSEを戻す
    * 引数：
    *      $post     --- 未アドスラッシュ値
    *      $class    --- 1 → アドスラッシュ化
    *				 --- 2 → ストリップスラッシュ化
    * 終了値：
    *      $post     --- アドスラッシュorストリップスラッシュした値
    **/
    function sanitize_slashes_post($post,$class=1)
    {
		if ( empty($post) ) {
			return FALSE;
		}

		//配列
		if ( is_array($post) ) {
			foreach ( $post as $k1 => $v1 ) {

				if (is_array($v1)) {
					foreach ($v1 as $k2 => $v2) {
						//三次元配列の場合
						if (is_array($v2)) {
							foreach ($v2 as $k3 => $v3) {
								if (!empty($v3)) {
									if ($class == 1) {
										$post[$k1][$k2][$k3] = addslashes($v3);
									} else
									if ($class == 2) {
										$post[$k1][$k2][$k3] = stripslashes($v3);
									}
								}
							}
						//二次元配列の場合
						} else {
							if (!empty($v2)) {
								if ($class==1) {
									$post[$k1][$k2] = addslashes($v2);
								} else
								if ($class==2) {
									$post[$k1][$k2] = stripslashes($v2);
								}
							}
						}
					}
				//一次元配列の場合
				} else {
					if (!empty($v1)) {
						if ($class==1) {
							$post[$k1] = addslashes($v1);
						} else
						if ($class==2) {
							$post[$k1] = stripslashes($v1);
						}
					}
				}
			}
		//非配列
		} else {
			if ($class==1) {
				$post = addslashes($post);
			} else
			if ($class==2) {
				$post = stripslashes($post);
			}
		}
        return $post;
    }





   /****************************************************************************
    * Public
    * クローラ対策 Emailエンティティ化
    * 配列非対応
    * ランダムにエンティティ化する。
    * 引数が空のときはFALSEを戻す
    * 引数：
    *      $email     --- emailアドレス
    *
    * 終了値：
    *      $ret_email --- エンティティ化したemailアドレス
    **/
	function change_value_email_entity($email)
	{
		if (empty($email) or is_array($email)) {
			return FALSE;
		}

		//初期化
		$ret_email = "";

		$convmap = array(0x0, 0x2FFFF, 0, 0xFFFF);

		// メールアドレスの長さ
		$email_len = strlen($email);
		$email_arr = str_split($email);
		$rand_arr  = array_rand($email_arr);

		foreach ($email_arr as $k => $v) {
		// ランダムにHTMLエンティティする
			if( mt_rand(0,9) ) {
				$ret_email .= mb_encode_numericentity($v, $convmap);
			} else {
				$ret_email .= $v;
			}
		}
		return $ret_email;
	}


	/****************************************************************************
    * Public
    * ページのスクリプトを取得
    * URLを元に取得
    * @Author : K.Watanabe
    *
    * 返り値：$script(array)
    **/
	function get_script() {
		$script = '';

		//URLを取得
		$url   = $_SERVER['REQUEST_URI'];
		$parse = parse_url($url);

		//パラメータ削除
		if (array_key_exists ('query', $parse)) {
			$url = $parse['path'];
		}

		//取得したURLに.phpがあるか判定。無い場合'indexを追加'
		if(strpos($url,'.php') === false){
			$url .= 'index';
		}

		//取得したURLに.phpがあるか判定。ある場合.phpを削除
		if(strpos($url,'.php') !== false){
			$url = str_replace('.php', '', $url);
		}

		//$urlを配列化
		$url_list = explode('/', $url);

		//空要素を削除
		$url_list = array_filter($url_list, 'strlen');

		//keyを'0'からにする
		$script   = array_values($url_list);

		return $script;
	}

	/****************************************************************************
    * Public
    * titleを取得、作成
    * URLを元に取得
    * @Author : K.Watanabe
    *
    * 返り値：$script(array)
    **/
	function get_meta_title($article_title="") {
		$text = '';

		$ttl          = $this->title;
		$top_title    = $ttl['index'];
		$script       = $this->get_script();
		$count_script = count($script);

		//countが1の場合
		if ($count_script > 1) {
			list($category, $file_name) = $script;

			if (isset($article_title) && !empty($article_title)) {
				$ttl[$category][$file_name] = $article_title;
			}

			//第2階層がある場合
			if ($file_name === 'index') {
				$text = $ttl[$category][$file_name].'｜'.$top_title;
			} else {
				$text = $ttl[$category][$file_name].'｜'.$ttl[$category]['index'].'｜'.$top_title;
			}
		} elseif ($count_script === 1) {
			$text = $top_title;
		}

		return $text;
	}

	/****************************************************************************
    * Public
    * descriptionを取得、作成
    * URLを元に取得
    * @Author : K.Watanabe
    *
    * 返り値：$script(array)
    **/
	function get_meta_description() {
		$text = '';

		$script       = $this->get_script();
		$count_script = count($script);

		//countが1の場合
		if ($count_script > 1) {
			list($category, $file_name) = $script;

			$text = $this->description[$category][$file_name];
		} elseif ($count_script === 1) {
			$text = $this->description[$script[0]];
		}

		return $text;
	}

	/****************************************************************************
    * Public
    * body_idを取得、作成
    * URLを元に取得
    * @Author : K.Watanabe
    *
    * 返り値：$script(array)
    **/
	function get_meta_body_id() {
		$text = '';

		$script       = $this->get_script();
		$count_script = count($script);

		//countが1の場合
		if ($count_script > 1) {
			list($category, $file_name) = $script;

			$text = $this->body_id[$category][$file_name];
		} elseif ($count_script === 1) {
			$text = $this->body_id[$script[0]];
		}

		return $text;
	}

	/****************************************************************************
    * Public
    * パンくずを取得、作成
    * URLを元に取得
    * @Author : K.Watanabe
    *
    * 返り値：$html
    **/
	function get_page_path($article_title="") {
		$html = '';

		$url          = (empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"];
		$ttl          = $this->title;
		$script       = $this->get_script();
		$count_script = count($script);
		$pos_num      = 3;

		//countが1の場合
		if ($count_script > 1) {
			list($category, $file_name) = $script;

			if ($file_name === 'index') {
				$pos_num = 2;
			}

			$html = '<ol class="l-pagepath" itemscope="" itemtype="http://schema.org/BreadcrumbList" data-aos="fade-up">';
			$html .= '<li class="l-pagepath__list" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">';
			$html .= '<a href="'.$url.'/" itemprop="item" class="l-pagepath__anchor"><span itemprop="name" class="l-pagepath__txt">HOME</span></a>&gt;';
			$html .= '<meta itemprop="position" content="'.$pos_num.'"></li>';

			if ($file_name === 'index') {
				//第2階層
				$html .= '<li class="l-pagepath__list" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">';
				$html .= '<a href="'.$url.'/'.$category.'/" itemprop="item" class="l-pagepath__anchor is-noLink">';
				$html .= '<span itemprop="name" class="l-pagepath__txt">'.$ttl[$category][$file_name].'</span></a>';
				$html .= '<meta itemprop="position" content="1"></li>';
			} else {
				//第2階層
				$html .= '<li class="l-pagepath__list" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">';
				$html .= '<a href="'.$url.'/'.$category.'/" itemprop="item" class="l-pagepath__anchor">';
				$html .= '<span itemprop="name" class="l-pagepath__txt">'.$ttl[$category]['index'].'</span></a>&gt;';
				$html .= '<meta itemprop="position" content="2"></li>';

				//第3階層
				if (isset($article_title) && !empty($article_title)) {
					$ttl[$category][$file_name] = $article_title;
				}

				$html .= '<li class="l-pagepath__list" itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">';
				$html .= '<a href="'.$url.'/'.$category.'/'.$file_name.'.php" itemprop="item" class="l-pagepath__anchor is-noLink">';
				$html .= '<span itemprop="name" class="l-pagepath__txt">'.$ttl[$category][$file_name].'</span></a>';
				$html .= '<meta itemprop="position" content="1"></li>';
			}

			$html .= '</ol>';
		}

		echo $html;
	}

	/****************************************************************************
    * Public
    * headlineを作成
    * URLを元に取得
    * @Author : K.Watanabe
    *
    * 返り値：$html
    **/
	function get_headline() {
		$html = '';

		$ttl          = $this->title;
		$script       = $this->get_script();
		$ttl_tag      = 'h1';

		list($category, $file_name) = $script;

		if ($file_name !== 'index') {
			$ttl_tag = 'div';
		}

		$html = '<div class="c-headline01 is-'.$category.'"><div class="c-headline01__in">';
		$html .= '<'.$ttl_tag.' class="c-headline01__ttl"><div data-aos="fade-up">';
		$html .= '<span class="c-headline01__ttl--main is-roboto">'.strtoupper ($category).'</span>';
		$html .= '<span class="c-headline01__ttl--sub">'.$ttl[$category]['index'].'</span>';
		$html .= '</div></'.$ttl_tag.'></div></div>';

		echo $html;
	}

	/****************************************************************************
    * Public
    * pageNaviを作成
    * URLを元に取得
    * @Author : K.Watanabe
    *
    * 返り値：$html
    **/
	function get_pagenavi($category, $txt) {
		$html         = '';
		$ttl          = $this->title;
		$script       = $this->get_script();
		$id           = $this->get_meta_body_id();
		$count_script = count($script);
		$ttl_tag      = 'h2';
		$col_class    = '';
		$count_txt    = count($txt);

		//倍数ごとにclassを変更する
		if ($count_txt % 3 === 0) {
			$col_class = 'is-col3';
		} elseif($count_txt % 2 === 0) {
			$col_class = 'is-col2';
		}

		//下層ページであれば$cate, $file_nameを作成する
		if ($count_script > 1) {
			list($cate, $file_name) = $script;
		} else {
			$ttl_tag = 'h3';
		}

		//第3階層でああるとき
		if ($count_script !== 1 && $file_name !== 'index') {
			$html = '<aside class="c-pageNaviWarp">';
		}

		$html .= '<div class="c-pageNavi" data-aos="fade-up">';

		foreach ($txt as $key => $value) {
			$current = '';

			if (!empty($file_name) && $key === $file_name) {
				$current = ' is-current';
			}

			$html .= '<section class="c-pageNavi__list is-bg-'.$key.' '.$col_class.'">
						<a href="/'.$category.'/'.$key.'.php" class="c-pageNavi__anchor'.$current.'">
							<div class="c-pageNavi__in">
								<'.$ttl_tag.' class="c-pageNavi__ttl">'.$ttl[$category][$key].'</'.$ttl_tag.'>
								<p class="c-pageNavi__txt">'.$value.'</p>
							</div>
							<span class="c-pageNavi__line is-tb"></span><span class="c-pageNavi__line is-lr"></span>
						</a>
					</section>';
		}

		$html .= '</div>';

		//第3階層でああるとき
		if ($count_script !== 1 && $file_name !== 'index') {
			$html .= '</aside>';
		}

		echo $html;
	}

}//end of class
?>
