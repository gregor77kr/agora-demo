(() => {
	var Grid = tui.Grid;
	const grid = new Grid({
		'el': document.getElementById('grid'),
		'columns': [
			{
				'header': 'uuid',
				'name': 'uuid',
				'editor': 'text'
			}, {
				'header': 'teamUUID',
				'name': 'teamUUID',
				'editor': 'text'
			}, {
				'header': 'appUUID',
				'name': 'appUUID',
				'editor': 'text'
			}, {
				'header': 'isRecord',
				'name': 'isRecord',
				'editor': 'text'
			}, {
				'header': 'isBan',
				'name': 'isBan',
				'editor': 'text'
			}, {
				'header': 'createdAt',
				'name': 'createdAt',
				'editor': 'text'
			}, {
				'header': 'limit',
				'name': 'limit',
				'editor': 'text'
			}
		]
	});

	let btnSearch = document.querySelector('#btnSearch');
	btnSearch && btnSearch.addEventListener('click', (event) => {
		getRoomList().then(data => {

			data.forEach(d => {
				d.isBan = (d.isBan) ? "Y" : "N";
				d.isRecord = (d.isRecord) ? "Y" : "N";
			});

			grid.resetData(data);
			grid.resetOriginData();
		}).catch((error) => {
			alert(error);
		});
	});

	async function getRoomList() {
		let option = {
			'method': 'GET',
			'headers': {
				'Content-Type': 'application/json',
			}
		};

		let url = btnSearch.dataset.href + "?" + new URLSearchParams({
			'region': 'sg'
		});

		let request = new Request(url, option);
		let response = await fetch(request);
		let json = await response.json();

		return json;
	}

})();