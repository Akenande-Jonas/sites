import React,{useState}from 'react';

const JCCompossant = ({couleur})=>{
    const [color, setColor] = useState(couleur);

    function getRandomHexColor() //Création d'un couleur hexadecimal aléatoire
    {
    return '#' + Math.floor(Math.random() * 16777215).toString(16); // Retourne #Valeur generer
    }


    const changeColor = () => {
        const newColor = getRandomHexColor();
        setColor(newColor);
    };

    return (
        <div>
            <div style={{color}}>
                Je suis un compossant    
            </div>
            <button onMouseOver={changeColor}>
                Changer la couleur
            </button>
        </div>
    );
};

export default JCCompossant;