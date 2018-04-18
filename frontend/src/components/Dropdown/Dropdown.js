import React from 'react';
import { connect } from 'react-redux';
import {RedStar} from '../RedStar/RedStar';
import { closeDropdown, setCurrency } from '../../store/actions/calcData';
import './Dropdown.css';
import AngleDown from '../../icons/angle-down.svg';


class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        console.log(props);
    }

    handleClose(id) {
        // this.props.closeDropdown();
        console.log(id);
        this.props.setCurrency(id)
    }

    render() {
        return (
            <div className="dropdown">
                <img className="dropdown-icon-close" width={24} height={24} color="#424242" src={`${AngleDown}`} alt=""/>
                {
                    this.props.currencies.map(currency => (
                        <div onClick={() => this.handleClose(currency.id)}  key={currency.id} className={`currency-name ${currency.id === this.props.activeCurrency ? 'active' : ''}`}>{currency.name}
                            { currency.isCompulsory ? <div className="star-inner"><RedStar/></div> : null }
                        </div>)
                    )
                }

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    closeDropdown: () => {
        dispatch(closeDropdown());
    },
    setCurrency: (id) => {
        dispatch(setCurrency(id));
    },
});

const mapStateToProps = state => ({
    isDropdownOpen: state.calcData.isDropdownOpen,
    currencies: state.calcData.currencies,
    activeCurrency: state.calcData.activeCurrency,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);