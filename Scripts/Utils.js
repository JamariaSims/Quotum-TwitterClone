let fireBaseURL = "https://connectx-1fd24-default-rtdb.firebaseio.com/";
let jsonEXT = ".json";
const formData = ["firstName", "lastName", "username", "password"];

//Checking if user exist
async function attemptLogin(username, password) {
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



