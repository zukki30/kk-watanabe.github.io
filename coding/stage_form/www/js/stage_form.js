(function($) {
	$.fn.stage_form = function(){

		const
		 _this        = $(this),
		 target       = _this.find('[data-stage="true"]'),
		 target_len   = target.length,
		 target_input = target.find('[data-required="true"]');

		//カスタム属性関数
		const data_option = function(decision) {
			const option = {
				'data-decision-comp': decision
			};

			return option;
		}

		//生成
		const generation = function(){
			const
			 warp_elm = '<div id="stage_wrap"><div id="stage_wrap_inner"></div></div>',
			 btn_elm  = [
				'<li class="submit_group_list"><button type="button" class="btn_type is_not_input">未入力項目があります</button></li>\n',
				'<li class="submit_group_list"><button type="button" class="btn_type is_return">戻る</button></li>\n',
				'<li class="submit_group_list"><button type="submit" name="__send__" class="btn_type is_send">送信する</button></li>\n'
			 ];

			//囲う
			_this.append(warp_elm);
			$('#stage_wrap_inner').append(target);
			target_input.attr(data_option(false));

			//各パーツ作成
			let pager  = '<ul class="stage_pager">\n',
				submit = '<ul class="submit_group">\n';

			for (let i = 0; target_len > i; i++) {
				let num        = i + 1,
					prev       = i - 1,
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
				target_num.attr({
					'data-stage-next': num,
					'data-stage-prev': prev
				}).append(submit);

				//リセット
				submit = '<ul class="submit_group">\n';
			}

			$('#stage_wrap').prepend(pager);
		};

		//初期設定
		const init = function(){
			generation();

			//変数
			const
			 wrap       = $('#stage_wrap'),
			 wrap_inner = $('#stage_wrap_inner'),

			 pager      = $('.stage_pager'),
			 pager_li   = pager.find('li');

			//active設定
			target.first().addClass('active_stage');
			pager_li.first().addClass('active_list');

			//input, select, textareにclass指定
			target.find('input, select, textearea').addClass('is_check_input')

			//横幅指定
			function set_width(w) {
				//サイズ取得
				const target_all_w = w * target_len;

				wrap_inner.width(target_all_w);
				target.width(w);
			};

			$(window).on('load resize', function() {
				const wrap_w = wrap.width();

				set_width(wrap_w);
			}).trigger('resize');
		}();

		//全て入力されているか判定
		const required_comp = function(elm){
			let confirm = true;

			elm.each(function(index, el) {
				const
				 _self    = $(el),
				 required = _self.attr('data-decision-comp');

				if (required === 'false') {
					confirm = false;
					return false;
				}
			});

			if (confirm) {
				$('.active_stage').find('.is_not_input').removeClass('is_not_input').addClass('is_next').html('次へ');
			} else {
				$('.active_stage').find('.is_next').removeClass('is_next').addClass('is_not_input').html('未入力項目があります');
			}
		};

		//判定関数
		const decision = function(el){
			const
			 type       = el.attr('type'),
			 name       = el.attr('name'),
			 val        = el.val(),

			 input_name = $('input[name="'+name+'"]'),
			 name_comp  = input_name.attr('data-decision-comp'),

			 name_len   = input_name.length,
			 not_len    = input_name.not(':checked').length;

			if (type === 'radio' || type === 'checkbox') {
				if (name_len !== not_len) {
					input_name.attr(data_option(true));
				} else {
					input_name.attr(data_option(false));
				}
			} else {
				if (val.length > 0) {
					el.attr(data_option(true));
				} else {
					el.attr(data_option(false));
				}
			}
		};

		//active_stageの入力パーツ確認
		const active_decision = function(){
			$('.active_stage').find(target_input).each(function(i, el) {
				const _self = $(el);

				decision(_self);
			});
		};

		//最初の呼び込み
		const first_load = function(){
			active_decision();
		}();

		//確認判定まとめ
		const confirm_action = function(){
			const action_input = $('.active_stage').find(target_input);

			active_decision();
			required_comp(action_input);
		}

		//入力アクション
		const input_action = function(){
			//チェックボックス、セレクト、ラジオボタン
			const checked = function(elm){
				const _self = elm,
					type = _self.attr('type'),
					tag = _self.prop('tagName');

				if (tag === 'SELECT' || type === 'radio' || type === 'checkbox' || type === 'file') {
					confirm_action();
				}
			}

			target_input.change(function() {
				checked($(this));
			});

			target_input.on('blur', function() {
				confirm_action();
			});
		}();

		//ボタンアクション
		const btn_action = function(){
			const
			 btn        = $('.btn_type'),
			 wrap       = $('#stage_wrap'),
			 wrap_inner = $('#stage_wrap_inner'),

			 pager      = $('#stage_pager'),
			 pager_li   = pager.find('.stage_pager_list ');

			let comps = 'false';

			//translateXまとめ
			function getTransforms(num){
				return {
					'-webkit-transform': 'translateX(-'+num+'px)',
					'transform': 'translateX(-'+num+'px)'
				};
			}

			//必須項目（data-required="true"）がない場合
			function not_required() {
				if ($('.active_stage').find('[data-required="true"]').length === 0) {
					$('.active_stage').find('.is_not_input').removeClass('is_not_input').addClass('is_next').html('次へ');
				}
			}

			//スライド
			function slide_anima(btn) {
				const
				 _self    = btn,
				 active   = $('.active_stage'),
				 next_num = Number(active.attr('data-stage-next')),
				 prev_num = Number(active.attr('data-stage-prev')),

				 wrap_w   = wrap.width();

				let move_x;

				//次の場合はマイナスに変更
				if (_self.hasClass('is_next')) {
					move_x = wrap_w * (next_num);
					target.removeClass('active_stage').eq(next_num).addClass('active_stage');
					pager_li.removeClass('active_list').eq(next_num).addClass('active_list');

				} else if(_self.hasClass('is_return')) {
					move_x = wrap_w * prev_num;
					target.removeClass('active_stage').eq(prev_num).addClass('active_stage');
					pager_li.removeClass('active_list').eq(prev_num).addClass('active_list');
				};

				wrap_inner.css(getTransforms(move_x));
				not_required();
			}

			//submit
			_this.submit(function() {
				confirm_action();

				if (!target.last().hasClass('active_stage') && comps !== 'true') {
					return false;
				}
			});

			//クリックイベント
			btn.on('click', function() {
				const
				 _self  = $(this),
				 wrap_y = wrap.offset().top;

				if (_self.hasClass('is_next') || _self.hasClass('is_return')) {
					//戻る、次へと移動の場合
					slide_anima(_self);
					$('html, body').delay(500).animate({scrollTop: wrap_y}, 500, 'swing');

				} else if(_self.hasClass('is_send')) {
					//送信ボタンクリック
					target_input.each(function(index, el) {
						const _self = $(el);

						let comp = _self.attr('data-decision-comp');

						if (comp === 'false') {
							comps = 'false';
							return false;
						} else {
							comps = 'true';
						}
					});

					if (target.last().hasClass('active_stage') && comps === 'true') {
						_this.submit();
					}
				}

				//送信ボタン以外
				if (!_self.hasClass('is_send')) {
					return false;
				}
			});
		}();

		return(this);
	};
})(jQuery);

$(function(){
	const mail_form = $('#mail_form');

	mail_form.stage_form();
});
