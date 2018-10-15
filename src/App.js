import React, { Component } from 'react';
import './App.css';
import Boards from './components/Boards/Boards'

class App extends Component {
  state = {
    edittingBoard: null,
    boardTitle: "",
    movingCard: null,
    edittingCard: null,
    cardTitle: "",
    cardDescription: "",
    option: null,
    boards: [
      {
        id: 1,
        title: "Backlog",
        color: "lightgrey"
      },{
        id:2,
        title: "To Do",
        color: "turquoise"
      },{
        id: 3,
        title: "In Progress",
        color: "cornflowerblue"
      },{
        id: 4,
        title: "Testing",
        color: "khaki"
      },{
        id: 5,
        title: "Done",
        color: "lightpink"
      }
    ],
    cards: [
      {
        id: 1,
        pId: 1,
        title: "Fly to mars",
        description: "Land in Mars and make a new civilization"
      },{
        id: 2,
        pId: 1,
        title: "Trainning aim",
        description: "Hit more HS and Awp shots"
      },{
        id: 3,
        pId: 2,
        title: "School Work",
        description: "Do all the 3 works"
      },{
        id: 4,
        pId: 3,
        title: "Nata Exam",
        description: "Do Kanban(AKA this)"
      },{
        id: 5,
        pId: 4,
        title: "Mirage Smokes",
        description: "Hit all the smokes in the same run"
      },{
        id: 6,
        pId: 5,
        title: "Buy my bike",
        description: "Buy a real bike"
      }
    ]
  }
  render() {
    const boardStyle = {
      display: 'grid',
      padding: '5px',
      gridTemplateRows: '1fr',
      gridAutoFlow: 'column',
      gridAutoColumns: '230px',
      gridColumnGap: '5px',
    }
    let buttonStyle = {
      border: 'none',
      cursor: 'pointer',
      width: '100px',
      height: '30px',
      outline: 'none'
    }
    return (
      <div>
        <div style={{marginLeft:'5px'}}>
          <button onClick={() => this.addBoard()}style={buttonStyle}>Add Board</button>
        </div>
        <div className="App" style={boardStyle}>
          <Boards
            boards={this.state.boards}
            onEditClick={this.editBoard}
            editBoardId={this.state.edittingBoard}
            cards={this.state.cards}
            setBoardTitle={this.setBoardTitle}
            saveTitle={this.saveTitle}
            deleteBoard={this.deleteBoard}
            deleteCard={this.deleteCard}
            movingCard={this.state.movingCard}
            setCardIdToMove={this.setCardIdToMove}
            addCard={this.addCard}
            moveCard={this.moveCard}
            setOption={this.setOption}
            setEdittingCard={this.setEdittingCard}
            edittingCardId={this.state.edittingCard}
            setCardTitle={this.setCardTitle}
            setCardDescription={this.setCardDescription}
            saveEdit={this.saveEdit}/>
        </div>
      </div>
    );
  }

  editBoard = (id) => {
    this.setState({edittingBoard: id})
  }

  setCardIdToMove = (id) => {
    this.setState({movingCard: id,  edittingCard: null})
  }

  setOption = (destinyBoardId) => {
    this.setState({option : destinyBoardId})
  }

  setEdittingCard = (cardId) => {
    this.setState({edittingCard : cardId, cardDescription : null, cardTitle : null, movingCard: null})
  }
  
  setCardTitle = (title) => {
    this.setState({cardTitle: title})
  }
  
  setCardDescription = (description) => {
    this.setState({cardDescription: description})
  }
  
  saveEdit = (editCard) => {
    if(this.state.cardDescription) editCard.description = this.state.cardDescription;
    if(this.state.cardTitle) editCard.title = this.state.cardTitle;

    let cards = [...this.state.cards];
    let cardIdx = cards.findIndex(card => card.id === editCard.id);
    cards[cardIdx] = editCard;
    this.setState({cards : cards, cardDescription : "", cardTitle : "", edittingCard: null})
  }

  moveCard = (cardId) => {
    if(this.state.option){
      let cards = [...this.state.cards];
      cards.find(card => {
        return card.id === cardId;
      }).pId = parseInt(this.state.option);
      this.setState({cards : cards, option : null, movingCard : null,  edittingCard: null})
    }else{
      this.setState({option : null, movingCard : null,  edittingCard: null})
    }
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  addBoard(){
    let board = {
      id: this.state.boards.length + 1,
      title: "Edit",
      color: this.getRandomColor()
    }
    let boards = [board,...this.state.boards];
    this.setState({boards: boards})
  }
  addCard = (pId) => {
    let card = {
      id: this.state.cards.length+1,
      pId: pId,
      title: "Edit",
      description: "Edit"
    }
    let cards = [card,...this.state.cards];
    this.setState({cards: cards, option : null, movingCard : null,  edittingCard: null})
  }
  
  setBoardTitle = (boardTitle) => {
    this.setState({boardTitle : boardTitle})
  }
  saveTitle = () => {
    if(this.state.boardTitle){
      let boards = [...this.state.boards];
      boards.find(board => {
        return board.id === this.state.edittingBoard;
      }).title = this.state.boardTitle;
      this.setState({boards : boards, edittingBoard : null, boardTitle : ""});
    }else{
      this.setState({edittingBoard : null, boardTitle : ""});
    }
  }

  deleteBoard = (id) => {
    let boards = [...this.state.boards];
    let cards = [...this.state.cards];
    let idxToRemove = boards.findIndex(board => board.id === id)
    let remaingCards = cards.filter(card => {
      return card.pId !== id 
    })
    boards.splice(idxToRemove,1);
    this.setState({boards:boards, cards: remaingCards});
  }

  deleteCard = (id) => {
    let cards = [...this.state.cards];
    let remaingCards = cards.filter(card => {
      return card.id !== id 
    })
    this.setState({cards: remaingCards});
  }
}

export default App;
