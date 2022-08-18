import DomCreator from '../utils/DomCreator.js';

/**
 * TO-DO : missing css
 */
class PreviewBox extends DomCreator {

	constructor(props) {
		super(props);

		this.state = {
			isFocus: false,
			hoverCellIndex: null,
			scenesCount: 0
		};
	}

	addPage = () => {

	}

	handlePreviewState = (state) => {

	}

	renderPreviewCells = (scenes, activeIndex, sceneDir) => {

	}

	render = () => {
		const { isVisible, handlePreviewState, room } = this.props;
		const scenes = room.state.sceneState.scenes;
		const sceneDir = room.state.sceneState.scenePath.split("/");
		sceneDir.pop();
		const activeIndex = room.state.sceneState.index;

		// parent
		const divMenuAnnexBox = this.createElement({
			type: 'div',
			classes: ['menu-annex-box'],
			style: 'outline : 0px'
		});

		// line-box
		const divMenuTitleLineBox = this.createElement({
			type: 'div',
			classes: ['menu-title-line-box']
		});

		const divMenuTitleLine = this.createElement({
			type: 'div',
			classes: ['menu-title-line']
		});

		const divMenuTitleTextBox = this.createElement({
			type: 'div',
			classes: ['menu-title-text-box']
		});
		divMenuTitleTextBox.textContent = 'Preview';

		// add page
		const divMenuTitleLeft = this.createElement({
			type: 'div',
			classes: ['menu-title-left']
		});

		const divMenuAddBtn = this.createElement({
			type: 'div',
			classes: ['menu-head-btn']
		});

		divMenuAddBtn.addEventListener('click', event => {
			this.addPage();
		}, false);

		const imgAddPage = this.createElement({
			type: 'img',
			classes: [icons.preview.addPage]
		});
		this.appendChild(divMenuAddBtn, imgAddPage);

		// close page
		const divMenuCloseBtn = this.createElement({
			type: 'div',
			classes: ['menu-head-btn']
		});

		divMenuCloseBtn.addEventListener('click', event => {
			this.handlePreviewState(false);
		}, false);

		const imgClosePage = this.createElement({
			type: 'img',
			classes: [icons.preview.close]
		});
		this.appendChild(divMenuCloseBtn, imgClosePage);

		this.appendChild(divMenuTitleLeft, [divMenuAddBtn, divMenuCloseBtn]);
		this.appendChild(divMenuTitleLine, [divMenuTitleTextBox, divMenuTitleLeft]);

		// line
		const divLine = this.createElement({
			type: 'div',
			style: 'height : 64px'
		});

		// body
		const divMenuAnnexBody = this.createElement({
			type: 'div',
			classes: ['menu-annex-body']
		});
		this.appendChild(divMenuAnnexBody, this.renderPreviewCells(scenes, activeIndex, sceneDir));

		this.appendChild(divMenuAnnexBox, [divMenuTitleLineBox, divLine, divMenuAnnexBody]);

		this._element = divMenuAnnexBox;
		return this._element;
	}
}

export { prePreviewBox }