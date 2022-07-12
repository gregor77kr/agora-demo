(() => {

	let btnJoin = document.querySelector('#btnJoin');
	let txLink = document.querySelector('#txLink');

	btnJoin && btnJoin.addEventListener('click', (event) => {
		let link = txLink.value;

		joinRoom(link).then(data => {
			console.log(data);
		}).catch((error) => {
			alert(error);
		});
	});

	txLink && txLink.addEventListener('keypress', (event) => {
		if (event.key !== 'Enter') {
			return;
		}

		let link = txLink.value;

		joinRoom(link).then(data => {
			console.log(data);
		}).catch((error) => {
			alert(error);
		});
	});

	async function joinRoom(link) {
		if (!link) {
			txLink.focus();
			return;
		}

		let option = {
			'method': 'POST',
			'headers': {
				'Content-Type': 'application/json',
			}, 'body': JSON.stringify({
				'link': link
			})
		};

		let url = btnJoin.dataset.href;
		let request = new Request(url, option);
		let response = await fetch(request);
		let json = await response.json();

		return json;
	}
})();
