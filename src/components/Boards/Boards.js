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
          textAlign: 'center'
        }
        let editTitleStyle = {
          background: board.color,
          border: 'none',
          outline: 'none',
          align: 'rigth',
          cursor: 'pointer'
        }
        let title = null;
        if(props.editBoardId === board.id){
          title = <h3>
            <input placeholder={board.title} style={titleInputStyle} onChange={evt => props.updateInputValue(evt.target.value)}/>
            <button style={editTitleStyle} onClick={() => props.saveTitle(board.id)}>Save</button>
          </h3>
        }else{
          title = <h3>{board.title}<button style={editTitleStyle} onClick={() => props.onEditClick(board.id)}>Edit</button></h3>
        }
        return <div style={{backgroundColor:board.color}}>
          <div
              id={board.id}
              style={{height:'70vh'}}
            >
              {title}
              <span style={{height:'3px', display:'block', backgroundColor:'white'}}></span>
              <button style={buttonStyle}>Add Card</button>
              <Cards
                cards={props.cards.filter(card => card.pId === board.id)}
              />
          </div>
          <span style={{height:'3px', display:'block', backgroundColor:'white', marginBottom: '10px'}}></span>
          <div style={{height:'6vh'}}>
          <button style={editTitleStyle} onClick={() => props.deleteBoard(board.id)}>Delete</button>
          </div>
        </div>
          

       
    })
}



export default boards;