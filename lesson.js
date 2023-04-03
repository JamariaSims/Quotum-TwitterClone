let fireBaseURL = "https://connectx-1fd24-default-rtdb.firebaseio.com/";
let jsonEXT = ".json";

//GET METHOD
function getData() {
	fetch(`${fireBaseURL}${jsonEXT}`)
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
}
//POST METHOD
function postData() {
	fetch(`${fireBaseURL}${jsonEXT}`, {
		method: "POST",
		body: JSON.stringify({
			username: "@JohnDoe",
			password: "12345",
		}),
	})
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
}
//DELETE METHOD
function deleteData(target) {
	fetch(`${fireBaseURL}${target}/${jsonEXT}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
}

//PATCH METHOD
function patchData(target) {
	fetch(`${fireBaseURL}${target}/${jsonEXT}`, {
		method: "PATCH",
		body: JSON.stringify({
			username: "@JohnDoe123",
		}),
	})
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
}

//PUT METHOD
function putData() {
	fetch(`${fireBaseURL}${jsonEXT}`, {
		method: "PUT",
		body: JSON.stringify({
			somethingUniques: {},
		}),
	});
}
