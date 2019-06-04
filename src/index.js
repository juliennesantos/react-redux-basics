import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// import rootReducer from './redux/reducers'
import App from './App'

// const store = createStore(
// rootReducer,
// applyMiddleware(thunk)
// );

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
	      firstName: '',
	      nickname: '',
	      num1: '',
	      num2: '',
	      messages: [],
	      operation: 0,
	      answer: 0
	    }
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleNum1Change = this.handleNum1Change.bind(this);
    this.handleNum2Change = this.handleNum2Change.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
  }
  handleFirstNameChange(event) {
	    this.setState({
	      firstName: event.target.value
	    });
  }
  handleNicknameChange(event) {
	    this.setState({
	      nickname: event.target.value
	    });
  }
  handleNum1Change(event) {
	    this.setState({
	      num1: event.target.value
	    });
  }
  handleNum2Change(event) {
	    this.setState({
	      num2: event.target.value
	    });
  }
  add(event) {
	    this.setState({
				selected: true,
	      operation: parseFloat(this.state.num1) + parseFloat(this.state.num2)
			});
			event.preventDefault();
	}
  subtract(event) {
	    this.setState({
				selected: true,
	      operation: parseFloat(this.state.num1) - parseFloat(this.state.num2)
			});
			event.preventDefault();
	}
  multiply(event) {
	    this.setState({
				selected: true,
	      operation: parseFloat(this.state.num1) * parseFloat(this.state.num2)
			});
			event.preventDefault();
	}
  divide(event) {
	    this.setState({
				selected: true,
				operation: parseFloat(this.state.num1) / parseFloat(this.state.num2)
			});
			event.preventDefault();
	}
	submitMessage(event) {
		this.setState({
			firstName: '',
			nickname: '',
			num1: '',
			num2: '',
			messages: this.state.messages.concat(this.state.firstName + " aka " + this.state.nickname),
			answer: this.state.operation
		});
		event.preventDefault();
	}
	render(){
		return(
			<div>
        <h2>Please input the following:</h2>
        <input
          value={this.state.firstName}
					onChange={this.handleFirstNameChange}
					placeholder='First Name'
        /><br/>
        <input
          value={this.state.nickname}
					onChange={this.handleNicknameChange}
					placeholder='Nickname'
        /><br/>
        <input
					type='number'
          value={this.state.num1}
					onChange={this.handleNum1Change}
					placeholder='First Number'
        /><br/>
        <input
					type='number'
          value={this.state.num2}
					onChange={this.handleNum2Change}
					placeholder='Second Number'
        /><br/>
        <h5>{this.state.answer}</h5>
        <br/>
      <button type='submit'
        onClick={this.submitMessage}>Submit</button>
      <button 
        onClick={this.add}> + </button>
      <button 
        onClick={this.subtract}> - </button>
      <button 
        onClick={this.multiply}> x </button>
      <button 
        onClick={this.divide}> / </button>
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