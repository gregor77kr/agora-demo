import DomCreator from '../utils/DomCreator.js';

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

		// 1. menu-annex-box
		const divMenuAnnexBox = document.createElement('div');
		divMenuAnnexBox.classList.add('menu-annex-box');
		divMenuAnnexBox.style.outline = 0;

		// 1-1. menu-title-line-box
		const divMenuTitleLineBox = document.createElement('div');
		divMenuTitleLineBox.classList.add('menu-title-line-box');

		// 1-1-1. menu-title-line
		const divMenuTitleLine = document.createElement('div');
		divMenuTitleLine.classList.add('menu-title-line');

		// 1-1-1-1. menu-title-text-box
		const divMenuTitleTextBox = document.createElement('div');
		divMenuTitleTextBox.classList.add('menu-title-text-box');

		divMenuTitleTextBox.textContent = 'Preview';
		divMenuTitleLine.appendChild(divMenuTitleTextBox);

		// 1-1-1-2. menu-title-left
		const divMenuTitleLeft = document.createElement('div');
		divMenuTitleLeft.classList.add('menu-title-left');

		// 1-1-1-2-1. menu-add-btn
		const divMenuAddBtn = document.createElement('div');
		divMenuAddBtn.classList.add('menu-head-btn');

		// 1-1-1-2-1-1. img add page
		const imgAddPage = document.createElement('img');
		imgAddPage.classList.add(icons.preview.addPage);

		divMenuAddBtn.appendChild(imgAddPage);
		divMenuTitleLeft.appendChild(divMenuAddBtn);

		divMenuAddBtn.addEventListener('click', event => {
			this.addPage();
		}, false);

		// 1-1-1-2-2. menu-close-btn
		const divMenuCloseBtn = document.createElement('div');
		divMenuCloseBtn.classList.add('menu-head-btn');

		// 1-1-1-2-1-1. img add page
		const imgClosePage = document.createElement('img');
		imgClosePage.classList.add(icons.preview.close);

		divMenuCloseBtn.appendChild(imgClosePage);
		divMenuTitleLeft.appendChild(divMenuCloseBtn);

		divMenuCloseBtn.addEventListener('click', event => {
			this.handlePreviewState(false);
		}, false);

		divMenuTitleLine.appendChild(divMenuTitleLeft);
		divMenuTitleLineBox.appendChild(divMenuTitleLine);

		// 1-1-2. 
		const divLine = document.createElement('div');
		divLine.style.height = '64px';

		divMenuTitleLineBox.appendChild(divLine);

		// 1-1-3. menu-annex-body
		const divMenuAnnexBody = document.createElement('div');
		divMenuAnnexBody.classList.add('menu-annex-body');

		divMenuAnnexBody.appendChild(this.renderPreviewCells(scenes, activeIndex, sceneDir));
		divMenuTitleLineBox.appendChild(divMenuAnnexBody);

		divMenuAnnexBox.appendChild(divMenuTitleLineBox);

		this._element = divMenuAnnexBox;
		return this._element;
	}
}

export { prePreviewBox }