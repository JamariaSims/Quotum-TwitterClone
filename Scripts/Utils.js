let fireBaseURL = "https://connectx-1fd24-default-rtdb.firebaseio.com/";
let jsonEXT = ".json";

const formData = ["firstName", "lastName", "username", "password"];
let currentUser = {
	username: "",
	firstName: "",
	lastName: "",
	password: "",
	profilePic: "../Assets/BlankProfilePicture.png",
};
async function getCurrentUser() {
	const response = await fetch(`${fireBaseURL}currentUser/${jsonEXT}`);
	const jsonData = await response.json();
	currentUser.username = jsonData.username;
	currentUser.firstName = jsonData.firstName;
	currentUser.lastName = jsonData.lastName;
	currentUser.password = jsonData.password;
	currentUser.profilePic = jsonData.profilePic;
	console.log(currentUser);
}

//Checking if user exist
async function attemptLogin(username, password) {
	const response = await fetch(`${fireBaseURL}Users/${username}${jsonEXT}`);
	const jsonData = await response.json();
	if (password === jsonData.password) {
		console.log(jsonData);
		fetch(`${fireBaseURL}currentUser/${jsonEXT}`, {
			method: "PUT",
			body: JSON.stringify({
				username: username,
				firstName: jsonData.firstName,
				lastName: jsonData.lastName,
				password: jsonData.password,
				profilePic: jsonData.profilePic,
			}),
		});
		window.location.replace("/Pages/MainFeed.html");
	} else {
		console.log("Error!");
	}
}

