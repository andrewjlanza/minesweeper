import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import Boxes from "./Boxes.js"
import axios from "axios"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      board: [
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "]
      ],
      state: "new",
      mines: 10
    }
  }
  newGame = event => {
    axios
      .post("http://minesweeper-api.herokuapp.com/games", {
        difficulty: this.state.difficulty
      })
      .then(response => {
        this.setState(response.data)
      })
  }

  easy = event => {
    axios
      .post("http://minesweeper-api.herokuapp.com/games", {
        difficulty: 0
      })
      .then(response => {
        this.setState(response.data)
      })
  }
  intermediate = event => {
    axios
      .post("http://minesweeper-api.herokuapp.com/games", {
        difficulty: 1
      })
      .then(response => {
        this.setState(response.data)
      })
  }
  expert = event => {
    axios
      .post("http://minesweeper-api.herokuapp.com/games", {
        difficulty: 2
      })
      .then(response => {
        this.setState(response.data)
      })
  }

  check = (row, col) => {
    if (this.state.id === 0) {
      return
    }
    console.log(`clicked on a square  ${row} and ${col}`)

    axios
      .post(
        `http://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
        { row: row, col: col }
      )
      .then(response => {
        this.setState(response.data)
      })
  }

  flag = (row, col) => {
    if (this.state.id === 0) {
      return
    }
    console.log(`clicked on a square  ${row} and ${col}`)

    axios
      .post(
        `http://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
        { row: row, col: col }
      )
      .then(response => {
        this.setState(response.data)
      })
  }

  gameMessage = () => {
    if (this.state.id === 0) {
      return <p> click to start a new game</p>
    }
    return <p> you are now playing game mode #{this.state.id}</p>
  }

  render() {
    return (
      <main>
        <header>Sweep those mines!</header>
        <p> click "load game" to start</p>
        <div className="App">
          <table className="table1">
            <tbody>
              <tr>
                <td colSpan={this.state.board[0].length}>
                  <button onClick={this.newGame}>load game</button>
                  <button onClick={this.easy}> easy</button>
                  <button onClick={this.intermediate}>intermediate</button>
                  <button onClick={this.expert}>expert</button>

                  {this.gameMessage()}
                  <p> there are {this.state.mines} mines</p>
                </td>
              </tr>
              {this.state.board.map((row, rowIndex) => {
                return (
                  <tr>
                    {row.map((choice, index) => {
                      return (
                        <Boxes
                          row={rowIndex}
                          col={index}
                          choice={choice}
                          check={this.check}
                          flag={this.flag}
                        />
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>
    )
  }
}

export default App
