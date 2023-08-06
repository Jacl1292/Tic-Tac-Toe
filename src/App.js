import { useState } from 'react';
import './App.css';
import Board from './Components/Board/Board';
import ScoreBoard from './Components/ScoreBoard/ScoreBoard';

const winninPositions = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6],
];

const App =()=> {

  const [turn,setTurn] = useState('X'); //para saber de quien es el turno
  const [squares,setSquares] = useState(Array(9).fill(null)); // para saber que hay dentro de cada cuadrado y crea un array de 9 inicializados en null,
  const [winningSquares, setWinningSquares] = useState([]);
  const [score,setScore] = useState({
       X: 0,
       O: 0,
  });// un objeto para saber los puntos de cada jugador

  const reset =()=> {
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  }

  const checkForWinner = newSquares =>{
    for(let i=0; i<winninPositions.length; i++){
      const [a,b,c] = winninPositions[i];
      if(newSquares[a] && newSquares[a] ===newSquares[b] && newSquares[a] === newSquares[c]){
        // hay un ganador
        endGame(newSquares[a],winninPositions[i]);
        return
      }
    }
      // si en ningun cuadrado esta en null y no hubo ganador entonces empate
     if (!newSquares.includes(null)) {
      // empate
      endGame(null,Array.from(Array(10).keys())); // le pasamos un array de 10 elementos para animar todos los casilleros
      return
     }
    setTurn(turn ==='X' ? 'O' : 'X')
  }
 
  const handleClick = square =>{
    let newSquares = [...squares] // creamos una copia de nuestros squares
    newSquares.splice(square, 1, turn) // en la posicion square, modifica 1 element, y dale el valor de turn
    setSquares(newSquares);
    checkForWinner(newSquares);
  }

  const endGame = ( result, winninPositions) =>{
    setTurn(null);
    if(result!== null){  //no hubo empate entonces...
      setScore({
        ...score,  // desestructuramos el objeto y luego...
        [result]: score[result]+1,
      })
    }
    setWinningSquares(winninPositions);
    setTimeout(reset, 2000);
    
  }

  return (
    <div className="container">
       <h1>TIC TAC TOE</h1>
       <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick = {handleClick}/>
       <ScoreBoard scoreO={score.O} scoreX={score.X} />
    </div>
  );
}

export default App;
