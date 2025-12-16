import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Coucou voilà un Formulaire d'inscription</h1>

      <form>
        <label htmlFor="nom">Nom :</label><br />
        <input type="text" id="nom" name="nom" required /><br /><br />

        <label htmlFor="prenom">Prénom :</label><br />
        <input type="text" id="prenom" name="prenom" required /><br /><br />

        <label htmlFor="email">Email :</label><br />
        <input type="email" id="email" name="email" required /><br /><br />

        <label htmlFor="password">Mot de passe :</label><br />
        <input type="password" id="password" name="password" required /><br /><br />

        <input type="submit" value="S'inscrire" />
      </form>
    </div>
  );
}

export default App;
