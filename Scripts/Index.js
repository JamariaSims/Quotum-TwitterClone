const form = document.getElementById("Form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	attemptLogin(`@${username}`, password);
});
const formValidation = (username, password) => {
	username = username.toLowerCase();
	if (containsInvalidChars(username)) {
		console.log("Username cannot contain spaces or special characters!");
		return;
	}
	if (isNotCorrectLength(username)) {
		console.log("Username must be at least 7 characters long");
		return;
	}
	// Next Step - Send off API call
	attemptLogin(`@${username}`, password);
};
//Check if password is valid
function checkPassword(password, data) {
	// If password is less than 7 characters long
	if (isNotCorrectLength(password)) {
		console.log("Password must be at least 7 characters long");
		return;
	}
	//If password contains spaces
	if (password.includes(`/^\s+|\s+$/gm, ""`)) {
		console.log("Password cannot contain spaces!");
		return;
	}
	if (!data || password !== data.password) {
		console.log("Username or password is incorrect!");
		return;
	}
	console.log("Logging In.............");
	window.location.replace("/Pages/MainFeed.html");
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
