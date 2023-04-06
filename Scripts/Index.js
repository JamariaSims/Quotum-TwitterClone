const form = document.getElementById("Form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const username = "@" + document.getElementById("username").value;
	const password = document.getElementById("password").value;
	fetch(`${fireBaseURL}Users/${username}${jsonEXT}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log(data);
			if (data.password !== password) {
				console.log("wrong password!");
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
		});
});
