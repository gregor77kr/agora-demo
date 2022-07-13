(() => {

	let btnJoin = document.querySelector('#btnJoin');
	let txLink = document.querySelector('#txLink');

	btnJoin && btnJoin.addEventListener('click', (event) => {
		let link = txLink.value;
		openRoom(link);
	});

	txLink && txLink.addEventListener('keypress', (event) => {
		if (event.key !== 'Enter') {
			return;
		}

		let link = txLink.value;
		openRoom(link);
	});

	function openRoom(link) {
		if (!link) {
			txLink.focus();
			return;
		}

		let url = btnJoin.dataset.href + "/" + link;
		window.open(url);
	}
})();
