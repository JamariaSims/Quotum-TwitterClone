const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	for (element of formData) {
		onInputSubmit(element.name);
	}
});

function onInputSubmit(element) {
	return (usernameData[element] = document.getElementById(element).value);
}

//Check for white spaces and special characters
function containsInvalidChars(data) {
	let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	return format.test(data);
}
