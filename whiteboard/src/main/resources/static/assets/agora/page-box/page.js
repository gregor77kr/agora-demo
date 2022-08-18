import { icons } from '../config.js';
import DomCreator from '../utils/DomCreator.js';

class PageBox extends DomCreator {

	constructor(props) {
		super(props);

		this.page = 0;
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

	onRoomStateChanged = (modifyState) => {

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
			classes: ['whiteboard-annex-arrow-page']
		});
		divPageNumber.textContent = (activeIndex + 1) + '/' + (scenes.length)

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

		this.componentDidMount();
		this._element = parent;
		return this._element;
	}
}

export { PageBox };