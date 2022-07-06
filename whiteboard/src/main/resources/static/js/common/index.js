var whiteWebSdk = new WhiteWebSdk({
	appIdentifier: properties.appIdentifier,
	region: "sg"
});

document.querySelector('#btnGetToken').addEventListener('click', function(event) {
	getToken()
		.then(response => {
			document.querySelector('#areaToken').value = response;
			return response;
		});
});

document.querySelector('#btnCreateRoom').addEventListener('click', function(event) {
	let token = document.querySelector('#areaToken').value;

	createRoom(token)
		.then(response => {
			addRoom(response);
			return response;
		});
});

document.querySelector('#tbRoom .btn-token').addEventListener('click', function(event) {
	var tbRoom = document.querySelector('#tbRoom');
	let uuid = tbRoom.rows[0].cells[1].innerHTML;

	getRoomToken(uuid)
		.then(response => {
			tbRoom.rows[0].cells[2].innerHTML = response;
			alert('room token is generated :\n' + response.substr(0, 15) + '...');
			return response;
		});
});

document.querySelector('#tbRoom .btn-join').addEventListener('click', function(event) {
	var tbRoom = document.querySelector('#tbRoom');
	let uuid = tbRoom.rows[0].cells[1].innerHTML;
	let roomToken = tbRoom.rows[0].cells[2].innerHTML;

	let option = {
		'uuid': uuid,
		'uid': 'gregor77kr',
		'roomToken': roomToken
	};

	whiteWebSdk.joinRoom(option).then(function(room) {
		console.log(room);
		room.bindHtmlElement(document.querySelector("#whiteBoard"));
	}).catch(function(err) {
		console.error(err);
	});
});

/**
 * string Required accessKey : The Access Key(AK)
 * string Required secretAccessKey : The Secret Key (SK)
 * integer Required lifespan : The token validity period (milliseconds). If you set it to 0, the token is permanently valid
 * string Required role : admin, writer, reader. see overview : https://docs.agora.io/en/whiteboard/whiteboard_token_overview?platform=RESTful#introduction
 */
function getToken() {
	let option = {
		'method': 'POST',
		'headers': {
			'Content-Type': 'application/json',
			'region': 'sg'
		}, body: JSON.stringify({
			'accessKey': properties.accessKey,
			'secretAccessKey': properties.secretAccessKey,
			'lifespan': 600 * 1000,
			'role': 'admin'
		})
	};

	let request = new Request('https://api.netless.link/v5/tokens/teams', option);
	let response = httpUtil.fetch(request).catch(httpUtil.handleError);
	return response;
}

/**
 * string Required token : The SDK token
 * string Required region : Specifies a data center to process the request
 */
function createRoom(token) {
	let option = {
		'method': 'POST',
		'headers': {
			'token': token,
			'Content-Type': 'application/json',
			'region': 'sg'
		}, body: JSON.stringify({
			'isRecord': false
		})
	};

	let request = new Request('https://api.netless.link/v5/rooms', option);
	let response = httpUtil.fetch(request).catch(httpUtil.handleError);
	return response;
}

function getRoomToken(uuid) {
	let option = {
		'method': 'POST',
		'headers': {
			'token': document.querySelector('#areaToken').value,
			'Content-Type': 'application/json',
			'region': 'sg'
		}, body: JSON.stringify({
			'lifespan': 600 * 1000,
			'role': 'admin'
		})
	};

	let request = new Request('https://api.netless.link/v5/tokens/rooms/' + uuid, option);
	let response = httpUtil.fetch(request).catch(httpUtil.handleError);
	return response;
}

function getRoomList() {
	let option = {
		'method': 'GET',
		'headers': {
			'Content-Type': 'application/json',
			'token': '',
			'region': 'sg'
		}
	};

	let request = new Request('https://api.netless.link/v5/rooms', option);
	let response = httpUtil.fetch(request).catch(httpUtil.handleError);
	response
		.then(data => console.log(data));
	return response;
}

function getRoomState() {
	let uuid = tbRoom.rows[0].cells[1].innerHTML;

	let option = {
		'method': 'GET',
		'headers': {
			'token': document.querySelector('#areaToken').value,
			'Content-Type': 'application/json',
			'region': 'sg'
		}
	};

	let request = new Request('https://api.netless.link/v5/rooms/' + uuid, option);
	let response = httpUtil.fetch(request).catch(httpUtil.handleError);
	response
		.then(data => console.log(data));
	return response;
}

function disableRoom(uuid) {
	let option = {
		'method': 'PATCH',
		'headers': {
			'Content-Type': 'application/json',
			'token': '',
			'region': 'sg'
		},
		'body': JSON.stringify({
			'isBan': true
		})
	};

	let request = new Request('https://api.netless.link/v5/rooms/' + uuid, option);
	let response = httpUtil.fetch(request).catch(httpUtil.handleError);
	return response;
}

/**
 * response
 * appUUID The unique identifier of the whiteboard project.
 * createdAt
 * isBan
 * isRecord
 * limit he maximum number of users with a writer or admin token who can be in the room at the same time. If you set it to 0, there is no maximum.
 * teamUUID The unique identifier of the Agora Console account that creates the whiteboard project.
 * uuid The room UUID, which is the unique identifier of a room.
 */
function addRoom(response) {
	let tbRoom = document.querySelector('#tbRoom');
	//let insertedRow = tbRoom.insertRow(-1);

	tbRoom.rows[0].cells[0].innerHTML = response.createdAt;
	tbRoom.rows[0].cells[1].innerHTML = response.uuid;
}