let fireBaseURL = "https://connectx-1fd24-default-rtdb.firebaseio.com/";
let jsonEXT = ".json";
const formData = ["firstName", "lastName", "username", "password"];

const form = document.getElementById("Form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const username =
		"@" + document.getElementById("username").value.toLowerCase();
	const password = document.getElementById("password").value;
	fetch(`${fireBaseURL}Users/${username}${jsonEXT}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (data.password !== password) {
				resetInputValues();
			}
			fetch(`${fireBaseURL}currentUser/${jsonEXT}`, {
				method: "PUT",
				body: JSON.stringify({
					username: username,
					firstName: data.firstName,
					lastName: data.lastName,
					password: data.password,
					profilePic: data.profilePic,
					profileBio: data.profileBio,
					followers: data.followers,
					following: data.following,
				}),
			})
				.then((res) => {
					return res.json;
				})
				.then(() => {
					window.location.replace("/Pages/MainFeed.html");
				});
		})
		.catch((err) => {
			resetInputValues();
		});
});

const resetInputValues = () => {
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	return document.getElementById("ERROR-Login").classList.remove("hide");
};
