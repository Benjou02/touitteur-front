const rootApi = "https://touitteur-back.onrender.com/"

function updateAllUsers() {
  fetch(rootApi + "user/getAll")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let userDDL = document.getElementById("userDDL");
      for (let i = 0; i < data.users.length; i++) {
        let user = document.createElement("option");
        user.textContent = data.users[i];
        userDDL.appendChild(user);
      };
    });
}

updateAllUsers();