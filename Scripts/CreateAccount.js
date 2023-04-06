let fireBaseURL = "https://connectx-1fd24-default-rtdb.firebaseio.com/";
let jsonEXT = ".json";
const formData = ["firstName", "lastName", "username", "password"];

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
// Check If length is less than 7 characters long
function isNotCorrectLength(data) {
	return data.length < 7;
}
