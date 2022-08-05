var whiteWebSdk, room;

(() => {

	document.addEventListener('DOMContentLoaded', (event) => {
		whiteWebSdk = new WhiteWebSdk({
			appIdentifier: appIdentifier,
			region: "sg"
		});

		/** 
		room = whiteWebSdk.joinRoom({
			'uuid': uuid,
			'uid': 'gregor77kr',
			'roomToken': roomToken
		}).then((room) => {
			room.bindHtmlElement(document.querySelector("#whiteboard"));
			return room;
		}).catch((error) => {
			console.error(error);
		});
		*/

	});

	document.on('click', 'img', (event) => {
		console.log(event.target);
	});

	document.on('onmouseover', 'img', (event) => {
		console.log(event.target);
		console.log(this);
	});
	
	document.on('onmouseout', 'img', (event) => {
		console.log(event.target);
		console.log(this);
	});
})();