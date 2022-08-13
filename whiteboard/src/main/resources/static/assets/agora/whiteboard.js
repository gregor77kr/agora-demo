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
			
			return r;
		});
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