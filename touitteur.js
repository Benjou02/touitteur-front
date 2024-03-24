const rootApi = "https://touitteur-back.onrender.com/"

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get("newUser") ? urlParams.get("newUser") : urlParams.get("userDDL");

if (!user) {
  window.location.href = "index.html";
} else {
  fetch(rootApi + "user/post/" + user)
    .catch(function(error) {
      console.error('Erreur lors de la création du nouvel utilisateur :', error);
    });
  let username = document.getElementById("username");
  username.textContent = user;
  updateAllMessages();
}

function checkForNewMessages() {
  fetch(rootApi + "msg/nber")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let msgList = document.getElementById("msgsList");
      if (msgList.children.length !== data.nber) {
        updateAllMessages();
      }
    })
    .catch(function(error) {
      console.error('Erreur lors de la vérification des nouveaux messages :', error);
    });
}

setInterval(checkForNewMessages, 10000);

function createMessage(message, index) {
  let msg = document.createElement("li");

  if (message) {
    let author = document.createElement("strong");
    author.textContent = message[0];
    msg.appendChild(author);
    msg.appendChild(document.createElement("br"));
    let messageText = document.createElement("span");
    messageText.textContent = message[1];
    msg.appendChild(messageText);
    if (message[0] === user) {
      msg.classList.add("userMessage");
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "🗑️";
      deleteButton.addEventListener("click", function() {
        deleteMessage(index);
      });
      deleteButton.classList.add("deleteButton");
      messageText.classList.add("userMessageSpan");
      messageText.appendChild(deleteButton);
    }
  } else {
    let deletedMessage = document.createElement("span");
    deletedMessage.textContent = "Message supprimé";
    msg.appendChild(deletedMessage);
    msg.classList.add("deletedMessage");
  }
  return msg;
}

function deleteMessage(index) {
  fetch(rootApi + "msg/del/" + index)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      updateAllMessages();
    })
    .catch(function(error) {
      console.error('Erreur lors de la suppression du message :', error);
    });;
}

function postNewMessage(message) {
  fetch(rootApi + "msg/post?user=" + user + "&msg=" + message)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      updateAllMessages();
    })
    .catch(function(error) {
      console.error('Erreur lors de la publication du message :', error);
    });;
}

function updateAllMessages() {
  fetch(rootApi + "msg/getAll")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let msgList = document.getElementById("msgsList");
      msgList.textContent = "";
      for (let i = 0; i < data.msgs.length; i++) {
        msgList.appendChild(createMessage(data.msgs[i], i));
      };
    })
    .catch(function(error) {
      console.error('Erreur lors de l\'actualisation des nouveaux messages :', error);
    });;
}

let messageButton = document.getElementById("messageButton");
messageButton.addEventListener("click", function() {
  postNewMessage($("textarea").val());
});

let logoutButton = document.getElementById("logoutButton")
logoutButton.addEventListener("click", function() {
  alert("Vous êtes déconnecté !");
  window.location.href = "index.html";
});

