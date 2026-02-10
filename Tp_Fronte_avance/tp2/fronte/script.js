

// Adresse de ton backend
const API_URL = "http://localhost:2500";

// Fonction pour appeler la route /
function getHomeMessage() {
  fetch(API_URL + "/")
    .then(res => res.text())
    .then(data => {
      console.log("Réponse du backend :", data);
      document.getElementById("home").textContent = data;
    })
    .catch(err => console.error("Erreur :", err));
}

// Appel POST pour envoyer des données au backend
fetch("http://localhost:2500/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: "Bonjour backend, voici mes données !"
  })
})
.then(res => res.text())
.then(data => {
    console.log("Réponse du serveur :", data);
  })
.catch(err => console.error("Erreur :", err));

// Fonction pour appeler la route /test
function getTestMessage() {
  fetch(API_URL + "/test")
    .then(res => res.text())
    .then(data => {
      console.log("Réponse du backend :", data);
      document.getElementById("test").textContent = data;
    })
    .catch(err => console.error("Erreur :", err));
}

// Appels automatiques au chargement de la page
window.onload = () => {
  getHomeMessage();
  getTestMessage();
};
