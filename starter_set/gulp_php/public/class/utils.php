<?php
class utils {

	var $Error = '';#エラー
	var $Encoding = 'UTF-8';#エンコード

   /**
    * Protected
    * コンストラクタ
    **/
	function utils(){
	}





   /***************************************************************************
    * 配列操作
    * 関数群
    *     array_empty_marge
    *     array_delete_marge
    *
    ***************************************************************************/

   /**
    * Protected
    * 配列をマージする。
    * 引数：
    *      $array    --- 配列
    * 終了値：
    *      $array    --- 配列
    **/
    function array_empty_marge($array)
    {
        $array = array_merge(array_diff($array, array("")));
        return $array;
    }


   /**
    * Protected
    * 二次元配列まで、空の値をキーごと削除してくれる。
    * 引数：
    * $array    --- 配列(１次元、or ２次元)
    *  終了値：
    * $array
    * 引数が配列でなかったらFALSEを戻す。
    **/
    function array_delete_marge($array)
    {
        if (!is_array($array) ) {
            //配列でない
            return FALSE;
        } else {
            //配列の場合
            $array = $this->array_empty_marge($array);
            if ($array == array()){
                return FALSE;
            }

            foreach ( $array as $k1 => $v1 ) {
                if ( is_array($array[$k1]) ) {
                    //二次元配列だったら
                    foreach( $array[$k1] as $k2 => $v2 ) {
                        if ( empty($v2) ) {
                            $array[$k1] = $this->array_empty_marge($array[$k1]);
                        }
                    }
                }
                if ( $array[$k1] == array() ) {
                    $array[$k1] = '';
                }
            }
            $array = $this->array_empty_marge($array);
            if ( $array == array() ) {
                $array = '';
            }
            return $array;
        }
    }


   /***************************************************************************
    * エンコーディング
    * 関数群
    *     alter_encode
    *
    **************************************************************************/


   /**
    * Protected
    * 二次元配列までをのエンコードを整えてくれる
    * 引数：
    * $array    --- 配列(１次元、or ２次元)
    *  終了値：
    * $array
    * 引数が配列でなかったらFALSEを戻す。
    **/
    function alter_encode($value)
    {
        $set_encode = $this->Encoding;
        //セットしたエンコードと異なるときに処理開始
        //１次元配列時
        if ( is_array( $value ) ) {
            foreach( $value as $k1 => $v1 ){
                //2次元配列時
                if ( is_array($v1) ) {
                    foreach( $value[$k1] as $k2 => $v2 ) {
                        //エンコードを検出
                        $encoded = mb_detect_encoding($v2);

                        //判定
                        if ( $encoded !== $set_encode ) {
                            $new_value[$k1][$k2] = mb_convert_encoding( $v2, $this->Encoding, "AUTO" );
                        }
                    }
                //１次元配列時の処理
                } else {
                    //エンコードを検出
                    $encoded = mb_detect_encoding($v1);
                    //判定
                    if ( $encoded !== $set_encode ) {
                        $new_value[$k1] = mb_convert_encoding( $v1, $this->Encoding, "AUTO" );
                    }
                }
            }
        //1次元配列でない時の処理
        } else {
            //エンコードを検出
            $encoded = mb_detect_encoding($value);
            //判定
            if ( $encoded !== $set_encode ) {
                $new_value = mb_convert_encoding( $value, $this->Encoding, "AUTO" );
            }
        }

        return $value;
    }


   /***************************************************************************
    * DNS関係チェック
    * 関数群
    *     chk_email
    *     domainCheck
    *     
    **************************************************************************/


   /**
    * Protected
    * メール正当性チェック
    * 引数：
    *     $email:入力値
    * 戻値：
    * true:OK | false:NG
    **/
    function chk_email($email){
        if ( !ereg("^[^@]+@[^.]+\..+", $email )) { // メールアドレスのチェック
            return FALSE;
        }elseif(!$this->domainCheck($email)){
                return FALSE;
        }
        return TRUE;
    }


