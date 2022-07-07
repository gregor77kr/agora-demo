/**
 * 
 */
(function() {
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
				'editor': {
					'type': 'select',
					'options': {
						'listItems': [
							{ 'text': 'Deluxe', value: '1' },
							{ 'text': 'EP', value: '2' },
							{ 'text': 'Single', value: '3' }
						]
					}
				}
			}, {
				'header': 'isBan',
				'name': 'isBan',
				'editor': 'select'
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

	});

	window.addEventListener('DOMContentLoaded', (event) => {

	});
})();