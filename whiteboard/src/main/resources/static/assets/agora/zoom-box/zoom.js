class ZoomBox {
	constructor() {
		this.reset = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cmVzZXQ8L3RpdGxlPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5YiH5Zu+IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODguMDAwMDAwLCAtMTUyLjAwMDAwMCkiPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSLmpK3lnIblvaLlpIfku70tMiIgZmlsbD0iIzQ0NEU2MCIgY3g9IjEwMCIgY3k9IjE2NCIgcj0iMSI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9IuakreWchuW9oiIgc3Ryb2tlPSIjNDQ0RTYwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGN4PSIxMDAiIGN5PSIxNjQiIHI9IjQiPjwvY2lyY2xlPgogICAgICAgICAgICA8bGluZSB4MT0iMTAwIiB5MT0iMTU4IiB4Mj0iMTAwIiB5Mj0iMTYwIiBpZD0i6Lev5b6ELTLlpIfku70tMiIgc3Ryb2tlPSIjNDQ0RTYwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjEwMCIgeTE9IjE2OCIgeDI9IjEwMCIgeTI9IjE3MCIgaWQ9Iui3r+W+hC0y5aSH5Lu9LTIiIHN0cm9rZT0iIzQ0NEU2MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMDYiIHkxPSIxNjQiIHgyPSIxMDQiIHkyPSIxNjQiIGlkPSLot6/lvoQtMuWkh+S7vS0yIiBzdHJva2U9IiM0NDRFNjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iOTYiIHkxPSIxNjQiIHgyPSI5NCIgeTI9IjE2NCIgaWQ9Iui3r+W+hC0y5aSH5Lu9LTIiIHN0cm9rZT0iIzQ0NEU2MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=';
		this.less = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+bGVzczwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgICAgICAgPGcgaWQ9IuWIh+WbviIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTg4LjAwMDAwMCwgLTE4OC4wMDAwMDApIiBzdHJva2U9IiM0NDRFNjAiPgogICAgICAgICAgICA8bGluZSB4MT0iOTUiIHkxPSIyMDAiIHgyPSIxMDUiIHkyPSIyMDAiIGlkPSLot6/lvoQtMuWkh+S7vSI+PC9saW5lPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+';
		this.plus = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+YWRkPC90aXRsZT4KICAgIDxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICAgICAgICA8ZyBpZD0i5YiH5Zu+IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODguMDAwMDAwLCAtMjI0LjAwMDAwMCkiIHN0cm9rZT0iIzQ0NEU2MCI+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMDAiIHkxPSIyMzEiIHgyPSIxMDAiIHkyPSIyNDEiIGlkPSLot6/lvoQtMiI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iOTUiIHkxPSIyMzYiIHgyPSIxMDUiIHkyPSIyMzYiIGlkPSLot6/lvoQtMiI+PC9saW5lPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+';

		this.dividingRule = Object.freeze([
			0.10737418240000011,
			0.13421772800000012,
			0.16777216000000014,
			0.20971520000000016,
			0.26214400000000015,
			0.3276800000000002,
			0.4096000000000002,
			0.5120000000000001,
			0.6400000000000001,
			0.8,
			1,
			1.26,
			1.5876000000000001,
			2.000376,
			2.5204737600000002,
			3.1757969376000004,
			4.001504141376,
			5.041895218133761,
			6.352787974848539,
			8.00451284830916,
			10,
		]);
	}

	render() {
		const parent = document.querySelector('.zoom-controller-box');
		let html = '';
		html += '<div class="scale-controller-box">';
		html += '	<div class="scale-controller-btn">';
		html += '		<img src="' + this.reset + '" alt="reset">';
		html += '	</div>';
		html += '	<div class="scale-controller-cut-line"></div>';
		html += '	<div class="scale-controller-btn">';
		html += '		<img src="' + this.less + '" alt="less">';
		html += '	</div>';
		html += '	<div>';
		html += '		100';
		html += '		<span style="opacity: 0.6;">%</span>';
		html += '	</div>';
		html += '	<div class="scale-controller-btn">';
		html += '		<img src="' + this.plus + '" alt="plus">';
		html += '	</div>';
		html += '</div>';

		parent.innerHTML = html;
	}
}

export { ZoomBox };