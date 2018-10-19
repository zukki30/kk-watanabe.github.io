//関数
const
  getDevice = function() {
    const ua = navigator.userAgent;

    if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
      return 'sp';
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
      return 'tab';
    }else{
      return 'other';
    }
  },
  ankerClickPageMove = function(H) {
    const
      interval = 10,                //スクロール処理を繰り返す間隔
      divisor  = 8,                 //近づく割合（数値が大きいほどゆっくり近く）
      range    = (divisor / 2) + 1, //どこまで近づけば処理を終了するか(無限ループにならないように divisor から算出)
      links    = document.querySelectorAll('a[href^="#"]:not([target="_blank"])');

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) {
        e.preventDefault();

        let
          toY,
          nowY = window.pageYOffset; //現在のスクロール値

        const
          href       = e.target.getAttribute('href'),  //href取得
          target     = document.querySelector(href),   //リンク先の要素（ターゲット）取得
          targetRect = target.getBoundingClientRect(), //ターゲットの座標取得
          targetY    = targetRect.top + nowY - H,      //現在のスクロール値 & ヘッダーの高さを踏まえた座標
          clientH    = document.body.clientHeight;     //高さ取得

        //スクロール終了まで繰り返す処理
        (function doScroll() {
          //次に移動する場所（近く割合は除数による。）
          toY = nowY + Math.round((targetY - nowY) / divisor);

          //スクロールさせる
          window.scrollTo(0, toY);

          //nowY更新
          nowY = toY;

          if (clientH - window.innerHeight < toY) {
            //最下部にスクロールしても対象まで届かない場合は下限までスクロールして強制終了
            window.scrollTo(0, clientH);
            return;
          }

          if (toY >= targetY + range || toY <= targetY - range) {
            //+-rangeの範囲内へ近くまで繰り返す
            window.setTimeout(doScroll, interval);
          } else {
            //+-range の範囲内にくれば正確な値へ移動して終了。
            window.scrollTo(0, targetY);
          }
        })();
      });
    }
  };

$(function(){
  //共通変数
  const html = document.querySelectorAll('html')[0];

  //デバイスを判定しclass付与
  if (getDevice() === 'other') {
    html.classList.add('is-noTouchDevice');
  } else {
    html.classList.add('is-touchDevice');
  }

  //ページTOPボタン
  (function(){
    const head = 0;
    ankerClickPageMove(head);
  })();
});
