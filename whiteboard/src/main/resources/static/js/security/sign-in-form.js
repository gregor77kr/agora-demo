(function() {
	window.onload = function() {
		let btnSignup = document.querySelector("#btnSignup");
		btnSignup && btnSignup.addEventListener('click', (event) => {
			location.href = btnSignup.dataset.href;
		});
	};
}());