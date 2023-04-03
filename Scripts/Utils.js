let fireBaseURL = "https://connectx-1fd24-default-rtdb.firebaseio.com/";
let jsonEXT = ".json";

//Checking if user exist
async function attemptLogin(username, password) {
	const response = await fetch(`${fireBaseURL}Users/${username}${jsonEXT}`);
	const jsonData = await response.json();
	return checkPassword(password, jsonData || "");
}
