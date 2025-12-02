alert('coucou le front fonctionne aussi!'); // alerte pour vérifier que le front fonctionne

// Faire une requête GET à l'API pour tester la connexion avec le back-end
fetch('/api/test')
    .then(response => response.json()) 
    .then(data => {
        console.log(data.message); // Affiche "API fonctionne!" dans la console
    })
    .catch(error => {
        console.error('Erreur api:', error); // Gérer les erreurs de la requête car le catch attrepe les erreurs
    });