   /**
    * Protected
    * ドメインチェック
    * 引数：
    *     $value:入力値
    * 戻値：
    * true:OK | false:NG
    **/
    function domainCheck($value) {
        //スペースの場合はそのままリターン
        if (!strlen($value)) {
            return FALSE;
        }
        //全角文字→半角文字
        $value = mb_convert_kana($value, "askh");

        //ドメイン名の取得
        $pos = strpos($value, "@");
        $domain = substr($value, $pos+1);
        //MXレコードチェック
        if (checkdnsrr($domain, "MX")) {
            return TRUE;
        }
        //Aレコードチェック
        if (checkdnsrr($domain, "A")) {
            return TRUE;
        }
        //ホストの別名チェック
        if (checkdnsrr($domain, "CNAME")) {
            return TRUE;
        }
        return FALSE;
    }//end of func


   /***************************************************************************
    * 日付操作関数
    * 関数群
    *     create_select_month_tag
    *     create_select_day_tag
    *     create_select_year
    **************************************************************************/

   /**
    * 年のタグを戻す。
    * 現在の年からプラスマイナス１年
    * 現在の年を取得し、selectedを埋める
    * 引数：
    *    なし
    * 戻値：
    *    $tag
    * 
    **/
    function create_select_year_tag( $now_year = '' )
    {
        $tag="";
        if ( empty($now_year) ) {
            $now_year = date("Y");
        }
        $start_year = $now_year -1;
        $end_year   = $now_year +1;
        //12ヶ月を配列で作成
        for ($a=$start_year;$a<=$end_year;++$a) {
            $y[] = $a;
        }

        $tag .= "<select name=\"year\">\n";
        //タグを作成する。
        foreach ( $y as $k => $v ) {
            $tag .= "      <option value=\"".$v."\" ";
            if ( $v == $now_year ) {
                $tag .= "selected";
            }
            $tag .= ">".$v."</option>\n";
        }
        $tag .= "    </select>\n";
        return $tag;
    }


   /**
    * 月のタグを戻す。
    * 12ヶ月固定
    * 現在の月を取得し、selectedを埋める
    * 引数：
    *    $now_month
    * 戻値：
    *    $tag
    * 
    **/
    function create_select_month_tag($now_month = '')
    {
        $tag="";
        if ( empty($now_month) ) {
            $now_month = date("m");
            $now_month = sprintf("%02d", $now_month);
        }
        //12ヶ月を配列で作成
        for ($a=1;$a<=12;++$a) {
            $a = trim(sprintf("%02d", $a));
            $m[] = $a;
        }

        $tag .= "<select name=\"month\">\n";
        //タグを作成する。
        foreach ( $m as $k => $v ) {
            $tag .= "      <option value=\"".$v."\" ";
            if ( $v == $now_month ) {
                $tag .= "selected";
            }
            $tag .= ">".$v."</option>\n";
        }
        $tag .= "    </select>\n";

        return $tag;
    }


   /**
    * 日数のタグを戻す。
    * 引数に当てられた月により可変的に戻す。
    * 引数：
    *    なし
    * 戻値：
    *    $tag
    **/
    function create_select_day_tag($year = '', $month = '',$day = '' )
    {
        $today = date("Y/m/d");
        $today = explode("/",$today);
        if ( empty($year) ) {
            $year = $today[0];
        } 
        if ( empty($month) ) {
            $month = $today[1];
        }
        if ( empty($day) ) {
            $day = $today[2];
        }

        //引数の年、月の桁数を整形
        $year  = sprintf("%04d", $year);
        $month = sprintf("%02d", $month);
        $day   = sprintf("%02d", $day);

        $tag = '';

        //その月の最後の日付を取得する。
        $last_day = date("t", mktime(0, 0, 0, $month, 1, $year));
        $tag .= "<select name=\"day\">\n";
        for ( $d=1; $d<=$last_day; ++$d ) {
            $d   = sprintf("%02d", $d);
            $tag .= "      <option value=\"".$d."\" ";
            if ( $d == $day ) {
                $tag .= "selected";
            }
            $tag .= ">".$d."</option>\n";
        }
        $tag .= "</select>\n";

        return $tag;
    }


