import React, { Component } from 'react';
import Header from './Components/Header/Header'
import BodyContainer from './Components/Body/BodyContainer'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }

    this.setGlobalTotal = this.setGlobalTotal.bind(this)
  }

  setGlobalTotal(total) {
    this.setState({
      total
    })
  }

  render() {
    return (
      <div className="App">
        <Header total={this.state.total} />
        <BodyContainer setGlobalTotal={this.setGlobalTotal} />
      </div>
    );
  }
}

export default App;
