import React from 'react';
import { connect } from 'react-redux';
import './CoinsData.css';

const mockData = [
    {title: 'Coin Supply', value: '1 billion'},
    {title: 'Block Time', value: '64 seconds'},
    {title: 'Nominal stake interest', value: '1% annual'},
    {title: 'Min transaction fee', value: '0.0001 $BAY'},
    {title: 'Confirmations for approval', value: '10'},
    {title: 'Confirmations for maturity', value: '120'}
];

class CoinsData extends React.Component {

    render() {
        return (
            <div className="coins-data-container">

                <div className="coins-data-title">
                    <span>Details: Proof of Stake 3.0 (POS3)</span>
                </div>

                <div className="coins-data-body">
                    {mockData.map(item => (
                        <div key={item.title} className="coins-data-item">
                            <div className="coins-data-item-title">{item.title}</div>
                            <div className="coins-data-item-text">{item.value}</div>
                        </div>
                        )
                    )}
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    isDropdownOpen: state.calcData.isDropdownOpen,
    currencies: state.calcData.currencies,
    inCurrency: state.calcData.inCurrency.toFixed(2),
    reward: state.calcData.reward.toFixed(2),
    total: state.calcData.total.toFixed(2),
    graph: state.calcData.graph,
    activeCurrency: state.calcData.activeCurrency
});

export default connect(mapStateToProps)(CoinsData);