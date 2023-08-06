import './Square.css'
import classNames from 'classnames'
const Square = ({value, onClick, turn, winner})=>{

    const handleClick =()=>{
       (turn!==null && value === null) && onClick(); // es el turno de alguien y el valor de ese cuadrado es null, entoces modificalo
    }

    let squareClass = classNames({
        square: true,
        [`square--${value}`]: value !== null,
        winner: winner,
    }); // se utiliza la libreria classnames para agregar o cambiar clases

    return(
     <div className={squareClass} onClick={() => handleClick()}>

     </div>
    );
}
export default Square;