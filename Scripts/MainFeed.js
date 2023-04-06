let fireBaseURL = "https://connectx-1fd24-default-rtdb.firebaseio.com/";
let jsonEXT = ".json";
const formData = ["firstName", "lastName", "username", "password"];

//SET CURRENT USER
let currentUser = {
	username: "",
	firstName: "",
	lastName: "",
};
fetch(`${fireBaseURL}currentUser/${jsonEXT}`)
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		currentUser["username"] = data.username;
		currentUser["firstName"] = data.firstName;
		currentUser["lastName"] = data.lastName;
	});
//LOGOUT
const logoutBtn = document.getElementById(`Btn-Logout`);
logoutBtn.addEventListener("click", (event) => {
	event.preventDefault();
	fetch(`${fireBaseURL}currentUser/${jsonEXT}`, {
		method: "PUT",
		body: JSON.stringify({
			username: "",
			firstName: "",
			lastName: "",
			password: "",
			profilePic: "",
		}),
	}).then(() => {
		window.location.replace("/Index.html");
	});
});
//HEADER
fetch(`${fireBaseURL}currentUser/${jsonEXT}`)
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		document.getElementById("ProfileHeader").innerHTML = `
                <img
                src="../Assets/BlankProfilePicture.png"
                alt="Profile Picture"
                width="200px"
                />
                <h1 id="INPUT-name">${data.firstName} ${data.lastName}</h1>
                <p id="Username">${data.username}</p>
                <p>
        ${data.profileBio}
                </p>
                <section>
                <div>
                        <p>${data.following.length || 0}</p>
                        <p>Following</p>
                </div>
                <div>
                        <p>${data.followers.length || 0}</p>
                        <p>Followers</p>
                </div>
                </section>
                                `;
	});
//DISPLAY POSTS
displayPosts();
function displayPosts() {
	document.getElementById("PostsContainer").innerHTML = ``;
	fetch(`${fireBaseURL}Posts/${jsonEXT}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (!data) {
				return;
			}
			Object.values(data).forEach((post) => {
				document.getElementById(
					"PostsContainer"
				).innerHTML += `<div class="PostContainer">
                        <img
                                src="../Assets/BlankProfilePicture.png"
                                alt="Profile Picture"
                                width="78px"
                                class="PostPic"
                        />
                        <div class="StatusInfo">
                                <div class="HeaderInfo">
                                        <h2>${post.firstName} ${
					post.lastName
				}</h2>
                                        <p>${post.createdBy}</p>
                                </div>
                                <p class="PostCreated">${post.timeStamp}</p>
                                <p class="PostText">
                ${post.post}
                                </p>
                                <div class="PostActions">
                                        <div class="PostLikes">
                                                <img
                                                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                                        alt="Profile Picture"
                                                        width="78px"
                                                />
                                                <img
                                                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                                        alt="Profile Picture"
                                                        width="78px"
                                                />
                                                <p>${
																									post.likes
																										? post.likes.length
																										: 0
																								} Likes</p>
                                        </div>
                                        <p>${
																					post.comments
																						? post.comments.length
																						: 0
																				} Comments</p>
                                </div>
                
                                <nav class="PostNav">
                                        <button>Comment</button>
                                        <button>Retweet</button>
                                        <button>Like</button>
                                </nav>
                        </div>
                </div>`;
			});
		});
}

//POST TWEETS
function addPost(event) {
	event.preventDefault();
	const statusCreateBtn = document.getElementById("BTN-postStatus");
	event.preventDefault();
	const currentTime = `${new Date().toUTCString()}`;
	fetch(`${fireBaseURL}Posts/${jsonEXT}`, {
		method: "POST",
		body: JSON.stringify({
			firstName: currentUser["firstName"],
			lastName: currentUser["lastName"],
			createdBy: currentUser["username"],
			timeStamp: currentTime,
			post: statusCreateBtn.value,
		}),
	});
	statusCreateBtn.value = "";
	displayPosts();
}
