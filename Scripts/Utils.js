let fireBaseURL = "https://connectx-1fd24-default-rtdb.firebaseio.com/";
let jsonEXT = ".json";

const formData = ["firstName", "lastName", "username", "password"];
let currentUser = {};
async function getCurrentUser() {
	const response = await fetch(`${fireBaseURL}currentUser/${jsonEXT}`);
	const jsonData = await response.json();
	currentUser.username = jsonData.username;
	currentUser.firstName = jsonData.firstName;
	currentUser.lastName = jsonData.lastName;
	currentUser.password = jsonData.password;
	currentUser.profilePic = jsonData.profilePic;
	currentUser.profileBio = jsonData.profileBio || "No bio";
	currentUser.following = jsonData.following;
	currentUser.followers = jsonData.followers;
	console.log(currentUser);
	console.log(jsonData);
}
//Checking if user exist
async function attemptLogin(username, password) {
	console.log(`${fireBaseURL}Users/${username}${jsonEXT}`);
	const response = await fetch(`${fireBaseURL}Users/${username}${jsonEXT}`);
	const jsonData = await response.json();
	if (password === jsonData.password) {
		changeUser(username, jsonData);
		setTimeout(() => {
			loginUser(jsonData);
		}, 1000);
	} else {
		console.log("Error!");
		console.log(password, jsonData.password);
	}
}
async function changeUser(username, jsonData) {
	await fetch(`${fireBaseURL}currentUser/${jsonEXT}`, {
		method: "PUT",
		body: JSON.stringify({
			username: username,
			firstName: jsonData.firstName,
			lastName: jsonData.lastName,
			password: jsonData.password,
			profilePic: jsonData.profilePic,
			profileBio: jsonData.profileBio,
			followers: jsonData.followers,
			following: jsonData.following,
		}),
	});
}
async function loginUser() {
	window.location.replace("/Pages/MainFeed.html");
}
async function logoutUser() {
	fetch(`${fireBaseURL}currentUser/${jsonEXT}`, {
		method: "PUT",
		body: JSON.stringify({
			username: "",
			firstName: "",
			lastName: "",
			password: "",
			profilePic: "",
		}),
	});
}