   /**
    * 日付をdata型に変換する
    * 引数 : $day
    * 		形式は、YYYY/mm/dd でスラッシュ区切りとなっている想定
    * 終了値：$ret
    * 
    *
    **/
    function alter_date_for_db( $day )
    {
        $now_date = explode('/', $day);
        $year  = $now_date[0];
        $month = $now_date[1];
        if ( ! empty($now_date[2]) ) {
            $day = $now_date[2];
        } else {
            $day = '00';
        }
        
        return $year."-".$month."-".$day;
    }


   /**
    * data型日付をスラッシュ区切りに変換する
    * 引数 : $day
    * 		形式は、YYYY/mm/dd でスラッシュ区切りとなっている想定
    * 終了値：$ret
    * 
    *
    **/
    function alter_date_from_db( $date ) 
    {
        $now = explode( '-', $date );
        if ( $now[2] == '00' or empty($now[2]) ) {
            $ret = $now[0]."/".$now[1];
        } else {
            $ret = $now[0]."/".$now[1]."/".$now[2];
        }
        if ( empty($now[0]) ) $ret = '';
        return $ret;
    }


   /***************************************************************************
    * 改行操作関数
    * 関数群
    *     create_select_month_tag
    *     create_select_day_tag
    *     create_select_year
    **************************************************************************/

   /**
    * ブレークタグを改行コードに変換する
    * <br />　→ \n
    * 引数：
    *    なし
    * 戻値：
    *    $value
    **/
    function alter_to_break_code($value)
    {
        $value = str_replace( "\r\n", "<br/>\n", $value );
        return $value;
    }


   /**
    * ブレークタグを改行コードに変換する
    * \n　→ <br />
    * 引数：
    *    なし
    * 戻値：
    *    $value
    **/
    function alter_to_break_tag($value)
    {
        $value = nl2br($value);
        return $value;
    }


   /***************************************************************************
    * 地域操作関数
    * 関数群
    *     create_select_tihou_tag
    *     create_select_pref_tag
    **************************************************************************/

   /**
    * 地域情報のタグを戻す。
    * 引数：
    *    なし
    * 戻値：
    *    $tag
    * 
    **/
    function create_select_tihou_tag( $now_tihou = '' )
    {
        $tihou_def = array(
                             '0'=>'地方を選ぶ',
                             '1'=>'北海道・東北',
                             '2'=>'関東',
                             '3'=>'北陸・甲信越',
                             '4'=>'東海',
                             '5'=>'近畿',
                             '6'=>'中国',
                             '7'=>'九州・沖縄'
                            );

        $tag="";

        $tag .= "<select name=\"tihou\">\n";
        //タグを作成する。
        foreach ( $tihou_def as $k => $v ) {
            $tag .= "      <option value=\"".$v."\" ";
            if ( $v == $now_tihou ) {
                $tag .= "selected";
            }
            $tag .= ">".$v."</option>\n";
        }
        $tag .= "    </select>\n";
        return $tag;
    }

