import logo from './logo.svg';
import './App.css';

const composant = ({ couleur }) => {
    const [color, setColor] = useState(couleur);

    const changeColor = () => {
        const newColor = color === 'blue' ? 'red' : 'blue';
        setColor(newColor);
    };

  return (
    <div>
        <div style = {{color}}>
            <h1 style={{ color: color }}>Couleur dynamique</h1>
            <button onClick={changeColor}>Changer la couleur</button>
        </div>
    </div>
  );
}

export default composant;
