let fireBaseURL = "https://connectx-1fd24-default-rtdb.firebaseio.com/";
let jsonEXT = ".json";
//FETCHING CURRENT USER
let currentUser = {};
fetch(`${fireBaseURL}currentUser/${jsonEXT}`)
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		currentUser.firstName = data.firstName;
		currentUser.lastName = data.lastName;
		currentUser.username = data.username;
		currentUser.profilePic = data.profilePic;
		console.log(currentUser);
		//PROFILE HEADER
		document.getElementById("ProfileHeader").innerHTML = `
			<img
			src=${data.profilePic}
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
				<p>${data.following ? data.following.length : 0}</p>
				<p>Following</p>
			</div>
			<div>
				<p>${data.followers ? data.followers.length : 0}</p>
				<p>Followers</p>
			</div>
			</section>
					`;
		document.getElementById("Post-StatusForm").innerHTML += `				<img
		src="${data.profilePic}"
		alt="Profile Picture"
		width="78px"
	/>
	<div>
		<input
			id="BTN-postStatus"
			type="text"
			placeholder="What's on your mind?"
		/>
		<nav>
			<div>
				<button>Photo</button>
				<button>Video</button>
			</div>
			<button onclick="addPost(event,currentUser)" type="button">
				Connect
			</button>
		</nav>
	</div>`;
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
			for (const [key, post] of Object.entries(data)) {
				document.getElementById("PostsContainer").innerHTML += `
				<div class="flex-down">
				<div class="PostContainer" id=${key}>
				<img
					src="${post.profilePic}"
					alt="Profile Picture"
					width="78px"
					class="PostPic"
				/>
				<div class="StatusInfo">
					<div class="HeaderInfo">
						<h2>${post.firstName} ${post.lastName}</h2>
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
							<p>${post.likes ? post.likes.length : 0} Likes</p>
						</div>
						<p>${post.comments ? post.comments.length : 0} Comments</p>
					</div>
			
					<nav class="PostNav">
						<button>Comment</button>
						<button>Retweet</button>
						<button>Like</button>
					</nav>
					${
						currentUser.username === post.createdBy
							? `				<nav>
					<button id="BTN-Edit" name=${key} onClick=editPost(event)>Edit</button>
					<button id="BTN-Delete" name=${key} onClick=deletePost(event)>Delete</button>
					</nav>`
							: `<div></div>`
					}
	
				</div>
			</div>

			<div class="PostEditContainer hide" id=PostEditContainer${key}>
			<img
				src="../Assets/BlankProfilePicture.png"
				alt="Profile Picture"
				width="78px"
				class="PostPic"
			/>
			<div class="StatusInfo">
				<div class="HeaderInfo">
					<h2>${post.firstName} ${post.lastName}</h2>
					<p>${post.createdBy}</p>
				</div>
				<input
				id="BTN-postStatusEdit${key}"
				type="text"
				value="${post.post}"
			/>
				<nav class="PostNav">
					<button id="BTN-postCancelEdit${key}" name="${key}" onClick="cancelEdit(event)">Cancel</button>
					<button id="BTN-postSaveEdit${key}" name="${key}" onClick="saveEdit(event)">Save</button>
				</nav>
			</div>
		</div>
			</div>`;
			}
		});
}

//POST TWEETS
function addPost(event) {
	event.preventDefault();
	const statusCreateBtn = document.getElementById("BTN-postStatus");
	const currentTime = `${new Date().toUTCString()}`;
	fetch(`${fireBaseURL}Posts/${jsonEXT}`, {
		method: "POST",
		body: JSON.stringify({
			firstName: currentUser["firstName"],
			lastName: currentUser["lastName"],
			createdBy: currentUser["username"],
			profilePic: currentUser["profilePic"],
			timeStamp: currentTime,
			post: statusCreateBtn.value,
		}),
	}).then(() => {
		statusCreateBtn.value = "";
		displayPosts();
	});
}
//DELETE TWEET
function deletePost(event, key) {
	event.preventDefault();
	fetch(`${fireBaseURL}Posts/${event.target.name}/${jsonEXT}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((data) => {
			displayPosts();
		});
}
//EDIT TWEET
function editPost(event) {
	event.preventDefault();
	const currentEditPost = document.getElementById(
		`PostEditContainer${event.target.name}`
	);
	currentEditPost.classList.toggle("hide");
}

function saveEdit(event) {
	event.preventDefault();
	const currentPost = document.getElementById(
		`BTN-postStatusEdit${event.target.name}`
	);
	const currentTime = `${new Date().toUTCString()}`;
	fetch(`${fireBaseURL}Posts/${event.target.name}/${jsonEXT}`, {
		method: "PATCH",
		body: JSON.stringify({
			post: currentPost.value,
			timeStamp: currentTime,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			displayPosts();
		})
		.catch((err) => console.log(err));
}
function cancelEdit(event) {
	event.preventDefault();
	const currentEditPost = document.getElementById(
		`PostEditContainer${event.target.name}`
	);
	currentEditPost.classList.toggle("hide");
}
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
