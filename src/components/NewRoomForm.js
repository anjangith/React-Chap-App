import React,{Component} from 'react';
import './NewRoomForm.css';

class NewRoomForm extends Component {

  constructor() {
    super()
    this.state = {
      roomName: ''
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }


  handleSubmit(e) {
    e.preventDefault()
    this.props.createRoom(this.state.roomName)
    this.setState({
      roonName: ''
    })
  }

  handleChange(e) {
    this.setState({

      roomName: e.target.value

    })
  }
render() {
return(
<div className="new-room-form">
<form onSubmit={this.handleSubmit}>
<input
className="input-handle"
value={this.state.roomName}
onChange= {this.handleChange}
type="text"
placeholder="Create a Room"
required />
<button id="create-room-btn" type="submit">SUBMIT</button>
</form>
</div>
)
}
}

export default NewRoomForm;
