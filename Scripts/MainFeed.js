getCurrentUser();
setTimeout(() => {
	const logoutBtn = document.getElementById(`Btn-Logout`);
	logoutBtn.addEventListener("click", (event) => {
		event.preventDefault();
		logoutUser();
		setTimeout(() => {
			window.location.replace("/Index.html");
		}, 1000);
	});
	const {
		username,
		firstName,
		lastName,
		profileBio,
		profilePic,
		followers,
		following,
	} = currentUser;
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
}, 500);
