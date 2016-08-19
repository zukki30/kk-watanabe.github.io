$(function(){
	var mail_form = $('#mail_form'),
		target = mail_form.find('[data-stage="true"]'),
		target_len = target.length;

	//生成
	var generation = function(){
		var warp_elm = '<div id="stage_wrap"><div id="stage_wrap_inner"></div></div>',
			btn_elm = [
				'<li class="btn_list"><a href="" class="btn_type is_not_input">未入力項目があります</a></li>\n',
				'<li class="btn_list"><a href="" class="btn_type is_return">戻る</a></li>\n',
				'<li class="btn_list"><button type="submit" name="__send__" class="btn_type is_send">送信する</button></li>\n'
			];

		//囲う
		mail_form.append(warp_elm);
		$('#stage_wrap_inner').append(target);

		//各パーツ作成
		var pager = '<ul id="stage_pager">\n',
			submit = '<ul class="submit_group">\n',

			submits;

		for (var i = 0; target_len > i; i++) {
			var num = i + 1,
				target_num = target.eq(i);

			if (num === 1) {
				//初め
				submit += btn_elm[0];
			} else if(num === target_len) {
				//最後
				submit += btn_elm[1];
				submit += btn_elm[2]
			} else {
				submit += btn_elm[1];
				submit += btn_elm[0]
			}

			//リスト設定
			pager += '<li class="stage_pager_list">'+num+'</li>\n';

			//閉じタグ設定
			submit += '</ul>';

			//data_stageにカスタム属性追加
			target_num.attr('data-stage-num', num).append(submit);

			//リセット
			submit = '<ul class="submit_group">\n';
		}

		$('#stage_wrap').prepend(pager);
	};

	//初期設定
	var init = function(){
		generation();

		//変数
		var wrap = $('#stage_wrap'),
			wrap_inner = $('#stage_wrap_inner'),

			pager = $('#stage_pager'),
			pager_li = pager.find('li');

		//active設定
		target.first().addClass('active_stage');
		pager_li.first().addClass('active_list');

		//input, select, textareにclass指定
		target.find('input, select, textearea').addClass('is_check_input')

		//横幅指定
		function set_width(w) {
			//サイズ取得
			var target_all_w = w * target_len;

			wrap_inner.width(target_all_w);
			target.width(w);
		};

		$(window).on('load resize', function() {
			var wrap_w = wrap.width();

			set_width(wrap_w);
		}).trigger('resize');
	}();
});