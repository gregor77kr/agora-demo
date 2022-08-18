import { icons } from '../config.js';
import DomCreator from '../utils/DomCreator.js';

class ZoomBox extends DomCreator {
	constructor(props) {
		super(props);

		this.reset = Object.freeze({
			applianceName: 'reset',
			icon: icons.zoom.reset
		});

		this.less = Object.freeze({
			applianceName: 'less',
			icon: icons.zoom.less
		});

		this.plus = Object.freeze({
			applianceName: 'plus',
			icon: icons.zoom.plus
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
		const divCurrentScale = this._element.querySelector('.scale-controller-scale');
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
		const { room } = this.props;
		const scenes = room.state.sceneState.scenes;
		const index = room.state.sceneState.index;
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
		const { room } = this.props;

		room.moveCamera({
			centerX: 0,
			centerY: 0,
			scale: scale,
		});
	}

	moveRuleIndex(deltaIndex) {
		const { room } = this.props;
		const scale = room.state.cameraState.scale;

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
		// scale-controller-box
		const divScale = this.createElement({
			type: 'div',
			classes: ['scale-controller-box']
		});

		// reset
		const divReset = this.createElement({
			type: 'div',
			classes: ['scale-controller-btn']
		});

		divReset.addEventListener('click', event => {
			this.moveTo100();
		}, false);

		const imgReset = this.createElement({
			type: 'img',
			classes: [this.reset.icon]
		});

		this.appendChild(divScale, divReset, imgReset);

		// cutline
		const divCutLine = this.createElement({
			type: 'div',
			classes: ['scale-controller-cut-line']
		});

		this.appendChild(divScale, divCutLine);

		// less
		const divLess = this.createElement({
			type: 'div',
			classes: ['scale-controller-btn']
		});

		divLess.addEventListener('click', event => {
			this.moveRuleIndex(-1);
		}, false);

		const imgLess = this.createElement({
			type: 'img',
			classes: [this.less.icon]
		});

		this.appendChild(divScale, divLess, imgLess);

		// current scale
		const divCurrentScale = this.createElement({
			type: 'div',
			classes: ['scale-controller-scale']
		});

		this.appendChild(divScale, divCurrentScale);

		// plus
		const divPlus = this.createElement({
			type: 'div',
			classes: ['scale-controller-btn']
		});

		divPlus.addEventListener('click', event => {
			this.moveRuleIndex(+1);
		}, false);

		const imgPlus = this.createElement({
			type: 'img',
			classes: [this.plus.icon]
		});

		this.appendChild(divScale, divPlus, imgPlus);

		this._element = divScale;
		this.writeCurrentScale(1);
		return this._element;
	}
}

export { ZoomBox };