import React, { Component } from 'react';
import './App.css';
import Boards from './components/Boards/Boards'

class App extends Component {
  state = {
    edittingBoard: null,
    textValue: "",
    boards : [
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
            updateInputValue={this.updateInputValue}
            saveTitle={this.saveTitle}
            deleteBoard={this.deleteBoard}/>
        </div>
      </div>
    );
  }

  editBoard = (id) => {
    this.setState({edittingBoard: id})
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

  updateInputValue = (textValue) => {
    this.setState({textValue : textValue})
  }
  saveTitle = () => {
    let boards = [...this.state.boards];
    boards.find(board => {
      return board.id == this.state.edittingBoard;
    }).title = this.state.textValue;
    this.setState({boards : boards, edittingBoard : null, textValue : ""});
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
}

export default App;
