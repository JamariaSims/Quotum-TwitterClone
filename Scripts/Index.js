const form = document.getElementById("Form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	formValidation(username, password);
});
const formValidation = (username, password) => {
	// If username is less than 7 characters long
	if (username.length < 7) {
		console.log("Username must be at least 7 characters long");
		return;
	}
	// If password is less than 7 characters long
	else if (password.length < 7) {
		console.log("Password must be at least 7 characters long");
		return;
	}
	// Next Step - Send off API call
	attemptLogin(`@${username}`, password);
};

//Checking if user exist
async function attemptLogin(username, password) {
	const response = await fetch(`${fireBaseURL}${username}${jsonEXT}`);
	const jsonData = (await response.json()) || null;
	return checkPassword(password, jsonData);
}
//Check if password is valid
function checkPassword(password, data) {
	if (!data || password !== data.password) {
		console.log("Username or password is incorrect!");
		return;
	}
	console.log("Logging In.............");
	window.location.replace("/Pages/MainFeed.html");
}
