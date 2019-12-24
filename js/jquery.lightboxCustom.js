$(document).ready(function(){
	$('a.btn-zoom,a.btn-request,input.btn-request').simplebox();
});

(function($) {
	$.fn.simplebox = function(options) { 
		return new Simplebox(this, options); 
	};
	
	function Simplebox(context, options) { this.init(context, options); };
	
	Simplebox.prototype = {
		options:{},
		init: function (context, options){
			this.options = $.extend({
				duration: 500,
				linkClose: 'a.close, a.btn-close, button.close, div.fader',
				linkPopup: '.link-popup'
			}, options || {});
			this.btn = $(context);
			this.btnEvent(this, this.btn);
		},
		btnEvent: function($this, el){
			el.click(function(){
				if ($(this).attr('href')) $this.toPrepare($(this).attr('href'));
				else $this.toPrepare($(this).attr('title'));
				return false;
			});
		},
		toPrepare: function(obj){
			this.popup = $(obj);
			this.btnClose = this.popup.find(this.options.linkClose);
			this.submitBtn = this.popup.find(this.options.linkPopup);
			this.initMargin(this);
			this.popup.css({
				top: this.popupTop,
				left: 0
			}).hide();
			
			this.initAnimate(this);
			this.initCloseEvent(this, this.btnClose, true);
			this.initCloseEvent(this, this.submitBtn, false); 
		},
		initCloseEvent: function($this, el, flag){
			el.click(function(){
				$this.popup.fadeOut($this.options.duration, function(){
					$this.popup.css({left: '-9999px'}).show();
					$this.submitBtn.unbind('click');
					$this.btnClose.unbind('click');
				});
				return false;
			});
		},
		initAnimate:function ($this){
			$this.popup.fadeIn($this.options.duration);
		},
		initMargin:function ($this){
			popHeight = this.popup.find(".popup-holder").innerHeight();
			popWidth = this.popup.find(".popup-holder").innerWidth();
			this.popup.find(".popup-holder").css({
				marginTop: - popHeight/2,
				marginLeft: - popWidth/2
			})
		}

		
	}
}(jQuery));