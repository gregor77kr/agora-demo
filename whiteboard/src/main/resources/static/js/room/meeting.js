(() => {
	let whiteWebSdk, room;

	document.addEventListener('DOMContentLoaded', (event) => {
		room = getRoomInfo().then(data => {
			whiteWebSdk = new WhiteWebSdk({
				appIdentifier: data.appIdentifier,
				region: "sg"
			});

			return whiteWebSdk.joinRoom({
				'uuid': data.uuid,
				'uid': crypto.randomUUID(),
				'roomToken': data.roomToken
			}).then((room) => {
				room.bindHtmlElement(document.querySelector("#whiteboard"));

				// Define a toolbar and buttons.
				var toolbar = document.querySelector("#toolbar");
				var toolNames = ["pencil", "clicker", "selector", "rectangle", "eraser", "text", "arrow", "ellipse", "hand", "laserPointer", "shape", "straight"];

				toolNames.forEach((toolName, i) => {
					let btn = document.createElement("button");
					btn.setAttribute("id", "btn" + toolName);

					let text = document.createTextNode(toolName);
					btn.appendChild(text);

					// Listen for the event of clicking a button.
					btn.addEventListener("click", function(obj) {
						let ele = obj.target;
						// Call the setMemberState method to set the whiteboard tool.
						room.setMemberState(
							{
								currentApplianceName: ele.getAttribute("id").substring(3),
								shapeType: "pentagram",
								strokeColor: [255, 182, 200],
								strokeWidth: 12,
								textSize: 40,
							});
					});
					toolbar.appendChild(btn);
				});

				return room;
			}).catch((error) => {
				console.error(error);
			});
		}).catch((error) => {
			alert(error);
		});
	});

	async function getRoomInfo() {
		let option = {
			'method': 'GET',
			'headers': {
				'Content-Type': 'application/json',
			}
		};

		let url = "/room/info?" + new URLSearchParams({
			'uuid': document.querySelector('#txUuid').value
		});

		let request = new Request(url, option);
		let response = await fetch(request);
		let json = await response.json();

		return json;
	}
})();