<?php
require_once(dirname(__FILE__).'/../config/config.php');
require_once(dirname(__FILE__).'/../config/seo_config.php');
/*****************************************************************
Project Name    : gulp_php
File Name       : sanitize.php
Encoding        : UTF-8
Creation Date   : 2018-10-16

© 2018 K.watanabe

This source code or any portion thereof must not be
reproduced or used in any manner whatsoever
*****************************************************************/
class Units {
	var $meta_data;

	var $location;

	function __construct() {
		global $meta_data;
		$this->meta_data = $meta_data;

		$this->location = (empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
	}

	/**
	* ページのスクリプトを取得
	* URLを元に取得
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

	/**
	* titleを取得、作成
	* URLを元に取得
	*
	* 返り値：$script(array)
	**/
	function get_meta_title($article_title="") {
		$text = '';

		$meta         = $this->meta_data;
		$script       = $this->get_script();
		$count_script = count($script);
		$index_ttl    = $meta['index']['title'];

		//countが1の場合
		if ($count_script === 1) {
			$text = $index_ttl;
		} else {
			list($cate, $file) = $script;

			//第二回層
			if($file === 'index') {
				$text = $meta[$cate][$file]['title'].'｜'.$index_ttl;
			} else {
				//第三階層
				$text = $meta[$cate][$file]['title'].'｜'.$meta[$cate]['index']['title'].'｜'.$index_ttl;
			}
		}

		return $text;
	}

	/**
	* descriptionを取得、作成
	* URLを元に取得
	*
	* 返り値：$script(array)
	**/
	function get_meta_description() {
		$text = '';

		$meta         = $this->meta_data;
		$script       = $this->get_script();
		$count_script = count($script);

		//countが1の場合
		if ($count_script === 1) {
			$text = $meta[$script[0]]['description'];
		} else {
			list($cate, $file) = $script;

			$text = $meta[$cate][$file]['description'];
		}

		return $text;
	}

	/**
	* body_idを取得、作成
	* URLを元に取得
	*
	* 返り値：$script(array)
	**/
	function get_meta_body_id() {
		$id = '';

		$meta         = $this->meta_data;
		$script       = $this->get_script();
		$count_script = count($script);

		//countが1の場合
		if ($count_script === 1) {
			$id = $meta[$script[0]]['body_id'];
		} else {
			list($cate, $file) = $script;

			$id = $meta[$cate][$file]['body_id'];
		}
		return $id;
	}

	/****************************************************************************
	* パンくずを取得、作成
	* URLを元に取得
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
}//end of class
