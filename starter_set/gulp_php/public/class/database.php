<?php
require_once(dirname(__FILE__).'/../config/config.php');#コンフィグファイル
/******************************************************************************
 * MySQLを使ったDatabaseアクセスクラス
 * K.Sasaki All Rights Reserved.
 * @Author : K.Sasaki
 * @access : public
 *
 * PHPによるMySQL接続クラス
 * 上記defineは必須設定項目
 * エラー情報は、メンバ変数である$errorに格納
 *
 *****************************************************************************/
class Database
{

    var $Connect = ''; //接続プロパティ
    var $Error   = ''; //エラーコメント
    var $Encode_type = '';

    /**
     * コンストラクタ
     * 接続できないときは、エラーメッセージを戻す
     *
     **/
    function Database()
    {
		//コンフィグファイルからDBの文字コードを指定する
        $this->Connect = mysql_connect( __DB_SERVER__,__DB_USER__,__DB_PASSWD__ );
        if( ! $this->Connect ) {
            $this->Error = __DB_SERVER__.' にアクセスできません: ' .mysql_error();
        }

        if( ! mysql_select_db( __DB_NAME__ ) ) {
            $this->Error = 'データベース ' .__DB_NAME__. " にアクセスできません: "
                           .mysql_error();
        }

		//文字コードを設定
		mysql_set_charset('utf8');
    }





    /**
     * DBから切断する。切断が成功したらTRUEを、そうでないときはFALSEを戻す。
     *
     *     引数  ：なし
     *     戻り値：TRUE or FALSE
     **/
    function close()
    {
        if ( mysql_close( $this->Connect ) ) {
            $this->Error = '切断できません';
            return TRUE;
        } else {
            return FALSE;
        }
    }





    /**
     * クエリを発行する。成功したら接続リソースを、失敗したらFALSEを戻す。
     *
     *     引数  ： $sql
     *     戻り値 : $ret or FALSE
     **/
    function query( $sql )
    {
        $ret = mysql_query( $sql,$this->Connect );

        if( !$ret ){
            $this->Error = "Invalid query : ".mysql_error();
            return FALSE;
        }

        return $ret;
    }





    /**
     * 連想配列でフェッチする
     *
     *     引数  ： $sql
     *     戻り値 : $ret
     **/
    function fetch_array_assoc( $result )
    {
        return mysql_fetch_assoc( $result );
    }





    /**
     * 連想配列ですべてフェッチする
     *
     *     引数  ： $sql
     *     戻り値 : $ret or FALSE
     **/
    function fetch_array_assoc_all( $result )
    {
        $ret = '';
        $n = 0;
        if ( empty( $result ) ) {
            $this->Error = "リソースが存在しません。";
            return FALSE;
        }

        while( $dat = mysql_fetch_assoc( $result ) ){
            $ret[$n] = $dat;
            ++$n;
        }
        return $ret;
    }





    /**
     * ナンバー配列でフェッチする
     *
     *     引数  ： $sql
     *     戻り値 : $ret
     **/
    function fetch_array_row( $result )
    {
        return mysql_fetch_row( $result );
    }






    /**
     * ナンバー配列ですべてフェッチする
     *
     *     引数  ： $sql
     *     戻り値 : $ret or FALSE
     **/
    function fetch_array_row_all ( $result )
    {
        $n = 0;
        if ( empty( $result ) ) {
            $this->Error = "リソースが存在しません。";
            return FALSE;
        }

        while( $dat = mysql_fetch_row( $result ) ){
            $ret[$n] = $dat;
            ++$n;
        }
        return $ret;
    }





    /**
     * レコードがあるかチェックする
     *
     *     引数  ： $sql
     *     戻り値 : TRUE or FALSE
     **/
    function check_record_exist($result)
    {
        $ret = $this->fetch_array_row_all($result);
        $hit_count = count($ret);
        if ( empty($hit_count) ) {
            return TRUE;
        } else {
            return FALSE;
        }
    }





    /**
     * トランザクション開始
     *
     *     引数  ： なし
     *     戻り値 : TRUE or FALSE
     **/
    function tran_begin(){
        $ret = $this->query('begin');
        if ( $ret ) {
            return TRUE;
        } else {
            $this->error = 'トランザクションの開始が失敗しました。';
            return FALSE;
        }
    }





    /**
     * ロールバック
     *
     *     引数  ： なし
     *     戻り値 : TRUE or FALSE
     **/
    function rollback(){
        $ret = $this->query('rollback');
        if ( $ret ) {
            return TRUE;
        } else {
            $this->Error = 'ロールバックできません';
            return FALSE;
        }
    }





    /**
     * コミット
     *
     *     引数  ： なし
     *     戻り値 : TRUE or FALSE
     **/
    function commit(){
        $ret = $this->query('commit');
        if( ! $ret ){
            $this->Error = 'コミットできません'.mysql_error();
            $this->rollback();
            return FALSE;
        }
        return $ret;
    }
}
?>
