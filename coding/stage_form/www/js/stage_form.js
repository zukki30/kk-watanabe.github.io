$(function(){
	var mail_form = $('#mail_form'),
		target = mail_form.find('[data-stage="true"]'),
		target_len = target.length,
		target_input = target.find('[data-required="true"]');

	//カスタム属性関数
	var data_option = function(decision) {
		var option = {
			'data-decision-comp': decision
		};

		return option;
	}

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
		target_input.attr(data_option(false));

		//各パーツ作成
		var pager = '<ul id="stage_pager">\n',
			submit = '<ul class="submit_group">\n';

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

			//閉じタグ
			submit += '</ul>';

			//data_stageにカスタム属性追加,ボタンの追加
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

	//全て入力されているか判定
	var required_comp = function(elm){
		var confirm = true;

		elm.each(function(index, el) {
			var _self = $(el),
				required = _self.attr('data-decision-comp');

			console.log(required)

			if (required === 'false') {
				confirm = false;
				return false;
			}
		});

		if (confirm === true) {
			$('.active_stage').find('.is_not_input').removeClass('is_not_input').addClass('is_next').html('次へ');
		} else {
			$('.active_stage').find('.is_next').removeClass('is_next').addClass('is_not_input').html('未入力項目があります');
		}
	};

	//判定関数
	var decision = function(el){
		var type = el.attr('type'),
			name = el.attr('name'),
			val = el.val()

		if (type === 'radio' || type === "checkbox") {
			if (el.prop('checked')) {
				$('input[name="'+name+'"]').attr(data_option(true));
			}
		} else {
			if (val.length > 0) {
				el.attr(data_option(true));
			}
		}
	};

	//最初の呼び込み
	var first_load = function(){
		target_input.each(function(index, el) {
			var _self = $(el);

			decision(_self);
		});
	}();

	//入力アクション
	// var

	//ボタンアクション
	var btn_action = function(){
		var btn = $('.btn_type');

		btn.on('click', function(event) {
			var _self = $(this);

			if (_self.hasClass('is_not_input')) {
				//未入力の場合
				console.log('tset')
				return false;
			}
		});
	}();
});