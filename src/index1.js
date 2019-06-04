import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import App from './App2'

const ADD = 'ADD';

const addMessage = (message) => {
	  return {
	    type: ADD,
	    message: message
	  }
};

const messageReducer = (state = [], action) => {
	  switch (action.type) {
	    case ADD:
	      return [
	        ...state,
	        action.message
	      ];
	    default:
	      return state;
	  }
};

const store = createStore(messageReducer);

// React:
class Presentational extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      name: '',
	      nickname: '',
	      value: 0,
	      data: []
	    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleNameChange(event) {
	    this.setState({
	      input: event.target.value
	    });
  }
  submitMessage() {
	    const currentMessage = this.state.input;
	    this.setState({
	      input: '',
	      messages: this.state.messages.concat(currentMessage)
	    });
	}
	render(){
		return(
			<div>
        <h2>Please input the following:</h2>
        <input
          value={this.state.name}
        onChange={this.handleNameChange}
        /><br/>
      <button 
        onClick={this.submitMessage}
      >Submit</button>
      <ul>
        {this.state.messages.map( (message, idx) => {
              return (
                  <li key={idx}>{message}</li>
            )
          })
        }
      </ul>
    </div>
		)
	}
};

// React-Redux:
const mapStateToProps = (state) => {
	  return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
	  return {
	    submitNewMessage: (newMessage) => {
	       dispatch(addMessage(newMessage))
	    }
  }
};

// const Provider = Provider;
// const connect = connect;

// define the Container component here:
const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational)

class AppWrapper extends React.Component {
	  constructor(props) {
	    super(props);
	  }
  render() {
	    // complete the return statement:
	    return (
	    <Provider store={store}>
        <Container />
      </Provider>
    );
  }
};

ReactDOM.render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>,
  document.getElementById('root')
);