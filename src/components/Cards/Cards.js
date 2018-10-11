import React from 'react';
import './Cards.css';

const cards = (props) => {
  const cardButtonStyle = {
    backgroundColor: props.color,
    margin: '0px',
    border: 'none',
    cursor: 'pointer',
    outline: 'none'
  }
  return props.cards.map(card => {
    let showOptions;
    if(props.cardMoveId === card.id){
      showOptions = <div><select multiple  style={{width:'100%'}}>
        {props.boards.forEach(board => {
          return <option>dd{board.title}</option>
        })}
      </select></div>
    }
    return <div
      id={card.id}
      style={{backgroundColor:'white', height:'auto', margin:'10px',borderRadius:'5px'}}>
      <div className='card'>
        <div className='functions'>
          <button style={cardButtonStyle} onClick={() => props.moveCard(card.id)}>Move</button>
          <button style={cardButtonStyle} onClick={() => props.deleteCard(card.id)}>Delete</button>
        </div>
        {showOptions}
        
        <span className='cardTitle'>{card.title}</span>
        <span className='cardContent'>{card.description}</span>
      </div>
    </div>
  })
}

export default cards;