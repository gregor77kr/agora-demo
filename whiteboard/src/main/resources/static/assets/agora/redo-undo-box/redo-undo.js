import { icons } from '../config.js';
import DomCreator from '../utils/DomCreator.js';

class RedoUndo extends DomCreator {

	constructor(props) {
		super(props);

		this.state = {
			undoSteps: 0,
			redoSteps: 0
		};
	}

	componentDidMount = () => {
		const { room } = this.props;

		if (room.isWritable) {
			room.disableSerialization = false;
		}

		room.callbacks.on("onCanUndoStepsUpdate", (steps) => {
			this.setUndoSteps(steps);

			const imgUndo = this._element.querySelectorAll('img')[0];
			this.clearClasses(imgUndo);
			this.addClasses(imgUndo, [this.state.undoSteps === 0 ? icons.do.undoDisabled : icons.do.undo]);
		});

		room.callbacks.on("onCanRedoStepsUpdate", (steps) => {
			this.setRedoSteps(steps);

			const imgRedo = this._element.querySelectorAll('img')[1];
			this.clearClasses(imgRedo);
			this.addClasses(imgRedo, [this.state.redoSteps === 0 ? icons.do.redoDisabled : icons.do.redo]);
		});
	}

	componentWillUnmount = () => {
		const { room } = this.props;

		room.callbacks.off("onCanUndoStepsUpdate", this.setUndoSteps);
		room.callbacks.off("onCanRedoStepsUpdate", this.setRedoSteps);
	}

	setUndoSteps = (steps) => {
		this.state.undoSteps = steps;
	}

	setRedoSteps = (steps) => {
		this.state.redoSteps = steps;
	}

	handleUndo = () => {
		this.props.room.undo();
	}

	handleRedo = () => {
		this.props.room.redo();
	}

	render = () => {
		const divRedoUndo = this.createElement({
			type: 'div',
			classes: ['redo-undo']
		});

		// undo
		const divUndo = this.createElement({
			type: 'div',
			classes: ['redo-undo-controller-btn']
		});

		divUndo.addEventListener('click', event => {
			this.handleUndo();
		}, false);

		const imgUndo = this.createElement({
			type: 'img',
			classes: [this.state.undoSteps === 0 ? icons.do.undoDisabled : icons.do.undo]
		});

		this.appendChild(divRedoUndo, divUndo, imgUndo);

		// redo
		const divRedo = this.createElement({
			type: 'div',
			classes: ['redo-undo-controller-btn']
		});

		divRedo.addEventListener('click', event => {
			this.handleRedo();
		}, false);

		const imgRedo = this.createElement({
			type: 'img',
			classes: [this.state.redoSteps === 0 ? icons.do.redoDisabled : icons.do.redo]
		});

		this.appendChild(divRedoUndo, divRedo, imgRedo);

		this.componentDidMount();
		this._element = divRedoUndo;

		return this._element;
	}
}

export { RedoUndo };