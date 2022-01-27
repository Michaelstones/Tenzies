import React,{useState} from "react";

const Game = (props)=>{
  
   const styles ={
       backgroundColor : props.isHeld? '#58E391':'white'
                }
  return (
        <>
        <main className="component">
            <div className="game" 
            style={styles}
            id={props.id}
            onClick={props.holdDie}
            >
                <h2>
                    {props.value}
                 </h2>
             </div>
        </main>
        </>

    )
}

export default Game;