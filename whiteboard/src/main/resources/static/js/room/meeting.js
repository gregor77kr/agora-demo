var whiteWebSdk, room;

(() => {

	document.addEventListener('DOMContentLoaded', (event) => {

		whiteWebSdk = new WhiteWebSdk({
			appIdentifier: appIdentifier,
			region: "sg"
		});

		room = whiteWebSdk.joinRoom({
			'uuid': uuid,
			'uid': crypto.randomUUID(),
			'roomToken': roomToken
		}).then((room) => {
			room.bindHtmlElement(document.querySelector("#whiteboard"));
			return room;
		}).catch((error) => {
			console.error(error);
		});

	});
	
})();