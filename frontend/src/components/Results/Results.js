import React from 'react';
import { connect } from 'react-redux';
import Dropdown from '../Dropdown/Dropdown';
import {RedStar} from '../RedStar/RedStar';
import { openDropdown, getCurrencies } from '../../store/actions/calcData';
import './Results.css';
import AngleUp from '../../icons/angle-up.svg';

class Results extends React.Component {

    constructor(props) {
        super(props);
        console.log('props ', props);
        this.openDropdown = this.openDropdown.bind(this);
        this.state = {
            currencyName: 'USD'
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.activeCurrency !== newProps.activeCurrency) {
            const newCurrency = this.props.currencies.find(currency => currency.id === newProps.activeCurrency)
            this.setState({currencyName: newCurrency.name})
        }

    }

    componentDidMount() {
        this.props.getCurrencies();
    }

    openDropdown() {
        this.props.openDropdown();
    }

    render() {
        console.log('isDropdownOpen', this.props.isDropdownOpen);
        return (
            <div className="results-flex-row half-container">

                <div className="result-flex-column">
                    <div className="css-input-title">Total Reward(1%/y)</div>
                    <div className="css-result">{this.props.reward}</div>
                </div>

                <div className="result-flex-column">
                    <div className="css-input-title">Total BAY in {this.props.graph.length} months</div>
                    <div className="css-result">{this.props.total}</div>
                </div>

                <div className="result-flex-column">
                    <div className="bottom-text">at current prices</div>
                    <div className="css-input-title dropdown-trigger">
                        <span>Total BAY in {this.state.currencyName}</span>
                        <img onClick={this.openDropdown} className="dropdown-icon" width={24} height={24} color="#424242" src={`${AngleUp}`} alt=""/>
                        {/*<div className="star-outer"><RedStar/></div>*/}
                    </div>

                  <div>
                        { this.props.isDropdownOpen ?
                            <Dropdown { ...this.props}/>  : null
                        }
                    </div>

                    <div className="css-result">{this.props.inCurrency}</div>

                </div>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    openDropdown: () => {
        dispatch(openDropdown());
    },
    getCurrencies: () => {
        dispatch(getCurrencies());
    }
});

const mapStateToProps = state => ({
    isDropdownOpen: state.calcData.isDropdownOpen,
    currencies: state.calcData.currencies,
    inCurrency: state.calcData.inCurrency.toFixed(2),
    reward: state.calcData.reward.toFixed(2),
    total: state.calcData.total.toFixed(2),
    graph: state.calcData.graph,
    activeCurrency: state.calcData.activeCurrency
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);