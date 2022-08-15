import { icons } from '../config.js';

class PageBox {
	constructor(room) {
		this.room = room;

		this.page = 0;

		this.parent = null;
	}

	componentDidMount() {
		const room = this.room;
		this.page = room.state.sceneState.index;
		room.callbacks.on("onRoomStateChanged", (state) => {
			this.onRoomStateChanged(state);
		});
	}

	componentWillUnmount() {
		const room = this.room;
		room.callbacks.off("onRoomStateChanged", (state) => {
			this.onRoomStateChanged(state);
		});
	}

	onRoomStateChanged = (modifyState) => {

	}

	// TO-DO : usePPTPlugin, pptPlugin? is ambiguous
	handlePptPreviousStep = async () => {
		if (this.room.usePPTPlugin && this.room.pptPlugin?.isHandleCurrentScene) {
			this.room.pptPlugin.pptPlugin.prevStep();
		} else {
			this.room.pptPreviousStep();
		}
	}

	handlePptNextStep = async () => {
		if (this.room.usePPTPlugin && this.room.pptPlugin?.isHandleCurrentScene) {
			this.room.pptPlugin.pptPlugin.nextStep();
		} else {
			this.room.pptNextStep();
		}
	}

	renderPageNumber = () => {
		const roomState = this.room.state;
		const activeIndex = roomState.sceneState.index;
		if (this.page !== activeIndex) {
			this.page = activeIndex;
			this.room.scalePptToFit();
		}
		const scenes = roomState.sceneState.scenes;

		const divPageNumber = document.createElement('div');
		divPageNumber.classList.add('whiteboard-annex-arrow-page');
		divPageNumber.textContent = (activeIndex + 1) + '/' + (scenes.length)

		return divPageNumber;
	}


	isFirst = () => {
		const activeIndex = this.room.state.sceneState.index;
		return activeIndex === 0;
	}

	isLast = () => {
		const roomState = this.room.state;
		const activeIndex = roomState.sceneState.index;
		const lastIndex = roomState.sceneState.scenes.length - 1;
		return activeIndex === lastIndex;
	}

	setLastStep = () => {
		const roomState = this.room.state;
		const lastIndex = roomState.sceneState.scenes.length - 1;
		this.room.setSceneIndex(lastIndex);
	}

	setFirstStep = () => {
		this.room.setSceneIndex(0);
	}

	render() {
		const parent = document.createElement('div');
		parent.classList.add('whiteboard-annex-box');

		// first-active
		const divFirst = document.createElement('div');
		divFirst.classList.add('whiteboard-annex-arrow');

		const imgFirst = document.createElement('img');
		imgFirst.classList.add(this.isFirst() ? icons.page.firstDisabled : icons.page.first);

		divFirst.appendChild(imgFirst);
		parent.appendChild(divFirst);

		divFirst.addEventListener('click', event => {
			this.setFirstStep();
		}, false);

		// back
		const divBack = document.createElement('div');
		divBack.classList.add('whiteboard-annex-arrow');

		const imgBack = document.createElement('img');
		imgBack.classList.add(this.isFirst() ? icons.page.backDisabled : icons.page.back);

		divBack.appendChild(imgBack);
		parent.appendChild(divBack);

		divBack.addEventListener('click', event => {
			this.handlePptPreviousStep();
		}, false);

		// page number
		parent.appendChild(this.renderPageNumber());

		// next
		const divNext = document.createElement('div');
		divNext.classList.add('whiteboard-annex-arrow');

		const imgNext = document.createElement('img');
		imgNext.classList.add(this.isLast() ? icons.page.nextDisabled : icons.page.next);

		divNext.appendChild(imgNext);
		parent.appendChild(divNext);

		divNext.addEventListener('click', event => {
			this.handlePptNextStep();
		}, false);

		// last
		const divLast = document.createElement('div');
		divLast.classList.add('whiteboard-annex-arrow');

		const imgLast = document.createElement('img');
		imgLast.classList.add(this.isLast() ? icons.page.lastDisabled : icons.page.last);

		divLast.appendChild(imgLast);
		parent.appendChild(divLast);

		divLast.addEventListener('click', event => {
			this.setLastStep();
		}, false);

		this.componentDidMount();
		this.parent = parent;
		return parent;
	}
}

export { PageBox };