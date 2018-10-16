<?php
require_once(dirname(__FILE__).'/database.php');
require_once(dirname(__FILE__).'/news_image.php');
/******************************************************************************
 * 商品管理クラス
 * Copyright(c) K.Sasaki All Rights Reserved.
 * @Author : K.Sasaki
 * @access : public
 *
 * エラー情報は、メンバ変数である$errorに格納
 *
 *****************************************************************************/
class news
{
	var $db = '';           //DB接続プロパティ
	var $Error = '';        //エラー

   /****************************************************************************
	* コンストラクタ
	*
	**/
	function news()
	{
		//DB接続インスタンスを作成
		$this->db = new Database;

		//ユーザのイメージインスタンスを作成
		$this->news_image = new news_image;

	}





   /****************************************************************************
	* 記事情報を戻す。
	*
	* 引数  ：$id
			: $class = 1 : 記事情報    2:記事カウント情報
	* 戻り値：$info
	*
	* $classのデフォルトは記事情報(=1)
	* 引数にIDがあれば、その情報を一次元配列で戻す。
	* 引数にIDがなければ、二次元配列でテーブルに有る全ての情報を戻す。
	*
	**/
	function get_data_from_news($id = '', $class=1)
	{
		if ($class == 1) {
			//クエリ作成
			$sql = 'SELECT * FROM '._NEWS_TBL_;
		} else
		if ($class == 2) {
			//クエリ作成
			$sql = 'SELECT count('._NEWS_ID_.') FROM '._NEWS_TBL_;
		}

		if (!empty($id)) {
			$sql .= ' WHERE '._NEWS_ID_.' = '.$id;
			$sql .= ' AND '._NEWS_PUBLIC_.' = 1';
		}

		//クエリ発行
		$result = $this->db->query($sql);

		//フェッチ
		if ( !empty($id) ) {
			//一次元配列
			$info = $this->db->fetch_array_assoc($result);
		} else {
			//二次元配列
			$info = $this->db->fetch_array_assoc_all($result);
		}

		if (!empty($info)) {
			//アイテムIDに紐づくイメージ情報を取得
			$info['image'] = $this->news_image->get_data1_from_news_image($id);
		} else {

		}

		return $this->change_value_news_data($info);
	}





   /****************************************************************************
	* 取得した注文情報一覧を任意のフォーマットに整形して戻す
	*
	* 引数  ：$post
	* 戻り値：$ret
	*
	* 二次元配列まで対応
	*
	**/
	function change_value_news_data($post)
	{
		if (empty($post) or !is_array($post)) {
			return FALSE;
		}

		foreach ($post as $k => $v)  {
			//二次元配列
			if ( is_array($v) ) {
				foreach ($v as $k2 => $v2) {
					if (empty($v)) {
						$ret[$k][$k2] = '';
					} else {
						$ret[$k][$k2] = $v2;
					}
				}
			//一次元配列
			} else {

				//公開別情報を整形
				if ($k == _NEWS_PUBLIC_) {
					switch($v){
						case 0:
							$ret[$k] = '非公開';
							break;
						case 1:
							$ret[$k] = '公開';
							break;
					}

				//日付情報を整形
				} else
				if ($k == _NEWS_DATE_) {
					list($date,$time) = explode(" ",$v);
					$ret[_NEWS_DATE_] = $date;
					$ret['time'] = $time;
				} else {
					if (empty($v)) {
						$ret[$k] = '';
					} else {
						$ret[$k] = $v;
					}
				}
			}
		}

		return $ret;
	}// end of func





   /****************************************************************************
	* @public
	* 最新ID番号を戻す。
	*
	* 引数  ：$id
	* 戻り値：$info
	*
	* 引数にIDがあれば、その情報を一次元配列で戻す。
	* 引数にIDがなければ、二次元配列でテーブルに有る全ての情報を戻す。
	*
	**/
	function get_title_from_news($limit = 5)
	{
		//クエリ作成
		$sql = 'SELECT '
				._NEWS_ID_.','
				._NEWS_DATE_.','
				._NEWS_TITLE_.''
				.' FROM '._NEWS_TBL_
				.' WHERE '._NEWS_PUBLIC_.' = 1'
				.' ORDER BY '._NEWS_DATE_.' DESC '
				.' LIMIT '.$limit;


		//クエリ発行
		$result = $this->db->query($sql);

		//ユーザ情報をフェッチ
		$info = $this->db->fetch_array_assoc_all($result);

		if (empty($info)) {
			return FALSE;
		} else {
			foreach ($info as $k => $v) {
				list($date,$time) = explode(" ",$info[$k][_NEWS_DATE_]);
				$info[$k][_NEWS_DATE_] = str_replace("-",".",$date);
			}
			return $info;
		}
	}




