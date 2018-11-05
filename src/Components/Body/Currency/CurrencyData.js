import React, { Component } from 'react';
import { Collapse, Fade, FormControl, Button } from 'react-bootstrap'

class CurrencyData extends Component {

    // Lifecycle hooks
    constructor(props) {
        super(props)

        this.state = {
            forceUpdate: false,
            value: this.props.amount,
            modify: false,
        }

        this.current = 0
        this.cut = 0
        this.trend = 0

        this.handleAmountUpdate = this.handleAmountUpdate.bind(this)
        this.getCurrencyRealtimeData = this.getCurrencyRealtimeData.bind(this)
    }

    // update dom conditions

    async shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.actual !== this.props.actual) {
            await this.getCurrencyRealtimeData(nextProps.actual)
            this.setState((state) => ({ value: nextProps.amount }))
            return true
        }
        if (this.state.forceUpdate) {
            this.setState((state) => ({ forceUpdate: false }))
            return true
        }
        return false
    }

    // Lifecycle hooks END


    // Custom functions

    // get cryptocurrency realtime data
    getCurrencyRealtimeData(label) {
        fetch(`https://api.cryptonator.com/api/full/${label}-usd`)
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    const ticker = data.ticker
                    this.current = ticker.price
                    this.cut = ticker.price * this.props.amount
                    this.trend = ticker.change
                    this.setState({ forceUpdate: true })
                }
            })
    }

    // handle actual crypto amount
    handleAmountUpdate(e) {
        this.setState({ value: e.target.value });
    }

    // Custom functions END

    render() {
        const { actual } = this.props
        return (
            <Collapse in={(actual !== null)}>
                <div>
                    <h2>{actual}</h2>
                    <h4>Current price : {this.current} USD</h4>
                    <Collapse in={!this.state.modify}>
                        <Fade in={!this.state.modify}>
                            <h4>Your amount : {this.state.value} </h4>
                        </Fade>
                    </Collapse>
                    <Fade in={this.state.modify}>
                        <Collapse in={this.state.modify}>
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="Enter Amount"
                                onChange={this.handleAmountUpdate}
                            />
                        </Collapse>
                    </Fade>
                    <h4>Your cut : {this.cut} $</h4>
                    <h4>Daily trend : {this.trend} $</h4>
                    <Button
                        onClick={() => {
                            if (this.state.modify) this.props.applyModifies(this.state.value);
                            this.setState({ modify: !this.state.modify })
                        }}>
                        {this.state.modify ? "Apply" : "Modify"}
                    </Button>
                </div >
            </Collapse>
        );
    }
}

export default CurrencyData;