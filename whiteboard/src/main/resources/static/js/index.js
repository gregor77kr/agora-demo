var whiteWebSdk = new WhiteWebSdk({
	'appIdentifier': ''
});

document.querySelector('#btnCreateRoom').addEventListener('click', function(event) {
	createRoom();
});

function createRoom() {
	let option = {
		"method": "POST",
		"headers": {
			"token": "Your SDK Token",
			"Content-Type": "application/json",
			"region": "us-sv"
		}, body: JSON.stringify({
			"isRecord": false
		})
	}

	let request = new Request('https://api.netless.link/v5/rooms', option);
	let response = httpUtil.fetch(request).catch(httpUtil.handleError);
	return response;
}