   /****************************************************************************
	* @public
	* 最新ID番号を戻す。
	*
	* 引数  ：$id
	* 戻り値：$info
	*
	* 引数にIDがあれば、その情報を一次元配列で戻す。
	* 引数にIDがなければ、二次元配列でテーブルに有る全ての情報を戻す。
	*
	**/
	function get_news_data($offset, $limit)
	{
		//クエリ作成
		$sql = 'SELECT '
				._NEWS_ID_.','
				._NEWS_DATE_.','
				._NEWS_TITLE_.''
				.' FROM '._NEWS_TBL_
				.' WHERE '._NEWS_PUBLIC_.' = 1'
				.' ORDER BY '._NEWS_DATE_.' DESC '
				.' LIMIT '.$limit
				.' OFFSET '.$offset;


		//クエリ発行
		$result = $this->db->query($sql);

		//ユーザ情報をフェッチ
		$info = $this->db->fetch_array_assoc_all($result);

		if (empty($info)) {
			return FALSE;
		} else {
			foreach ($info as $k => $v) {
				list($date,$time) = explode(" ",$info[$k][_NEWS_DATE_]);
				$info[$k][_NEWS_DATE_] = str_replace("-",".",$date);
			}
			return $info;
		}
	}

   /****************************************************************************
	* ページャー作成
	* 引数　：$now, $show_list, $pager_num
	* 終了値：$html
	* @Author : K.Watanabe
	*
	**/
	function set_pager($now, $show_list, $pager_num = 5) {
		//テーブル数を求める
		$sql = 'select count(*) as cnt from '._NEWS_TBL_;
		$res = mysql_query($sql);
		$row = mysql_fetch_assoc($res);

		//URL作成
		$url   = (empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"];
		$page  = $_SERVER['REQUEST_URI'];
		$parse = parse_url($page);

		//パラメータ削除
		if (array_key_exists ('query', $parse)) {
			$page = $parse['path'];
		}

		$url .= $page;

		$html         = '';
		$current_page = $now;                         //現在のページ
		$total_rec    = $row['cnt'];                  //総レコード数
		$page_rec     = $show_list;                   //１ページに表示するレコード
		$total_page   = ceil($total_rec / $page_rec); //総ページ数

		$show_nav     = $pager_num;  //表示するナビゲーションの数
		$path         = '?page=';    //パーマリンク

		//全てのページ数が表示するページ数より小さい場合、総ページを表示する数にする
		if ($total_page < $show_nav) {
			$show_nav = $total_page;
		}

		//トータルページ数が2以下か、現在のページが総ページより大きい場合表示しない
		if ($total_page <= 1 || $total_page < $current_page ) return;

		//総ページの半分
		$show_navh = floor($show_nav / 2);

		//現在のページをナビゲーションの中心にする
		$loop_start = $current_page - $show_navh;
		$loop_end = $current_page + $show_navh;

		//現在のページが両端だったら端にくるようにする
		if ($loop_start <= 0) {
			$loop_start  = 1;
			$loop_end = $show_nav;
		}

		if ($loop_end > $total_page) {
			$loop_start  = $total_page - $show_nav +1;
			$loop_end =  $total_page;
		}

		$html = '<div class="p-pager" data-aos="fade-up">';

		//前へ
		if ( $current_page > 1) {
			$html .= '<a href="'.$url. $path . ($current_page - 1).'" class="p-pager__arrow is-prev">前へ</a>';
		}

		$html .= '<ol class="p-pager__in">';

		for ($i = $loop_start; $i <= $loop_end; $i++) {
			if ($i > 0 && $total_page >= $i) {
				$html .= '<li class="p-pager__list">';

				if ($i == $current_page) {
					$html .= '<a href="'.$url.$path.$i.'" class="p-pager__anchor is-current">';
				} else {
					$html .= '<a href="'.$url.$path.$i.'" class="p-pager__anchor">';
				}

				$html .= $i.'</a></li>';
			}
		}

		$html .= '</ol>';


		//次へ
		if ( $current_page < $total_page) {
			$html .= '<a href="'.$url. $path . ($current_page + 1).'" class="p-pager__arrow is-next">次へ</a>';
		}

		$html .= '</div>';

		return $html;
	}

   /****************************************************************************
	* 1週間であればNEWアイコンを表示させる
	* 引数　：$date
	* 終了値：true or false
	* @Author : K.Watanabe
	*
	**/
	function set_new_icon($data) {
		$day   = str_replace('.', '/', $data);
		$today = date('Y/m/d');
		$flag  = true;

		$week_after = date("Y/m/d", strtotime("+1 week" , strtotime($day)));

		if ($week_after < $today) {
			$flag = false;
		}

		return $flag;
	}
}//end of class
