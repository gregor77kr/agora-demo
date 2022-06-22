(function() {
	window.onload = function() {
		let btnSignup = document.querySelector("#btnSignup");
		if (document.body.contains(btnSignup)) {
			btnSignup.addEventListener('click', function() {
				location.href = utils.getContextPath() + '/security/signup/form';
			});
		}
	};
}());