   /**
    * 県情報のタグを戻す。
    * 引数：
    *    なし
    * 戻値：
    *    $tag
    * 
    **/
    function create_select_pref_tag( $now_pref = '' )
    {
        $pref_def = array(
                             '0'=>'都道府県を選ぶ',
                             '1'=>'北海道',
                             '2'=>'青森県',
                             '3'=>'岩手県',
                             '4'=>'宮城県',
                             '5'=>'秋田県',
                             '6'=>'山形県',
                             '7'=>'福島県',
                             '8'=>'茨城県',
                             '9'=>'栃木県',
                             '10'=>'群馬県',
                             '11'=>'埼玉県',
                             '12'=>'千葉県',
                             '13'=>'東京都',
                             '14'=>'神奈川県',
                             '15'=>'新潟県',
                             '16'=>'富山県',
                             '17'=>'石川県',
                             '18'=>'福井県',
                             '19'=>'山梨県',
                             '20'=>'長野県',
                             '21'=>'岐阜県',
                             '22'=>'静岡県',
                             '23'=>'愛知県',
                             '24'=>'三重県',
                             '25'=>'滋賀県',
                             '26'=>'京都府',
                             '27'=>'大阪府',
                             '28'=>'兵庫県',
                             '29'=>'奈良県',
                             '30'=>'和歌山県',
                             '31'=>'鳥取県',
                             '32'=>'島根県',
                             '33'=>'岡山県',
                             '34'=>'広島県',
                             '35'=>'山口県',
                             '36'=>'徳島県',
                             '37'=>'香川県',
                             '38'=>'愛媛県',
                             '39'=>'高知県',
                             '40'=>'福岡県',
                             '41'=>'佐賀県',
                             '42'=>'長崎県',
                             '43'=>'熊本県',
                             '44'=>'大分県',
                             '45'=>'宮崎県',
                             '46'=>'鹿児島県',
                             '47'=>'沖縄県'
                            );

        $tag="";

        $tag .= "<select name=\"pref\">\n";
        //タグを作成する。
        foreach ( $pref_def as $k => $v ) {
            $tag .= "      <option value=\"".$v."\" ";
            if ( $v == $now_pref ) {
                $tag .= "selected";
            }
            $tag .= ">".$v."</option>\n";
        }
        $tag .= "    </select>\n";
        return $tag;
    }





   /***************************************************************************
    * 共通文字列操作関数群
    * 関数群
    *     disp_public
    **************************************************************************/

   /**
    * 公開、非公開の日本語を戻す
    * 引数で指定された変数の値がTRUEなら公開
    * 引数で指定された変数の値がFALSEなら非公開
    * 
    * 引数：
    *    $public
    * 戻値：
    *    $ret,FALSE
    * 
    **/
    function disp_public($public) 
    {
		$public = (int)$public;

		if (!is_int($public)) {
			return FALSE;
		}

		if ($public) {
			$ret = '公開';
		} else {
			$ret = '非公開';
		}
        return $ret;
    }





   /***************************************************************************
    * ページを判別する
    * 関数群
    *     disp_public
    **************************************************************************/

   /**
    * ディレクトリ情報を読み取り、それに見合うheaderのimageネームを戻す。
    * 
    * 引数：
    *    なし
    * 戻値：
    *    $image_name,FALSE
    * 
    **/
    function get_header_image_name() 
    {
		$navi = array();

		//グローバルナビのデフォルトのファイル名を定義
		$navi['gnav_top'] = 'gnav_top';
		$navi['gnav_service'] = 'gnav_service';
		$navi['gnav_knowledge'] = 'gnav_knowledge';
		$navi['gnav_company'] = 'gnav_company';
		$navi['gnav_news'] = 'gnav_news';
		$navi['gnav_contact'] = 'gnav_contact';

		//ファイル名
		$file_name = basename($_SERVER['PHP_SELF']);

		//ヘッダーのイメージを定義する
		switch ($file_name) {
			case 'index.php';
			$navi['gnav_top'] 		= "gnav_top2";
			break;

			case 'business.php';
			$navi['gnav_service'] 	= "gnav_service2";
			break;

			case 'recruit.php';
			$navi['gnav_knowledge'] = "gnav_knowledge2";
			break;

			case 'company.php';
			$navi['gnav_company'] 	= "gnav_company2";
			break;

			case 'news.php';
			$navi['gnav_news'] 		= "gnav_news2";
			break;

			case 'inquiry.php';
			$navi['gnav_contact'] 	= "gnav_contact2";
			break;

			default:
			break;
		}

		foreach ($navi as $k => $v) {
			$navi[$k] = $v.'.gif';
		}

		return $navi;

    }//end of func





   /**
    * ディレクトリ情報を読み取り、それに見合うheaderのimageネームを戻す。
    * 
    * 引数：
    *    なし
    * 戻値：
    *    $image_name,FALSE
    * 
    **/
    function make_value_date_jp($date) 
    {
		if (empty($date)) {
			return FALSE;
		} else {
			list($y,$m,$d) = explode( "-", $date );
		}

		$ret = $y.'年'.$m.'月'.$d.'日';

		return $ret;

    }//end of func







}//end of class