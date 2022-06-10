document.querySelector('#btnCreateRoom').addEventListener('click', function(event) {
	createRoom();
});

/**
 * string Required accessKey : The Access Key(AK)
 * string Required secretAccessKey : The Secret Key (SK)
 * integer Required lifespan : The token validity period (milliseconds). If you set it to 0, the token is permanently valid
 * string Required role : admin, writer, reader. see overview : https://docs.agora.io/en/whiteboard/whiteboard_token_overview?platform=RESTful#introduction
 */
function getToken() {
	let option = {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
			"region": "sg"
		}, body: JSON.stringify({
			'accessKey': '',
			'secretAccessKey': '',
			'lifespan': 1 * 1000,
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
function createRoom() {
	let option = {
		"method": "POST",
		"headers": {
			"token": "your token",
			"Content-Type": "application/json",
			"region": "sg"
		}, body: JSON.stringify({
			"isRecord": false
		})
	}

	let request = new Request('https://api.netless.link/v5/rooms', option);
	let response = httpUtil.fetch(request).catch(httpUtil.handleError);
	return response;
}