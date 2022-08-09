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
		} else {
			event.target.dataset.toggle = 'true';
			event.target.src = hover;
			divPallet.classList.remove('ant-popover-hidden');
		}

		const absoulteLeft = clientRect.left + event.target.clientWidth + 5;
		const absoluteTop = clientRect.top + pageYOffset - (divPallet.clientHeight / 2);

		divPallet.style.left = absoulteLeft + 'px';
		divPallet.style.top = absoluteTop + 'px';
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

})();