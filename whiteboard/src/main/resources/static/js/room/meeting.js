var whiteWebSdk, room;

(() => {

	document.addEventListener('DOMContentLoaded', (event) => {
		whiteWebSdk = new WhiteWebSdk({
			appIdentifier: appIdentifier,
			region: "sg"
		});

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
	});

	document.on('click', '#imgClicker, #imgSelector, #imgPencil, #imgText, #imgEraser, #imgArrow, #imgLaserPointer, #imgHand', (event) => {
		const appliancename = event.target.dataset.appliancename;

		if (appliancename) {
			room.then(r => {
				r.setMemberState({
					currentApplianceName: appliancename,
					shapeType: "pentagram",
					strokeColor: [255, 182, 200],
					strokeWidth: 12,
					textSize: 40,
				});
				return r;
			});
		}
	});

	document.on('click', '#imgClear', (event) => {
		room.then(r => {
			r.cleanCurrentScene();
			return r;
		});
	});

	document.on('mouseover', '.tool-box-cell-subscript', (event) => {
		console.log(event.target);
	});

	document.on('mouseout', '.tool-box-cell-subscript', (event) => {
		console.log(event.target);
	});

	document.on('mouseover', 'img', (event) => {
		const hover = event.target.dataset.hover;

		if (hover) {
			event.target.src = hover;
		}
	});

	document.on('mouseout', 'img', (event) => {
		const hout = event.target.dataset.hout;

		if (hout) {
			event.target.src = hout;
		}
	});
})();