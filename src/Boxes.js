import React, { Component } from "react"

class Boxes extends Component {
  check = event => {
    this.props.check(this.props.row, this.props.col)
  }

  flag = event => {
    this.props.flag(this.props.row, this.props.col)
    event.preventDefault()
  }

  render() {
    return (
      <td onClick={this.check} onContextMenu={this.flag}>
        {this.props.choice}
      </td>
    )
  }
}

export default Boxes
