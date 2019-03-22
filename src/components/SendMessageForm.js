import React,{Component} from 'react';
import './SendMessageForm.css';

class SendMessageForm extends Component {

  constructor() {
    super()
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
  this.setState({
    message: e.target.value
  })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.sendMessage(this.state.message)
    this.setState({
      message: ''
    })

    }



  render() {
    return(
      <form
      onSubmit={this.handleSubmit}
      className="send-message-form">
      <input
      className="input-for-form"
      disabled={this.props.disabled}
      onSubmit={this.handleSubmit}
      onChange={this.handleChange}
      value={this.state.message}
      placeholder="Type a message and hit enter"
      type="/text" />
      </form>
    )
  }
}
export default SendMessageForm;
