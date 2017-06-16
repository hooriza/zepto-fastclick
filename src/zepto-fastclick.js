// (jQuery||Zepto).fastClick
(function(factory) {
	var jQuery = window.jQuery||window.Zepto;
	if (typeof module === 'object' && typeof module.exports === 'object') {
		if (!jQuery && typeof require === 'function') {
			jQuery = require('jquery');
			if ('default' in jQuery) { jQuery = jQuery['default']; }
		}
		module.exports = factory(jQuery);
	} else {
		window.Pages = factory(jQuery);
	}
}(function($) {

	var config = {
		tapHoldDuration : 1000,
		consecutiveInterval : 500,
		moveThreshold : 10,
		activableSelector : 'button, a',
		activedClassName : 'actived'
	};

	var info = null;
	var prevents = [];

	var consecutiveTarget, consecutiveTime = -Infinity, consecutiveCounts;

	var $document = $(document);

	var findPrevent = function(target) {
		for (var i = 0, prevent; !!(prevent = prevents[i]); i++) {
			if (prevent.target === target) {
				prevents.splice(i, 1);
				return prevent;
			}
		}
		return null;
	};

	var clearInfo = function(v) {
		if (!info) { return; }

		if (info.timer) { clearTimeout(info.timer); }
		info.$button.removeClass(config.activedClassName);
		info = null;
	};

	var eventType = null;

	$document.on('touchstart mousedown', function(evt) {
		if (eventType) { return; }
		eventType = evt.type;

		var evt = (evt.originalEvent || evt);
		var touch = evt.touches ? evt.touches[0] : evt;

		var $target = $(touch.target);
		var $button = $target.is(config.activableSelector) ? $target : $target.closest(config.activableSelector);

		info = {
			pos : [ touch.pageX, touch.pageY ],
			$target : $target,
			$button : $button
		};

		info.timer = setTimeout(function() {
			info.$target.trigger('taphold');
			clearInfo();
		}, config.tapHoldDuration);

		$button.addClass(config.activedClassName);

	}).on('touchmove mousemove', function(evt) {
		if (
			(evt.type === 'touchmove' && eventType === 'mousedown') ||
			(evt.type === 'mousemove' && eventType === 'touchstart')
		) { return; }

		if (!info) { return; }

		var evt = (evt.originalEvent || evt);
		var touch = evt.touches ? evt.touches[0] : evt;
		var distance = Math.pow(info.pos[0] - touch.pageX, 2) + Math.pow(info.pos[1] - touch.pageY, 2);

		if (distance >= 25) {
			clearInfo();
		}

	}).on('touchend mouseup', function(evt) {
		if (
			(evt.type === 'touchend' && eventType === 'mousedown') ||
			(evt.type === 'mouseup' && eventType === 'touchstart')
		) { return; }

		eventType = null;
		if (!info) { return; }

		var target = info.$target[0];
		var customEvent = $.Event('fastclick');

		if (Date.now() - consecutiveTime > config.consecutiveInterval || target !== consecutiveTarget) { consecutiveCounts = 0; }

		customEvent.detail = ++consecutiveCounts;
		info.$target.trigger(customEvent);

		findPrevent(target);

		consecutiveTime = Date.now();
		consecutiveTarget = target;

		var prevented = customEvent.isDefaultPrevented();

		prevents.push({
			target : target,
			prevented : prevented
		});

		clearInfo();

		if (prevented) {
			evt.preventDefault();
		}

	}).on('touchcancel', function(evt) {

		if (!info) { return; }
		clearInfo();

	}).on('click', function(evt) {

		var prevent = findPrevent(evt.target);
		if (prevent && prevent.prevented) {
			evt.preventDefault();
		}

	});

	// 스크롤을 멈추려고 눌렀을때 클릭되는 문제
	document.addEventListener('scroll', function(e) {
		if (!info) { return; }
		if (info.$target.closest(e.target).length) {
			clearInfo();
		}
	}, true);

	$.fastClick = config;
	return $.fastClick;

}));
