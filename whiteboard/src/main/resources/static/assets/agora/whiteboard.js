import DomCreator from './utils/DomCreator.js';
import { ZoomBox } from './zoom-box/zoom.js';
import { ToolBox } from './tool-box/tool.js';
import { RedoUndo } from './redo-undo-box/redo-undo.js';
import { PageBox } from './page-box/page.js';

class Whiteboard extends DomCreator {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		const { room } = this.props;

		// pager
		const root = document.querySelector('#' + this.props.id);

		// realtime-box
		const divRealTimeBox = this.createElement({
			type: 'div',
			classes: ['realtime-box']
		});

		// tool-box
		const divToolBoxOut = this.createElement({
			type: 'div',
			classes: ['tool-box-out']
		});

		let toolBox = new ToolBox({
			room: room
		});

		this.appendChild(divRealTimeBox, divToolBoxOut, toolBox.render());

		// redo-undo
		const divRedoUndo = this.createElement({
			type: 'div',
			classes: ['redo-undo-box']
		});

		let redoUndo = new RedoUndo({
			room: room
		});

		this.appendChild(divRealTimeBox, divRedoUndo, redoUndo.render());

		// zoom-box
		const divZoomBox = this.createElement({
			type: 'div',
			classes: ['zoom-controller-box']
		});

		let zoomBox = new ZoomBox({
			room: room
		})

		this.appendChild(divRealTimeBox, divZoomBox, zoomBox.render());

		// pager
		const divPageBox = this.createElement({
			type: 'div',
			classes: ['page-controller-box']
		});

		const divPageMidBox = this.createElement({
			type: 'div',
			classes: ['page-controller-mid-box']
		});

		let pageBox = new PageBox({
			room: room
		});

		this.appendChild(divRealTimeBox, divPageBox, divPageMidBox, pageBox.render());

		// white-board
		const divWhiteBoard = this.createElement({
			type: 'div',
			classes: ['whiteboard-box']
		});

		this.appendChild(divRealTimeBox, divWhiteBoard);

		this.appendChild(root, divRealTimeBox);
		this.props.room.bindHtmlElement(divWhiteBoard);
	}
}

window.WhiteBoard = Whiteboard;

export { Whiteboard };