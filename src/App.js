import React from 'react';
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

render() {
  return(
    <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.props.input}
        onChange={this.props.handleChange}
        /><br/>
      <button 
        onClick={this.props.submitMessage}
      >Submit</button>
      <ul>
        {this.props.messages.map( (message, idx) => {
              return (
                  <li key={idx}>{message}</li>
            )
          })
        }
      </ul>
    </div>
  )
}


}

export default App;

