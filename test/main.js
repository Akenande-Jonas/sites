document.addEventListener('DOMContentLoaded', function() {
    // Example: Display an alert when the page loads
    alert('Bienvenue sur test.html !');
});

// Example: Change the background color of the body
document.body.style.backgroundColor = '#f0f8ff';

// Example: Add an event listener to the form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    alert('Merci pour votre message, ' + document.getElementById('name').value + '!');
}); 
// Example: Log a message to the console
console.log('Le script main.js a été chargé avec succès.');
// Example: Change the text of the header
document.querySelector('h1').textContent = 'Bienvenue sur notre page de test !';
// Example: Add a new paragraph to the footer
var footer = document.getElementById('footer');
var newParagraph = document.createElement('p');
newParagraph.textContent = 'Contactez-nous pour plus d\'informations.';
footer.appendChild(newParagraph);
// Example: Change the font style of the body
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.color = '#333';
// Example: Add a hover effect to the submit button
var submitButton = document.querySelector('input[type="submit"]');
submitButton.addEventListener('mouseover', function() {
    this.style.backgroundColor = '#4CAF50';
    this.style.color = 'white';
});
submitButton.addEventListener('mouseout', function() {
    this.style.backgroundColor = '';
    this.style.color = '';
});
// Example: Validate the form before submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    if (name === '' || email === '') {
        alert('Veuillez remplir tous les champs requis.');
        event.preventDefault(); // Prevent form submission
    }
});
// Example: Add a footer note
var footerNote = document.createElement('p');
footerNote.textContent = '© 2024 Test Page. Tous droits réservés.';
footer.appendChild(footerNote);
// Example: Log form data to the console on submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    console.log('Données du formulaire:', formData);
    alert('Merci pour votre message, ' + formData.name + '!');
});
// Example: Add a reset button functionality
var resetButton = document.createElement('input');
resetButton.type = 'button';
resetButton.value = 'Réinitialiser';
resetButton.addEventListener('click', function() {
    document.getElementById('contactForm').reset();
});
document.getElementById('contactForm').appendChild(resetButton);
// Example: Add a character counter for the message textarea
var messageTextarea = document.getElementById('message');
var charCounter = document.createElement('p');
charCounter.id = 'charCounter';
charCounter.textContent = '0 caractères';
messageTextarea.parentNode.insertBefore(charCounter, messageTextarea.nextSibling);

messageTextarea.addEventListener('input', function() {
    charCounter.textContent = this.value.length + ' caractères';
});
// Example: Add a focus effect to input fields
var inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
inputs.forEach(function(input) {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#4CAF50';
    });
    input.addEventListener('blur', function() {
        this.style.borderColor = '';
    });
}); 
// Example: Add a thank you message after form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var name = document.getElementById('name').value;
    alert('Merci pour votre message, ' + name + '!');
    var thankYouMessage = document.createElement('p');
    thankYouMessage.textContent = 'Merci, ' + name + ', pour votre message. Nous vous contacterons bientôt.';
    this.parentNode.insertBefore(thankYouMessage, this.nextSibling);
    this.reset(); // Reset the form
});
// Example: Add a smooth scroll effect for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Example: Add a toggle for dark mode
var darkModeToggle = document.createElement('button');
darkModeToggle.textContent = 'Activer le mode sombre';
darkModeToggle.style.marginTop = '10px';
document.body.insertBefore(darkModeToggle, document.body.firstChild);

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Désactiver le mode sombre';
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#ffffff';
    } else {
        darkModeToggle.textContent = 'Activer le mode sombre';
        document.body.style.backgroundColor = '#f0f8ff';
        document.body.style.color = '#333';
    }
});
// Example: Add a tooltip to the email input field
var emailInput = document.getElementById('email');
emailInput.title = 'Veuillez entrer une adresse email valide.';
// Example: Log a message when the user leaves the name input field
var nameInput = document.getElementById('name');
nameInput.addEventListener('blur', function() {
    console.log('L\'utilisateur a quitté le champ nom.');
});
// Example: Add a loading spinner when the form is submitted
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.textContent = 'Envoi en cours...';
    this.parentNode.insertBefore(spinner, this.nextSibling);
    setTimeout(() => {
        spinner.remove();
        alert('Merci pour votre message, ' + document.getElementById('name').value + '!');
        this.reset(); // Reset the form
    }, 2000); // Simulate a 2-second loading time
});
// Example: Add basic CSS for the spinner
var style = document.createElement('style');
style.textContent = `
.spinner {
    margin-top: 10px;
    font-weight: bold;
    color: #4CAF50;
}
.dark-mode {
    background-color: #121212 !important;
    color: #ffffff !important;
}
`;
document.head.appendChild(style);
