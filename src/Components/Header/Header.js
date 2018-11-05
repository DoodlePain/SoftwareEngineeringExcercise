import React, { Component } from 'react';
import logo from '../../logo.svg';

class Header extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h3 style={{ color: "white" }}>CryptoWitdget</h3>
                    <h4 style={{ color: "white" }}>Your account value :</h4>
                    <h4 style={{ color: "white" }}>{this.props.total} $</h4>
                </header>
            </div>
        );
    }
}

export default Header;