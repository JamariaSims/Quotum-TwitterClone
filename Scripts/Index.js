let fireBaseURL = "https://connectx-1fd24-default-rtdb.firebaseio.com/";
let jsonEXT = ".json";

const form = document.getElementById("Form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const username =
		"@" + document.getElementById("username").value.toLowerCase();
	const password = document.getElementById("password").value;
	fetch(`${fireBaseURL}Users/${jsonEXT}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			for (const [key, USER] of Object.entries(data)) {
				if (USER.username === username && USER.password === password) {
					fetch(`${fireBaseURL}currentUser/${jsonEXT}`, {
						method: "PUT",
						body: JSON.stringify({
							username: USER.username,
							firstName: USER.firstName,
							lastName: USER.lastName,
							password: USER.password,
							profilePic: USER.profilePic,
							profileBio: USER.profileBio,
							followers: USER.followers || null,
							following: USER.following || null,
						}),
					})
						.then((res) => {
							return res.json;
						})
						.then(() => {
							window.location.replace("/Pages/MainFeed.html");
						})
						.catch((err) => console.log(err));
				}
				resetInputValues();
			}
		});
});
const resetInputValues = () => {
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";
	return document.getElementById("ERROR-Login").classList.remove("hide");
};
