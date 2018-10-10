//共通変数
$(function(){
    const html = $('html');

    //デバイス取得
    let get_device = function(){
        const ua = navigator.userAgent;

        if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
            return 'sp';
        }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
            return 'tab';
        }else{
            return 'other';
        }
    };

    if (get_device() === 'other') {
        html.addClass('pc_device');
    }

    //ページTOPボタン
    (function(){
        $('a[href^="#"]').not('[target="_blank"]').on('click', function() {
            const
                speed    = 750,
                href     = $(this).attr('href'),
                target   = $(href == '#' || href == '' ? 'html' : href),
                position = target.offset().top;

            $('html, body').animate({scrollTop: position}, speed, 'swing');
            return false;
        });
    })();
});
