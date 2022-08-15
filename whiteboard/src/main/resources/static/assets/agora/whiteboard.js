import { } from './utils/utils.js';
import { icons } from './config.js';
import { ZoomBox } from './zoom-box/zoom.js';
import { ToolBox } from './tool-box/tool.js';
import { RedoUndo } from './redo-undo-box/redo-undo.js';
import { PageBox } from './page-box/page.js';

class Whiteboard {
	constructor(props) {
		this.props = props;
	}

	render() {
		const id = this.props.id;
		const room = this.props.room;

		// pager
		const root = document.querySelector('#' + this.props.id);

		// realtime-box
		const divRealTimeBox = document.createElement('div');
		divRealTimeBox.classList.add('realtime-box');

		// tool-box
		const divToolBoxOut = document.createElement('div');
		divToolBoxOut.classList.add('tool-box-out');

		let toolBox = new ToolBox(this.props.room);
		divToolBoxOut.appendChild(toolBox.render());
		divRealTimeBox.appendChild(divToolBoxOut);

		// redo-undo
		const divRedoUndo = document.createElement('div');
		divRedoUndo.classList.add('redo-undo-box');

		let redoUndo = new RedoUndo(this.props.room);
		divRedoUndo.appendChild(redoUndo.render());
		divRealTimeBox.appendChild(divRedoUndo);

		// zoom-box
		const divZoomBox = document.createElement('div');
		divZoomBox.classList.add('zoom-controller-box');

		let zoomBox = new ZoomBox(this.props.room);
		divZoomBox.appendChild(zoomBox.render());
		divRealTimeBox.appendChild(divZoomBox);

		// pager
		const divPageBox = document.createElement('div');
		divPageBox.classList.add('page-controller-box');

		const divPageMidBox = document.createElement('div');
		divPageMidBox.classList.add('page-controller-mid-box');

		let pageBox = new PageBox(this.props.room);
		divPageMidBox.appendChild(pageBox.render());

		// page-preview
		const divPagePreview = document.createElement('div');
		divPagePreview.classList.add('page-preview-cell');

		const imgPagePreview = document.createElement('div');
		imgPagePreview.classList.add(icons.page.preview);

		divPagePreview.appendChild(imgPagePreview);
		divPageMidBox.appendChild(divPagePreview);

		divPageBox.appendChild(divPageMidBox);
		divRealTimeBox.appendChild(divPageBox);

		// white-board
		const divWhiteBoard = document.createElement('div');
		divWhiteBoard.classList.add('whiteboard-box');

		divRealTimeBox.appendChild(divWhiteBoard);

		root.appendChild(divRealTimeBox);

		this.props.room.bindHtmlElement(divWhiteBoard);
	}
}

window.WhiteBoard = Whiteboard;

export { Whiteboard };