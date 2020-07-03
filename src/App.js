import React, { Component } from 'react';
import axios from 'axios';


class Contact extends Component {

    state = {
        name: '',
        message: '',
        email: '',
        sent: false,
        buttonText: 'Send Message'
    }

    formSubmit = (e) => {
      e.preventDefault()
    
      this.setState({
          buttonText: '...sending'
      })
    
      let data = {
          name: this.state.name,
          email: this.state.email,
          message: this.state.message
      }
      
      axios.post('http://localhost:4444/api/v1/gmailer', data)
      .then( res => {
          this.setState({ sent: true }, this.resetForm())
      })
      .catch( () => {
        console.log('Message not sent')
      })
    }


    resetForm = () => {
      this.setState({
          name: '',
          message: '',
          email: '',
          buttonText: 'Message Sent'
      })
  }

    render() {
        return(
          <form className="contact-form" onSubmit={ (e) => this.formSubmit(e)}>
            <h1>Contact Form</h1>
            <label className="message" htmlFor="message-input">Your Message</label>
            <br />
            <textarea onChange={e => this.setState({ message: e.target.value})} name="message" className="message-input" type="text" placeholder="Please write your message here" value={this.state.message} required/>

            <br /><br />
            <label className="message-name" htmlFor="message-name">Your Name</label>
            <br />
            <input onChange={e => this.setState({ name: e.target.value})} name="name" className="message-name" type="text" placeholder="Your Name" value={this.state.name}/>

            <br /><br />
            <label className="message-email" htmlFor="message-email">Your Email</label>
            <br />
            <input onChange={(e) => this.setState({ email: e.target.value})} name="email" className="message-email" type="email" placeholder="your@email.com" required value={this.state.email} />
            <br /><br />
            <div className="button--container">
                <button type="submit" className="button button-primary">{ this.state.buttonText }</button>
            </div>
          </form>
        );
    }
}

export default Contact;