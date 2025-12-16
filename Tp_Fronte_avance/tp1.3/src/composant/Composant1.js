import React, { useState } from 'react';

const Composant1 = ({ couleur }) => {
    const [color, setColor] = useState(couleur);

    const changeColor = () => {
        const newColor = color === 'blue' ? 'red' : 'blue';
        setColor(newColor);
    };

  return (
    <div>
        <div style = {{color}}>
          Couleur dynamique
        </div>
        <button onClick={changeColor}>Changer la couleur</button>
    </div>
  );
}

export default Composant1;
