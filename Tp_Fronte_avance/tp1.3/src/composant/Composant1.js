import React, { useState } from 'react';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Composant1 = ({ couleur }) => {
  const [color, setColor] = useState(couleur);

  const handleMouseEnter = () => {
    setColor(getRandomColor());
  };

  return (
    <div>
      <div
        style={{ color, cursor: 'pointer' }}
        onMouseEnter={handleMouseEnter}
      >
        Couleur dynamique
      </div>
    </div>
  );
};

export default Composant1;
