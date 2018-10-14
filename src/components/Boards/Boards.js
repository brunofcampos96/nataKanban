import React from 'react';
import Cards from '../Cards/Cards';

const boards = (props) => {
    return props.boards.map((board) => {
        let buttonStyle = {
          background: board.color,
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          height: '30px',
          padding: '3px',
          outline: 'none'
        }
        let titleInputStyle = {
          background: board.color,
          border: 'none',
          width: '-webkit-fill-available',
          outline: 'none',
          fontSize: '20px',
          textAlign: 'center',
          padding: '6px'
        }
        let editTitleStyle = {
          background: board.color,
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          display: 'block',
          width: '100%',
          paddingTop: '7px'
        }
        let title = null;
        if(props.editBoardId === board.id){
          title = <div>
            <button style={editTitleStyle} onClick={() => props.saveTitle(board.id)}>Save</button>
            <input placeholder={board.title} style={titleInputStyle} onChange={evt => props.setBoardTitle(evt.target.value)}/>
          </div>
        }else{
          
          title = <div><button style={editTitleStyle} onClick={() => props.onEditClick(board.id)}>Edit</button><h3>{board.title}</h3></div>
        }
        return <div style={{backgroundColor:board.color}}>
          <div
              id={board.id}
              style={{height:'70vh'}}
            >
              {title}
              <span style={{height:'3px', display:'block', backgroundColor:'white'}}></span>
              <button style={buttonStyle} onClick={() => props.addCard(board.id)}>Add Card</button>
              <Cards
                cards={props.cards.filter(card => card.pId === board.id)}
                color={board.color}
                deleteCard={props.deleteCard}
                movingCard={props.movingCard}
                setCardIdToMove={props.setCardIdToMove}
                boards={props.boards}
                moveCard={props.moveCard}
                setOption={props.setOption}
                setEdittingCard={props.setEdittingCard}
                edittingCardId={props.edittingCardId}
                setCardTitle={props.setCardTitle}
                setCardDescription={props.setCardDescription}
                saveEdit={props.saveEdit}/>
          </div>
          <span style={{height:'3px', display:'block', backgroundColor:'white', marginBottom: '10px'}}></span>
          <div style={{height:'6vh'}}>
          <button style={editTitleStyle} onClick={() => props.deleteBoard(board.id)}>Delete</button>
          </div>
        </div>
    })
}



export default boards;