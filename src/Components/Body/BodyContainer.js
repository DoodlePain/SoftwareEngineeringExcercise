import React, { Component } from 'react';
import firebase from 'firebase'
import price from 'crypto-price';
import { ControlLabel, FormControl, Col, Row, Collapse } from 'react-bootstrap';
import config from '../../Utils/Api'
import CurrencyData from "./Currency/CurrencyData";

class BodyContainer extends Component {

    // Lifecycle hooks

    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            actual: null,
            database: null,
            modify: false
        }

        this.applyModifies = this.applyModifies.bind(this)
    }


    // open database connection + fetch data

    async componentDidMount() {
        firebase.initializeApp(config)
        await firebase.database().ref('/users').on('value', (snap) => {
            this.setState({ database: snap.val() })
        })
    }

    // update dom conditions
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.total !== nextProps.total) return true
        if (this.state !== nextState) return true
        return false
    }

    // Lifecycle hooks END 

    // Custom functions 

    // set total account value  
    async setTotal() {
        var total = 0
        if (this.state.total === 0) {
            Object.keys(this.state.database).map(index => {
                return price.getCryptoPrice('USD', index).then(obj => {
                    total = total + (this.state.database[index].amount * parseInt(obj.price))
                    this.props.setGlobalTotal(total)
                })
            })
        }
    }

    // change selected crypto
    setCrypto(name) {
        this.setState({ actual: name })
    }

    // send data to the database
    applyModifies(amount) {
        var database = this.state.database
        database[this.state.actual].amount = amount
        this.setState(database)
        firebase.database().ref('/users').set(database)
    }

    // Custom functions END 

    render() {
        var renderData = {}
        var optionsArray = []
        if (this.state.database !== null) {
            this.setTotal()
            Object.keys(this.state.database).map((index) => {
                var currency = this.state.database[index]
                renderData[currency.currency] = parseInt(currency.amount)
                return optionsArray.push(<option onClick={this.setCrypto.bind(this, currency.currency)} key={index} value={currency.currency}>{currency.currency}</option>)
            })
        }
        return (
            <div>
                <ControlLabel>Select a currency</ControlLabel>

                {/* Currency chooser */}
                <Row>
                    <Col xs={6} md={4} />
                    <Col xs={6} md={4} >
                        <FormControl componentClass="select" >
                            <option onClick={() => { this.setState({ actual: null }) }}>Add a currency</option>
                            {optionsArray}
                        </FormControl>
                    </Col>
                    <Col xs={6} md={4} />
                </Row>
                {/* Currency chooser END */}


                {/* Control buttons */}
                <Row>
                    <Collapse in={this.state.actual !== null} >
                        <div>
                            <Col xs={6} md={4} />
                            <Col xs={6} md={4} >
                                {/* <AddCurrency actual={this.state.actual} amount={(this.state.database !== null && this.state.actual !== null) ? this.state.database[this.state.actual].amount : 0} /> */}
                                <CurrencyData
                                    actual={this.state.actual}
                                    amount={(this.state.database !== null && this.state.actual !== null) ? this.state.database[this.state.actual].amount : 0}
                                    applyModifies={this.applyModifies}
                                />

                            </Col>
                            <Col xs={6} md={4} />
                        </div>
                    </Collapse>
                </Row>
                {/* Control buttons END*/}


            </div >
        );
    }
}

export default BodyContainer;