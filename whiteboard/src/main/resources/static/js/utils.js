var httpUtil = (function() {
	async function _fetch(request) {
		const response = await fetch(request);
		const json = await response.json();

		if (response.ok) {
			return json;
		}

		const error = new Error();
		error.name = response.status;
		error.message = 'code : ' + json.error.code + ', title : ' + json.error.title;
		throw error;
	}

	function handleError(error) {
		alert(error);
	}

	return {
		fetch: _fetch,
		handleError: handleError
	};
}());
