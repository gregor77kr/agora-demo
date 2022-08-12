class ZoomBox {
	constructor(room) {
		this.room = room;

		this.reset = Object.freeze({
			applianceName: 'reset',
			icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+cmVzZXQ8L3RpdGxlPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5YiH5Zu+IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODguMDAwMDAwLCAtMTUyLjAwMDAwMCkiPgogICAgICAgICAgICA8Y2lyY2xlIGlkPSLmpK3lnIblvaLlpIfku70tMiIgZmlsbD0iIzQ0NEU2MCIgY3g9IjEwMCIgY3k9IjE2NCIgcj0iMSI+PC9jaXJjbGU+CiAgICAgICAgICAgIDxjaXJjbGUgaWQ9IuakreWchuW9oiIgc3Ryb2tlPSIjNDQ0RTYwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGN4PSIxMDAiIGN5PSIxNjQiIHI9IjQiPjwvY2lyY2xlPgogICAgICAgICAgICA8bGluZSB4MT0iMTAwIiB5MT0iMTU4IiB4Mj0iMTAwIiB5Mj0iMTYwIiBpZD0i6Lev5b6ELTLlpIfku70tMiIgc3Ryb2tlPSIjNDQ0RTYwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvbGluZT4KICAgICAgICAgICAgPGxpbmUgeDE9IjEwMCIgeTE9IjE2OCIgeDI9IjEwMCIgeTI9IjE3MCIgaWQ9Iui3r+W+hC0y5aSH5Lu9LTIiIHN0cm9rZT0iIzQ0NEU2MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMDYiIHkxPSIxNjQiIHgyPSIxMDQiIHkyPSIxNjQiIGlkPSLot6/lvoQtMuWkh+S7vS0yIiBzdHJva2U9IiM0NDRFNjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iOTYiIHkxPSIxNjQiIHgyPSI5NCIgeTI9IjE2NCIgaWQ9Iui3r+W+hC0y5aSH5Lu9LTIiIHN0cm9rZT0iIzQ0NEU2MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L2xpbmU+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4='
		});

		this.less = Object.freeze({
			applianceName: 'less',
			icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+bGVzczwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgICAgICAgPGcgaWQ9IuWIh+WbviIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTg4LjAwMDAwMCwgLTE4OC4wMDAwMDApIiBzdHJva2U9IiM0NDRFNjAiPgogICAgICAgICAgICA8bGluZSB4MT0iOTUiIHkxPSIyMDAiIHgyPSIxMDUiIHkyPSIyMDAiIGlkPSLot6/lvoQtMuWkh+S7vSI+PC9saW5lPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'
		});

		this.plus = Object.freeze({
			applianceName: 'plus',
			icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+YWRkPC90aXRsZT4KICAgIDxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KICAgICAgICA8ZyBpZD0i5YiH5Zu+IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODguMDAwMDAwLCAtMjI0LjAwMDAwMCkiIHN0cm9rZT0iIzQ0NEU2MCI+CiAgICAgICAgICAgIDxsaW5lIHgxPSIxMDAiIHkxPSIyMzEiIHgyPSIxMDAiIHkyPSIyNDEiIGlkPSLot6/lvoQtMiI+PC9saW5lPgogICAgICAgICAgICA8bGluZSB4MT0iOTUiIHkxPSIyMzYiIHgyPSIxMDUiIHkyPSIyMzYiIGlkPSLot6/lvoQtMiI+PC9saW5lPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'
		});

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

		this.tempRuleIndex = null;

		this.syncDuration = 200;

		this.syncRuleIndexTimer = null;
	}

	writeCurrentScale(scale) {
		const currentScale = Math.ceil(scale * 100);
		const divCurrentScale = document.querySelector('.scale-controller-scale');
		divCurrentScale.textContent = currentScale + '%';
	}

	delaySyncRuleIndex() {
		if (this.syncRuleIndexTimer !== null) {
			clearTimeout(this.syncRuleIndexTimer);
			this.syncRuleIndexTimer = null;
		}
		this.syncRuleIndexTimer = setTimeout(() => {
			this.syncRuleIndexTimer = null;
			this.tempRuleIndex = undefined;

		}, this.syncDuration);
	}

	readRuleIndexByScale(scale) {
		if (scale < this.dividingRule[0]) {
			return 0;
		}

		for (let i = 0; i < this.dividingRule.length; ++i) {
			const prePoint = this.dividingRule[i - 1];
			const point = this.dividingRule[i];
			const nextPoint = this.dividingRule[i + 1];

			const begin = prePoint === undefined ? Number.MIN_SAFE_INTEGER : (prePoint + point) / 2;
			const end = nextPoint === undefined ? Number.MAX_SAFE_INTEGER : (nextPoint + point) / 2;

			if (scale >= begin && scale <= end) {
				return i;
			}
		}
	}

	moveTo100() {
		const scenes = this.room.state.sceneState.scenes;
		const index = this.room.state.sceneState.index;
		this.tempRuleIndex = this.readRuleIndexByScale(1);
		this.delaySyncRuleIndex();

		if (scenes && scenes[index].ppt) {
			room.scalePptToFit();
		} else {
			this.zoomChange(1);
		}

		this.writeCurrentScale(1);
	}

	zoomChange(scale) {
		room.moveCamera({
			centerX: 0,
			centerY: 0,
			scale: scale,
		});
	}

	moveRuleIndex(deltaIndex) {
		const scale = this.room.state.cameraState.scale;

		if (!this.tempRuleIndex) {
			this.tempRuleIndex = this.readRuleIndexByScale(scale);
		}
		this.tempRuleIndex += deltaIndex;

		if (this.tempRuleIndex > this.dividingRule.length - 1) {
			this.tempRuleIndex = this.dividingRule.length - 1;

		} else if (this.tempRuleIndex < 0) {
			this.tempRuleIndex = 0;
		}
		const targetScale = this.dividingRule[this.tempRuleIndex];

		this.delaySyncRuleIndex();
		this.zoomChange(targetScale);

		this.writeCurrentScale(targetScale);
	}

	render() {
		const parent = document.querySelector('.zoom-controller-box');

		// scale-controller-box
		const divScale = document.createElement('div');
		divScale.classList.add('scale-controller-box');

		// reset
		const divReset = document.createElement('div');
		divReset.classList.add('scale-controller-btn');

		const imgReset = document.createElement('img');
		imgReset.src = this.reset.icon;
		imgReset.alt = this.reset.applianceName;

		divReset.appendChild(imgReset);
		divScale.appendChild(divReset);

		divReset.addEventListener('click', event => {
			this.moveTo100();
		}, false);

		// cutline
		const divCutLine = document.createElement('div');
		divCutLine.classList.add('scale-controller-cut-line');
		divScale.appendChild(divCutLine);

		// less
		const divLess = document.createElement('div');
		divLess.classList.add('scale-controller-btn');

		const imgLess = document.createElement('img');
		imgLess.src = this.less.icon;
		imgLess.alt = this.less.applianceName;

		divLess.appendChild(imgLess);
		divScale.appendChild(divLess);

		divLess.addEventListener('click', event => {
			this.moveRuleIndex(-1);
		}, false);

		// current scale
		const divCurrentScale = document.createElement('div');
		divCurrentScale.classList.add('scale-controller-scale');

		divScale.appendChild(divCurrentScale);

		// plus
		const divPlus = document.createElement('div');
		divPlus.classList.add('scale-controller-btn');

		const imgPlus = document.createElement('img');
		imgPlus.src = this.plus.icon;
		imgPlus.alt = this.plus.applianceName;

		divPlus.appendChild(imgPlus);
		divScale.appendChild(divPlus);

		divPlus.addEventListener('click', event => {
			this.moveRuleIndex(+1);
		}, false);

		parent.appendChild(divScale);
		this.writeCurrentScale(1);
	}
}

export { ZoomBox };