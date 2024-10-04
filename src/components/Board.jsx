import React from 'react'
import Square from './Square'
import { useState, useEffect } from 'react'
import '../index.css'
const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [isNext, setIsNext] = useState(true)
    const winner = calculateWinner(squares)
    const [aiIsThinking, setAiIsThinking] = useState(false)
    let [pointX, setPoitX] = useState(0)
    let [pointO, setPoitO] = useState(0)
    const handleClick = (i) =>{
       if(squares[i] || winner || aiIsThinking) return
       const newSquares = squares.slice();
       newSquares[i] = isNext ? "X" : "O";

       setSquares(newSquares);
       setIsNext(!isNext);
    }

    const resetGame = () =>{
        setSquares(Array(9).fill(null))
        setIsNext(true)
    }

    useEffect(() => {
        if(!isNext && !winner){
            setAiIsThinking(true)
            setTimeout(() =>{
                aiMove(squares, setSquares, setIsNext)
                setAiIsThinking(false)
            }, 1000)
        }
        
    },[isNext, squares, winner])

    useEffect(() => {
        if(winner === "X"){
            setPoitX(pointX + 1)
        }
        if(winner === "O"){
            setPoitO(pointO + 1)
        }
    },[winner])

    const handleReset = () =>{
        resetGame()
        setPoitX(0)
        setPoitO(0)
    }
    
        
  return (
    <div>
        <div className="status">
            Status:{""} 
            {winner ?( 
            <p className='winner'>O vencedor é: {winner}!</p>
            ): (
            ` proximo a jogar ${isNext?"X":"O"}`)
            }
        </div>
        <div className='placar'>
            <h3>Placar</h3>
            <h4><span>X:</span> {pointX}</h4>
            <h4><span>O:</span> {pointO}</h4>
        </div>
            <div className="board-row">
            <Square value={squares[0]} onClick ={()=> handleClick(0)} />
            <Square value={squares[1]} onClick={()=> handleClick(1)} />
            <Square value={squares[2]} onClick={()=> handleClick(2)} />
            </div>
            <div className="board-row">
            <Square value={squares[3]} onClick={()=> handleClick(3)} />
            <Square value={squares[4]} onClick={()=> handleClick(4)} />
            <Square value={squares[5]} onClick={()=> handleClick(5)} />
            </div>
            <div className="board-row">
            <Square value={squares[6]} onClick={()=> handleClick(6)} />
            <Square value={squares[7]} onClick={()=> handleClick(7)} />
            <Square value={squares[8]} onClick={()=> handleClick(8)} />
            </div>
            <button className="reset-button" onClick={resetGame}>Reiniciar Jogo</button>
            <br/>
            <button className="reset-placar" onClick={handleReset}>Resetar Placar</button>
    </div>
  )
}

const calculateWinner = (squares) =>{
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    let aux = 0
    for(let i = 0; i<lines.length; i++){
        const [a,b,c] = lines[i]
        if(squares[a] && squares[a] === squares [b] && squares[a] === squares[c]){
             return squares[a]
        }
    }
   
        return null
}

const aiMove = (squares, setSquares,setIsNext) =>{
    let move = null 

    for(let i = 0; i<squares.length; i++){
        if(!squares[i]){
            move = i
            break 
        }
    }
    if(move != null ){
        const newSquares = squares.slice();
        newSquares[move] =  "O";
 
        setSquares(newSquares);
        setIsNext(true);
    }


}
export default Board