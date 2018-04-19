import {
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    SHOW_DROPDOWN,
    HIDE_DROPDOWN,
    SET_CURRENCY,
    GET_CURRENCIES_FAIL,
    GET_CURRENCIES_REQUEST,
    GET_CURRENCIES_SUCCESS,
    GET_CONVERTED_REQUEST,
    GET_CONVERTED_SUCCESS,
    GET_CONVERTED_FAIL
} from '../constants';
import * as moment from 'moment';

const initialState = {
    isRequesting: false,
    graph: [],
    isDropdownOpen: false,
    currencies: [],
    activeCurrency: 'USD',
    reward: 0,
    inCurrency: 0,
    total: 0

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DATA_REQUEST:
        case GET_CONVERTED_REQUEST:
            return {
                ...state,
                isRequesting: true,
            };
        case GET_DATA_SUCCESS:
            const newGraph = action.payload.graph.map(item => {
                item.date = moment(item.date).format('MMM YYYY');
                return item;
            })
            return {
                ...state,
                isRequesting: false,
                graph: newGraph,
                inCurrency: action.payload.inCurrency,
                reward: action.payload.reward,
                total: action.payload.total
            };
        case GET_DATA_FAIL:
            return {
                ...state,
                isRequesting: false,
            };
        case GET_CONVERTED_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                inCurrency: action.payload,
            };
        case GET_CONVERTED_FAIL:
            return {
                ...state,
                isRequesting: false,
            };
        case GET_CURRENCIES_REQUEST:
            return {
                ...state,
                isRequesting: true,
            };
        case GET_CURRENCIES_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                currencies: action.payload
            };
        case GET_CURRENCIES_FAIL:
            return {
                ...state,
                isRequesting: false,
            };
        case SHOW_DROPDOWN:
            return {
                ...state,
                isDropdownOpen: true
            };
        case HIDE_DROPDOWN:
            return {
                ...state,
                isDropdownOpen: false
            };
        case SET_CURRENCY:
            console.log('action', action);
            return {
                ...state,
                activeCurrency: action.payload,
                isDropdownOpen: false
            };
        default:
            return {
                ...state
            }
    }
}