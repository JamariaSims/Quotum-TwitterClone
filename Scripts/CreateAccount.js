let fireBaseURL = "https://connectx-1fd24-default-rtdb.firebaseio.com/";
let jsonEXT = ".json";
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const userData = {
		firstName: document.getElementById("firstName").value,
		lastName: document.getElementById("lastName").value,
		username: document.getElementById("username").value,
		password: document.getElementById("password").value,
		profileBio: "No bio yet....",
		profilePic: "../Assets/BlankProfilePicture.png",
	};
	userData.username = userData.username.toLowerCase();
	//Check if username is already taken
	if (
		containsInvalidChars(userData.firstName) ||
		containsInvalidChars(userData.lastName) ||
		containsInvalidChars(userData.username)
	) {
		return resetInputValues();
	}
	userData.username = "@" + userData.username;
	fetch(`${fireBaseURL}Users/${jsonEXT}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			for (const [key, USER] of Object.entries(data)) {
				if (USER.username === userData.username) {
					return resetInputValues();
				}
			}
			postToUsers(userData);
			postCurrentUser(userData);
		})
		.catch((err) => console.log(err));
});
function postToUsers(userData) {
	fetch(`${fireBaseURL}Users${jsonEXT}`, {
		method: "POST",
		body: JSON.stringify({
			firstName: userData.firstName,
			lastName: userData.lastName,
			username: userData.username,
			password: userData.password,
			profilePic: "../Assets/BlankProfilePicture.png",
			profileBio: "No bio yet....",
			followers: null,
			following: null,
		}),
	}).catch((err) => console.log(err));
}
function postCurrentUser(userData) {
	fetch(`${fireBaseURL}currentUser/${jsonEXT}`, {
		method: "PUT",
		body: JSON.stringify({
			username: userData.username,
			firstName: userData.firstName,
			lastName: userData.lastName,
			password: userData.password,
			profilePic: "../Assets/BlankProfilePicture.png",
			profileBio: "No bio yet....",
			followers: null,
			following: null,
		}),
	})
		.then(() => {
			window.location.replace("/Pages/MainFeed.html");
		})
		.catch((err) => console.log(err));
}
//Check for white spaces and special characters
function containsInvalidChars(data) {
	let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	return format.test(data);
}
const resetInputValues = () => {
	document.getElementById("firstName").value = "";
	document.getElementById("lastName").value = "";
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	document.getElementById("ERROR-Login").classList.remove("hide");
	setTimeout(() => {
		return document.getElementById("ERROR-Login").classList.add("hide");
	}, 4000);
};
