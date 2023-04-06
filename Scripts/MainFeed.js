const targetUser = getCurrentUser();
const currentPost = getPosts();
const logoutBtn = document.getElementById(`Btn-Logout`);
logoutBtn.addEventListener("click", (event) => {
	event.preventDefault();
	logoutUser();
	setTimeout(() => {
		window.location.replace("/Index.html");
	}, 1000);
});
let username = null;
let firstName = null;
let lastName = null;
let profileBio = null;
let profilePic = null;
let followers = null;
let following = null;
targetUser.then((res) => {
	username = res.username;
	firstName = res.firstName;
	lastName = res.lastName;
	profileBio = res.profileBio;
	profilePic = res.profilePic;
	followers = res.followers;
	following = res.following;
	document.getElementById("ProfileHeader").innerHTML = `
                <img
                src="../Assets/BlankProfilePicture.png"
                alt="Profile Picture"
                width="200px"
                />
                <h1 id="INPUT-name">${firstName} ${lastName}</h1>
                <p id="Username">${username}</p>
                <p>
        ${profileBio}
                </p>
                <section>
                <div>
                        <p>${following.length || 0}</p>
                        <p>Following</p>
                </div>
                <div>
                        <p>${followers.length || 0}</p>
                        <p>Followers</p>
                </div>
                </section>
                                `;
});
currentPost.then((res) => {
	for (post of res) {
		console.log(post);
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
								<p>${post.likes.length}</p>
							</div>
							<p>${post.comments.length} Comments</p>
						</div>

						<nav class="PostNav">
							<button>Comment</button>
							<button>Retweet</button>
							<button>Like</button>
						</nav>
					</div>
				</div>`;
	}
});
