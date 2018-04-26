import React from 'react';
import { connect } from 'react-redux';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import './CoinsData.css';

const mockData = [
    {id: 'q1', title: 'Coin Supply', value: '1 billion', tooltip: 'Current amount of coins in circulation'},
    {id: 'q2', title: 'Block Time', value: '64 seconds', tooltip: 'The time needed for a new block to be generated.<br/> It\'s also the time to send & receive a transaction.<br/> Blocks contain the transaction data and address balances'},
    {id: 'q3', title: 'Nominal stake interest', value: '1% annual', tooltip: 'Flat APR of generated coins awarded to stakers<br/> relative to the total supply amount of coins.<br/> It\'s also the minimum interest you can get when staking.<br/> The generated coins are awarded through stake rewards of 20 coins'},
    {id: 'q4', title: 'Min transaction fee', value: '0.0001 $BAY', tooltip: 'The minimum viable fee to send a transaction,<br/> paid to the network'},
    {id: 'q5', title: 'Confirmations for approval', value: '10', tooltip: 'Estimated amount of blocks generated to be sure<br/> the transaction has been fully broadcasted and confirmed<br/> by the entire blockchain network'},
    {id: 'q6', title: 'Confirmations for maturity', value: '120', tooltip: 'Estimated amount of blocks generated<br/> to be sure the original block<br/> is completely spendable'}
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
                            <div className="coins-data-item-title">{item.title}<span><CustomTooltip tooltipId={item.id} tooltipText={item.tooltip}/></span></div>
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