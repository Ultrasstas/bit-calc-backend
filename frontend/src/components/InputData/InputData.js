import React from 'react';
import { connect } from 'react-redux';
import {ButtonPreLoader} from '../ButtonPreLoader/ButtonPreLoader';
import ExclamationCircle from '../../icons/exclamation-circle.svg';
import {getCalculatedData} from '../../store/actions/calcData';
import './InputData.css';

const regExFloat = /^\d*(\.\d{0,8})?$/;

class InputData extends React.Component {

    constructor(props) {
        super(props);
        this.sendData = this.sendData.bind(this);
        this.onInput = this.onInput.bind(this);
        this.state = {
            BAYValue: '10000',
            errorText: '',
            yearsValue: '5',
        }
    }

    componentDidMount() {
        const data = {
            coins: this.state.BAYValue,
            currency: this.props.activeCurrency,
            period: parseInt(this.state.yearsValue, 10)*12
        };
        this.props.getCalculatedData(data);
    }

    onInput(event) {
        this.setState({[event.currentTarget.name]: event.currentTarget.value});

        // Check errors
        if(event.currentTarget.name === 'BAYValue' && !regExFloat.test(event.currentTarget.value)) {
            console.log('BAYValue false', event.currentTarget.name, !regExFloat.test(event.currentTarget.value));
            this.setState({errorText: 'Please enter a number in both fields'});
            return false;
        } else if (event.currentTarget.name === 'yearsValue' && !/^[0-9]+$/g.test(event.currentTarget.value)) {
            this.setState({errorText: 'Please enter a number in both fields'});
            return false;
        } else {
            // If validation passed - reset error
            this.setState({errorText: ''});
        }
    }

    sendData(event) {
        event.preventDefault();
        if (this.state.BAYValue === '' || this.state.yearsValue === '') {
            this.setState({errorText: 'Please enter a number in both fields'});
            return false;
        }
        const data = {
            coins: this.state.BAYValue,
            currency: this.props.activeCurrency,
            period: parseInt(this.state.yearsValue, 10)*12
        };
        this.props.getCalculatedData(data);
        this.setState({errorText: ''});
    }

    render() {
        return (
            <div>
                <div className="css-input-title">I own ... BAY and plan to hold for ... </div>
                <form onSubmit={this.sendData} className="form-flex-row">
                    <div className="input-flex-row input">
                        <input className={`css-input bay-amount ${this.state.errorText ? 'error' : ''}`} name="BAYValue" value={this.state.BAYValue} onChange={(event) => this.onInput(event)} type="text"/>
                        <span className="bay-amount-abs">BAY</span>
                        <input className={`css-input time-period ${this.state.errorText ? 'error' : ''}`} name="yearsValue" value={this.state.yearsValue} onChange={(event) => this.onInput(event)} type="text"/>
                        <span className="time-period-abs">Years</span>
                    </div>
                    <div className="input-flex-row input">
                        {
                            this.props.isRequesting ?
                                <div className="css-submit-loader" ><ButtonPreLoader/></div> :
                                <input className="css-submit" type="submit" value='Calculate Reward'/>
                        }
                    </div>
                </form>
                { this.state.errorText !== '' ? <div className="input-error"><img width={12} height={12} src={`${ExclamationCircle}`} alt=""/>&nbsp;{this.state.errorText}</div> : null }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getCalculatedData: (data) => {
        dispatch(getCalculatedData(data));
    },
});

const mapStateToProps = state => ({
    isRequesting: state.calcData.isRequesting,
    activeCurrency: state.calcData.activeCurrency,
});

export default connect(mapStateToProps, mapDispatchToProps)(InputData);