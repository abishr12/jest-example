import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Test = () =>  <div>Testing</div>


class App extends Component {
  state = {on: false, input: '',
          mainColor: 'blue'}
  handleStrings(str){
    return true
  }
  componentDidMount(){}
  componentWillReceiveProps(){}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ul>
          
            <li>Test 1</li>
            <li>Test 2</li>
            <li>Test 3</li>
          
        </ul>
        <h3 className={this.state.mainColor}>Everyone Okay!</h3>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className='button-state'>{
          this.state.on ? 'Yes!' : 'No!'
        }</p>
        <button onClick={() => this.setState({on:true})}>Click</button>
        <h2>{this.state.input}</h2>
        <input onChange={e => this.setState({input: e.target.value})} type ='text'
        />
        <Test />
      </div>
    );
  }
}

export class Link extends Component{
  render(){
    return <a href={this.props.address}>Click</a>
  }
}

export default App;
