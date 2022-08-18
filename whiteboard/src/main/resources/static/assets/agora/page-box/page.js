import { icons } from '../config.js';
import DomCreator from '../utils/DomCreator.js';

class PageBox extends DomCreator {

	constructor(props) {
		super(props);

		this.page = 0;
	}

	// TO-DO : usePPTPlugin, pptPlugin? is ambiguous
	handlePptPreviousStep = async () => {
		const { room, usePPTPlugin, pptPlugin } = this.props;
		if (usePPTPlugin && pptPlugin?.isHandleCurrentScene) {
			room.pptPlugin.prevStep();
		} else {
			room.pptPreviousStep();
		}
	}

	handlePptNextStep = async () => {
		const { room, usePPTPlugin, pptPlugin } = this.props;
		if (usePPTPlugin && pptPlugin?.isHandleCurrentScene) {
			room.pptPlugin.nextStep();
		} else {
			room.pptNextStep();
		}
	}


	componentDidMount() {
		const { room } = this.props;
		this.page = room.state.sceneState.index;
		room.callbacks.on("onRoomStateChanged", (state) => {
			this.onRoomStateChanged(state);
		});
	}

	componentWillUnmount() {
		const { room } = this.props;
		room.callbacks.off("onRoomStateChanged", (state) => {
			this.onRoomStateChanged(state);
		});
	}

	onRoomStateChanged = (state) => {
		if (state && state.hasOwnProperty('sceneState')) {
			this.page = state.sceneState.index;
			this.writePageNumber();
			this.toggleButton();
		}
	}

	writePageNumber = () => {
		const { room } = this.props;
		const roomState = room.state;
		const activeIndex = roomState.sceneState.index;
		if (this.page !== activeIndex) {
			this.page = activeIndex;
			this.props.room.scalePptToFit();
		}
		const scenes = roomState.sceneState.scenes;

		const divPageNumber = this._element.querySelector('.whiteboard-annex-arrow-page-number');
		divPageNumber.textContent = (activeIndex + 1) + '/' + (scenes.length);
	}

	toggleButton = () => {
		const imgs = this._element.querySelectorAll('img');

		const imgFirst = imgs[0];
		this.clearClasses(imgFirst);
		this.addClasses(imgFirst, [this.isFirst() ? icons.page.firstDisabled : icons.page.first]);

		const imgBack = imgs[1];
		this.clearClasses(imgBack);
		this.addClasses(imgBack, [this.isFirst() ? icons.page.backDisabled : icons.page.back]);

		const imgNext = imgs[2];
		this.clearClasses(imgNext);
		this.addClasses(imgNext, [this.isLast() ? icons.page.nextDisabled : icons.page.next]);

		const imgLast = imgs[3];
		this.clearClasses(imgLast);
		this.addClasses(imgLast, [this.isLast() ? icons.page.lastDisabled : icons.page.last]);
	}

	renderPageNumber = () => {
		const { room } = this.props;
		const roomState = room.state;
		const activeIndex = roomState.sceneState.index;
		if (this.page !== activeIndex) {
			this.page = activeIndex;
			this.props.room.scalePptToFit();
		}
		const scenes = roomState.sceneState.scenes;

		const divPageNumber = this.createElement({
			type: 'div',
			classes: ['whiteboard-annex-arrow-page', 'whiteboard-annex-arrow-page-number']
		});
		divPageNumber.textContent = (activeIndex + 1) + '/' + (scenes.length);

		return divPageNumber;
	}


	isFirst = () => {
		const activeIndex = this.props.room.state.sceneState.index;
		return activeIndex === 0;
	}

	isLast = () => {
		const roomState = this.props.room.state;
		const activeIndex = roomState.sceneState.index;
		const lastIndex = roomState.sceneState.scenes.length - 1;
		return activeIndex === lastIndex;
	}

	setLastStep = () => {
		const roomState = this.props.room.state;
		const lastIndex = roomState.sceneState.scenes.length - 1;
		this.props.room.setSceneIndex(lastIndex);
	}

	setFirstStep = () => {
		this.props.room.setSceneIndex(0);
	}

	pathName = (path) => {
		const cells = path.split("/");
		const popCell = cells.pop();
		if (popCell === "") {
			cells.pop();
		}
		return cells.join("/");
	}

	addPage = () => {
		const { room } = this.props;
		const activeIndex = room.state.sceneState.index;
		const newSceneIndex = activeIndex + 1;
		const scenePath = room.state.sceneState.scenePath;
		const pathName = this.pathName(scenePath);
		room.putScenes(pathName, [{}], newSceneIndex);
		room.setSceneIndex(newSceneIndex);
	}

	removePage = () => {
		const { room } = this.props;
		const scenePath = room.state.sceneState.scenePath;
		const activeIndex = room.state.sceneState.index;

		if (room.state.sceneState.scenes.length !== 1) {
			room.removeScenes(scenePath);
		}
	}

	render() {
		const parent = this.createElement({
			type: 'div',
			classes: ['whiteboard-annex-box']
		});

		// first-active
		const divFirst = this.createElement({
			type: 'div',
			classes: ['whiteboard-annex-arrow']
		});

		divFirst.addEventListener('click', event => {
			this.setFirstStep();
		}, false);

		const imgFirst = this.createElement({
			type: 'img',
			classes: [this.isFirst() ? icons.page.firstDisabled : icons.page.first]
		});

		this.appendChild(parent, divFirst, imgFirst);

		// back
		const divBack = this.createElement({
			type: 'div',
			classes: ['whiteboard-annex-arrow']
		});

		divBack.addEventListener('click', event => {
			this.handlePptPreviousStep();
		}, false);

		const imgBack = this.createElement({
			type: 'img',
			classes: [this.isFirst() ? icons.page.backDisabled : icons.page.back]
		});

		this.appendChild(parent, divBack, imgBack);

		// page number
		this.appendChild(parent, this.renderPageNumber());

		// next
		const divNext = this.createElement({
			type: 'div',
			classes: ['whiteboard-annex-arrow']
		});

		divNext.addEventListener('click', event => {
			this.handlePptNextStep();
		}, false);

		const imgNext = this.createElement({
			type: 'img',
			classes: [this.isLast() ? icons.page.nextDisabled : icons.page.next]
		});

		this.appendChild(parent, divNext, imgNext);

		// last
		const divLast = this.createElement({
			type: 'div',
			classes: ['whiteboard-annex-arrow']
		});

		divLast.addEventListener('click', event => {
			this.setLastStep();
		}, false);

		const imgLast = this.createElement({
			type: 'img',
			classes: [this.isLast() ? icons.page.lastDisabled : icons.page.last]
		});

		this.appendChild(parent, divLast, imgLast);

		// add page
		const divAdd = this.createElement({
			type: 'div',
			classes: ['whiteboard-annex-arrow']
		});

		divAdd.addEventListener('click', event => {
			this.addPage();
		}, false);

		const imgAdd = this.createElement({
			type: 'img',
			classes: [icons.preview.addPage]
		});

		this.appendChild(parent, divAdd, imgAdd);

		// remove page
		const divRemove = this.createElement({
			type: 'div',
			classes: ['whiteboard-annex-arrow']
		});

		divRemove.addEventListener('click', event => {
			this.removePage();
		}, false);

		const imgRemove = this.createElement({
			type: 'img',
			classes: [icons.preview.close]
		});

		this.appendChild(parent, divRemove, imgRemove);

		this.componentDidMount();
		this._element = parent;
		return this._element;
	}
}

export { PageBox };