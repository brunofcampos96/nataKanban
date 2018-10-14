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
  const textAreaStyle = {
    outline: 'none',
    border: 'none',
    resize: 'none',
    width: '100%'
  }
  let titleInputStyle = {
    border: 'none',
    width: '-webkit-fill-available',
    outline: 'none',
    fontSize: '20px',
    textAlign: 'center'
  }
  
  return props.cards.map(card => {
    let showOptions;
    let edittingCard;
    let title;
    let content;
    if(props.edittingCardId === card.id){
      edittingCard = <button style={cardButtonStyle} onClick={() => props.saveEdit(card)}>Save</button>
      title = <input placeholder={card.title} style={titleInputStyle} onChange={(evt) => props.setCardTitle(evt.target.value)}/>
      content = <textarea style={textAreaStyle} defaultValue={card.description} onChange={(evt) => props.setCardDescription(evt.target.value)}></textarea>
    }else{
      edittingCard = <button style={cardButtonStyle} onClick={() => props.setEdittingCard(card.id)}>Edit</button>
      title = <span>{card.title}</span>
      content = <textarea style={textAreaStyle} value={card.description}></textarea>
    }
    if(props.movingCard === card.id){
      showOptions = <div><select onChange={(evt) => props.setOption(evt.target.value)}multiple  style={{width:'100%'}}>
        {props.boards.map(board => {
          return board.id !== card.pId ? <option value={board.id}>{board.title}</option> : null
        })}
      </select></div>
    }
    let moveOption = null;
    if(props.movingCard === card.id) moveOption = <button style={cardButtonStyle} onClick={() => props.moveCard(card.id)}>Send</button>
    else moveOption = <button style={cardButtonStyle} onClick={() => props.setCardIdToMove(card.id)}>Move</button>
    
    return <div
      id={card.id}
      style={{backgroundColor:'white', height:'auto', margin:'10px',borderRadius:'5px'}}>
      <div className='card'>
        <div className='functions'>
          {moveOption}
          {edittingCard}
          <button style={cardButtonStyle} onClick={() => props.deleteCard(card.id)}>Delete</button>
        </div>
        {showOptions}
        {title}
        {content}
      </div>
    </div>
  })
}

export default cards;