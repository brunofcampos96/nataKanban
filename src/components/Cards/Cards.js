import React from 'react';

const cards = (props) => {
    return props.cards.map(card => {
        return <div
          id={card.id}
          style={{backgroundColor:'white', height:'auto', margin:'10px',borderRadius:'5px'}}>
          <div className='card'>
            <span className='cardTitle'>{card.title}</span>
            <span className='cardContent'>{card.description}</span>
          </div>
        </div>
      })
}

export default cards;