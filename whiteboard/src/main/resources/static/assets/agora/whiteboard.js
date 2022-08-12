import { } from './utils/utils.js';
import { ZoomBox } from './zoom-box/zoom.js';
import { ToolBox } from './tool-box/tool.js';

(() => {
	document.addEventListener('DOMContentLoaded', (event) => {
		joinRoom().then(r => {
			window.room = r;
			r.bindHtmlElement(document.querySelector("#whiteboard"));
			return r;
		}).then(r => {

			let zoomBox = new ZoomBox(r);
			zoomBox.render();

			let toolBox = new ToolBox(r);
			toolBox.render();
		});
	});

	document.on('click', '#imgColorSubscript', (event) => {
		// img color의 상대위치
		const clientRect = event.target.getBoundingClientRect();
		const divPallet = document.querySelector('#divPallet');

		const isActive = event.target.dataset.toggle;
		const hover = event.target.dataset.hover;
		const hout = event.target.dataset.hout;

		if (isActive === 'true') {
			event.target.dataset.toggle = 'false';
			event.target.src = hout;
			divPallet.classList.add('ant-popover-hidden');
			divPallet.style.pointerEvents = 'none';
		} else {
			event.target.dataset.toggle = 'true';
			event.target.src = hover;
			divPallet.classList.remove('ant-popover-hidden');
			divPallet.style.pointerEvents = 'auto';
		}

		const absoulteLeft = clientRect.left + event.target.clientWidth + 5;
		const absoluteTop = clientRect.top + pageYOffset - (divPallet.clientHeight / 2);

		divPallet.style.left = absoulteLeft + 'px';
		divPallet.style.top = absoluteTop + 'px';
	});

	document.on('click', '.cell-color', (event) => {
		const colors = document.querySelectorAll('.cell-mid-color');
		colors.forEach((color, i) => {
			color.style.borderColor = 'rgb(255, 255, 255)';
		});

		event.target.parentElement.style.borderColor = 'rgb(0, 0, 0)';

		let selectedColor = event.target.style.backgroundColor || 'rgb(255, 255, 255)';
		const divColor = document.querySelector('#divColor');
		divColor.style.backgroundColor = selectedColor;

		selectedColor = selectedColor.replace(/ /g, '').replace('rgb(', '').replace(')', '').split(',').map(s => Number(s));

		room.setMemberState({
			strokeColor: selectedColor
		});
	});

	document.on('click', '.tool-box-cell>img:not(.tool-box-cell-subscript)', (event) => {
		const tools = document.querySelectorAll('.tool-box-cell>img');
		tools.forEach((tool, i) => {
			const hout = tool.dataset.hout;

			if (hout) {
				tool.src = hout;
			}
		});

		const hover = event.target.dataset.hover;
		if (hover) {
			event.target.src = hover;
		}
	});

	function joinRoom() {
		window.whiteWebSdk = new WhiteWebSdk({
			appIdentifier: appIdentifier,
			region: "sg"
		});

		return whiteWebSdk.joinRoom({
			'uuid': uuid,
			'uid': 'gregor77kr',
			'roomToken': roomToken
		}).catch((error) => {
			console.error(error);
		});
	}

})();