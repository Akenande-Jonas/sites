alert('coucou le front fonctionne aussi!'); // alerte pour vérifier que le front fonctionne

// Faire une requête GET à l'API pour tester la connexion avec le back-end
fetch('/api/test')
    .then(response => response.json()) 
    .then(data => {
        console.log(data.message); // Affiche "API fonctionne!" dans la console
    })

    let app = document.getElementById('app'); // Récupérer l'élément avec l'id 'app'
    app.innerHTML = `<h1>${data.jonas}</h1>
                     <p>Age: ${data.age}</p>
                     <p>Langages: ${data.langages.join(', ')}</p>` // Afficher les données reçues dans l'élément 'app'

    .catch(error => {
        console.error('Erreur api:', error); // Gérer les erreurs de la requête car le catch attrepe les erreurs
    });

    document .getElementById('monBouton').addEventListener('click', () => {
        alert('Bouton cliqué!'); // Alerte lorsque le bouton est cliqué
    });

    const login = document.getElementById('login'); // Récupérer le formulaire de login
    const password = document.getElementById('password'); // Récupérer le champ de mot de passe

    fetch('/api/login', {
        method: 'POST', // Méthode POST pour envoyer des données
        headers: {
            'Content-Type': 'application/json' // Indiquer que le contenu est au format JSON
        },
        body: JSON.stringify({ // Convertir les données en JSON
            login: login.value, // Valeur du champ login
            password: password.value // Valeur du champ password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Afficher le message de réponse dans la console
    })
    .catch(error => {
        console.error('Erreur lors de la connexion:', error); // Gérer les erreurs de la requête
    });
    