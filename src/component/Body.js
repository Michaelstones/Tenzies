import React, {useEffect, useState} from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import Game from './Gamepiece';
import { nanoid } from 'nanoid';
 
const Body = () =>{
    const generateNew =()=>{
        return {value:Math.floor(Math.random()*6), isHeld:false,
            id:nanoid()}
    }

// generated random number in an array
    const allNewDices = ()=>{
        let arr = []
        //    let rand = 
            for(let i = 0; i<10; i++){
               arr.push(generateNew())
            }
        return arr;
    }
    
    const [ randNum, setRandNum]=useState(()=>allNewDices())
    const[tenzie, settenzie]= useState(false)
    
    // console.log(allNewDices())
    const holdDie=(id)=>{
        // console.log(id)
        
        setRandNum(dice => dice.map((item)=>{
            return item.id === id ? {...item, isHeld:!item.isHeld}: item;
        }))
    }
    // return generated random number in an array as a component
    const eacheDieNum = randNum.map((die)=>{
        return (
        <Game 
        value={die.value} 
         key={die.id}
         isHeld={die.isHeld}
         id={die.id}
         holdDie={()=>holdDie(die.id)}
         />
         )
    })
    const handleRoll = ()=>{
        if(!tenzie){
            setRandNum( old => old.map((eachItem)=>{
                return eachItem.isHeld ? eachItem:generateNew()
            }))
        }else{
            settenzie(false)
            setRandNum(allNewDices())
        }
    }
    // winining logic 

    useEffect(()=>{
        const allHeld = randNum.every((old)=> old.isHeld)
        const firstValue = randNum[0].value
        const allValue = randNum.every((each)=> each.value===firstValue)
        if(allHeld && allValue){
            settenzie(true)
            console.log('you win');
        }
    },[randNum])
    return (
    <>
        {tenzie===true && <ConfettiExplosion/>}
        <section className='tenzies'>
            <div className='borders'>
                <div className='game-board'>
                    <div className='description'>
                        <h1>Tenzies</h1>
                        <p>
                            roll until all dice are the same.
                            Click each die to freeze it at it current value
                        </p>
                    </div>
                    <div className='game-palette'>
                          {eacheDieNum}  
                         <button onClick={handleRoll}>{tenzie?'New Game':'Roll'}</button>
                    </div>
                </div>
            </div>
        </section>
    
    </>)
}

export default Body;