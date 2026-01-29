import React, { useState } from 'react';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Composant1({ couleur }) {
  const [textColor, setTextColor] = useState(couleur);

  const handleMouseEnter = () => {
    setTextColor(getRandomColor());
  };

  return (
    <div>
      <p
        style={{ color: textColor, cursor: 'pointer' }}
        onMouseEnter={handleMouseEnter}
      >
        Survole-moi pour changer ma couleur !
      </p>
    </div>
  );
}
