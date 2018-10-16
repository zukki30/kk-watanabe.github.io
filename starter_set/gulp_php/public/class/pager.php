<?php
require_once(dirname(__FILE__).'/database.php');
/******************************************************************************
 * ページャー管理クラス
 * Copyright(c) K.Sasaki All Rights Reserved.
 * @Author : K.Sasaki
 * @access : public
 *
 * ページャーを作成し、該当の記事をDBから取得する
 * セッション管理は考慮しない
 *
 *****************************************************************************/

class pager
{
    var $db;                    //DBインスタンス
    var $Error;                 //エラーメッセージ
    var $path;                  //ページャーのリンク先アドレス
    var $pager_limit;           //ページャーの表示数
    var $article_limit;         //表示記事数
    var $article_total;         //記事数トータル件数（DB）
    var $article;               //オフセットされた表示用記事
    var $op;                    //オプションゲットパラメータ
    var $pager_tag;             //作成されたHTMLタグ（出力用）

   /*****************************************************************************
    * コンストラクタ
    *
    * 引数
    *     $path          -- ページャーリンク先アドレス
    *     $pager_limit   -- ページャーが表示する数字の数(1 2 3 4 5 ...)
    *     $article_limit -- 記事表示数
    *     $article_total -- DBに格納されている記事の件数
    *
    **/
    function pager( $path = "", $pager_limit = 10,
                                 $article_limit = 4 , $op = '')
    {
        $this->db            = new database;

        $this->path          = $path;
        $this->pager_limit   = $pager_limit;
        $this->article_limit = $article_limit;
        $this->op            = $op;

    }


   /****************************************************************************
    * 任意の記事のトータル件数をデータベースから取得する
    * 引数　：$sql(　count(*)　を指定すること　)
    * 終了値：FALSE or $total_count
    *
    **/
    function get_total_count($sql)
    {
        if ( empty($sql) ) {
            $this->Error = 'SQLがありません。';
            return FALSE;
        }

        //クエリ送信
        $result = $this->db->query($sql);

        //フェッチする
        $total_count = count($this->db->fetch_array_row_all($result));

        if ( empty($total_count) ) {
            $this->Error = 'カウントできる記事がありません。';
            return FALSE;
        }
        return $total_count;
    }


   /****************************************************************************
    * ページャーを作成し、htmlで戻す
    * 引数　：$page ( デフォルト: 1 )
    * 　　　：$sql  OFFSET追加用のSQL（呼び出し記事用）
    * 終了値：FALSE or TRUE
    *
    **/
    function create_pager( $page = 1, $sql )
    {
        //セッティングエリア---------------------------------------------------

        //ページャーとして表示する数(1 2 3 4 5 ...)
        $info['pager'] = $this->pager_limit;

        //1ページ当たりの記事の表示数
        $info['limit'] = $this->article_limit;

        //データベースに格納されている記事のトータル件数を取得する。
        $info['total'] = $this->get_total_count($sql);
        //セッティングエリアここまで-------------------------------------------

        //記事取得-------------------------------------------------------------
        //SQL用のLIMITとOFFSETを求める
        $offset_i = $page - 1;

        $info['db_limit']  = $info['limit'];
        $info['db_offset'] = $info['limit'] * ($offset_i);

        //SQL作成
        $qry = $sql." limit " .$info['db_limit']
                   ." offset ".$info['db_offset'];


        //クエリ発行
        $result = $this->db->query($qry);

        //フェッチしてメンバ変数に登録
        $this->article = $this->db->fetch_array_assoc_all($result);
        //記事取得ここまで-----------------------------------------------------




        //登録記事数が表示記事数を上回るとき、フラグを立てる
        if ( $info['total']  >  $info['limit'] * $info['pager'] ) {
            $info['next'] = '1';
            //[次へ]のページをあらかじめ算出しておく
            $multi = ceil( $page / $info['pager'] );
            $next = ( $info['pager'] * $multi ) + 1;
        }

        //前のページをあらかじめ算出しておく
            $multi = ceil( $page / $info['pager'] );
            $prev = ( $info['pager'] * ($multi-1) ) ;



        //■ページャー表示計算式-------------------------------------------------
        if ($page > $info['pager']) {
            $start = ( ceil( $page / $info['pager'] ) -1 ) * $info['pager'] + 1;
            $end   = $start + $info['pager'] -1;
            //「前のページ」のフラグをあげる
            $info['prev'] = 1;

            if ( $end >= ceil( $info['total'] / $info['limit'] ) ) {
                $end = ceil( $info['total'] / $info['limit'] ) ;
                //フラグを下げる
                $info['next'] = 0;
            }
        } else {
            $start = 1;

            //登録記事数より設定して有るぺージャーの表示Noが上回るとき

            $end = ceil($info['total'] / $info['limit']);

            if ( !empty($info['total']) && !empty($info['limit']) ) {

                //登録記事数より設定して有るぺージャーの表示Noが下回るとき
                if ( $info['pager'] > $end ) {
                    $end = ceil($info['total'] / $info['limit']);
                } else
                if ( $info['pager'] < $end ) {
                    $end = $info['pager'];
                }
            }
            $info['prev'] = 0;
        }
        //ページャーが１ページのみだったら、タグを作成しないでそのまま戻す
        if ( $end == 1 ) {
            return TRUE;
        }


        //表示部作成--------------------------------
        $ret = '';

        echo '<pre style="font-size:13px;">'; var_dump($info); echo '</pre>';
        if( $info['prev'] == '1' ){
            $ret .= "<span id='a_num'><a href = \"".$this->path."?page=".$prev.$this->op."\">[前へ]</a></span>\n";
        } else {
            $ret .= "";
        }
        for ( $num = $start; $num<= $end ; $num++ ) {
            if ( $page == $num ) {
                $ret .="<span id='num'>".$num.'</span>';
            } else {
                $ret .="<span id='num'><a href = \"".$this->path."?page=".$num.$this->op."\">".$num."</a></span>\n";
            }
        }

        if( $info['next'] == '1' ){
            $ret .="<span id='a_num'><a href = \"".$this->path."?page=".$next.$this->op."\">[次へ]</a></span>\n";
        }

        $this->pager_tag = $ret;

        return TRUE;
    }//end of func
}//userクラス　ここまで

