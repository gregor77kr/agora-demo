(() => {

	function addEvent(parent, type, selector, listener) {
		parent.addEventListener(type, function(event) {
			if (event.target.matches(selector + ', ' + selector + ' *')) {
				listener.apply(event.target.closest(selector), arguments);
			}
		}, false);
	}

	if (document && !document.on) {
		document.on = function(type, selector, listener) {
			addEvent(document, type, selector, listener);
		};
	}
})();