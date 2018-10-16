<?php
/******************************************************************************

 使用クラスを呼び出す

******************************************************************************/
//DBのクラス
require_once(dirname(__FILE__).'/database.php');







/******************************************************************************
 * 記事で使用するイメージ管理クラス
 * Copyright(c) K.Sasaki All Rights Reserved.
 * @Author : K.Sasaki
 * @access : public
 * 
 * エラー情報は、メンバ変数である$errorに格納
 * 
 *****************************************************************************/
class news_image
{
    var $db 		= '';           //DB接続プロパティ
    var $error 		= array();      //エラー


   /**
    * コンストラクタ
    * 
    **/
    function news_image()
    {
        //DB接続インスタンスを作成
        $this->db = new database;
    }





   /****************************************************************************
    * イメージ情報を戻す。
    * 
    * 引数  ：$id
    * 戻り値：$info
    * 
    * 引数にIDがあれば、その情報を一次元配列で戻す。
    * 引数にIDがなければ、二次元配列でテーブルに有る全ての情報を戻す。
    * 
    **/
    function get_data1_from_news_image($id = '', $img_no = '', $class=1)
    {

		if ($class == 1) {
			//クエリ作成
			$sql = 'SELECT * FROM '._NEWS_IMG_TBL_;
		} else
		if ($class == 2) {
			//クエリ作成
			$sql = 'SELECT count('._NEWS_ID_.') FROM '._NEWS_IMG_TBL_;
		}

		if (!empty($id)) {
			$sql .= ' WHERE '._NEWS_IMG_ID_.' = '.$id;
		}
		if (!empty($img_no)) {
			$sql .= ' and '._NEWS_IMG_IMG_ID_.' = '.$img_no;
		}

		if ($class == 1) {
			$sql .= ' ORDER BY '._NEWS_IMG_IMG_ID_.' ASC';
		}

		//クエリ発行
		$result = $this->db->query($sql);

		//フェッチ
        if ( $class == 2 ) {
			//一次元配列
            $info = $this->db->fetch_array_assoc($result);
			//ユーザ情報に紐づくイメージ情報を取得
        } else {
			//二次元配列
            $info = $this->db->fetch_array_assoc_all($result);
        }

		if (empty($info)) {
			return FALSE;
		}

		if  (is_array($info)) {
			foreach($info as $k1 => $v1) {
				$kk = $info[$k1][_NEWS_IMG_IMG_ID_];
				if  (is_array($v1)) {
					foreach ($v1 as $k2 => $v2) {
						$ret[$kk][$k2] = $info[$k1][$k2];
					}
				}
			}
		}

		return $ret;
    }





   /****************************************************************************
    * イメージ情報を戻す。
    * 
    * 引数  ：$id
    * 戻り値：$info
    * 
    * 引数にIDがあれば、その情報を一次元配列で戻す。
    * 引数にIDがなければ、二次元配列でテーブルに有る全ての情報を戻す。
    * 
    **/
    function get_data2_from_news_image($id = '',$news_id = '')
    {
		if (empty($id) && empty($news_id)) {
			return FALSE;
		}
		//クエリ作成
		$sql = 'SELECT * FROM '._NEWS_IMG_TBL_.' WHERE ';

		if (!empty($id) && !empty($news_id)) {
			$sql .= ' WHERE ';
		}

		if (!empty($id)) {
			if (is_array($id)) {

				foreach ($id as $k => $v) {
					$sql .= _NEWS_I_ID_.' = '.$v.' or ';
				}
				//最後のandを除去
				$sql = substr($sql,0,-4);

			} else {
				$sql .= _NEWS_I_ID_.' = '.$id;
			}

		}

		if (!empty($id) && !empty($news_id)) {
			$sql .= ' or ';
		}

		if (!empty($news_id)) {
			$sql .= _NEWS_IMG_ID_.' = '.$news_id;
		}

		//クエリ発行
		$result = $this->db->query($sql);

        $info = $this->db->fetch_array_assoc_all($result);

		if (empty($info)) {
			return FALSE;
		}

		return $info;
    }



}//end of class