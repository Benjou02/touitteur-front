const rootApi = "https://f183b36f-c995-443f-81e8-b88a198d5c8c-00-1qyrp99z3857o.picard.replit.dev/"

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