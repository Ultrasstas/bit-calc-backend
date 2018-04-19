import request from 'superagent';
import { apiRequest, apiSuccess, apiFail } from './api';

import {
    BASE_URL,
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

export const getCalculatedData = calcData => async (dispatch) => {
    dispatch(apiRequest(GET_DATA_REQUEST));

    console.log('calcData', calcData);

    request.post(`${BASE_URL}/calculate`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(calcData)
        .end((err, res) => {
            console.log('err', err);
            console.log('res', res);
            if (err || !res.body ) {
                dispatch(apiFail(GET_DATA_FAIL));
            } else {
                dispatch(apiSuccess(GET_DATA_SUCCESS, res.body));
            }
        });

};

export const getTotalInCurrency = calcData => async (dispatch) => {
    dispatch(apiRequest(GET_CONVERTED_REQUEST));

    console.log('calcData', calcData);

    request.post(`${BASE_URL}/convert`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(calcData)
        .end((err, res) => {
            console.log('err', err);
            console.log('res', res);
            if (err || !res.body ) {
                dispatch(apiFail(GET_CONVERTED_FAIL));
            } else {
                dispatch(apiSuccess(GET_CONVERTED_SUCCESS, res.body.inCurrency));
            }
        });

};

export const getCurrencies = () => async (dispatch) => {
    dispatch(apiRequest(GET_CURRENCIES_REQUEST));

    request.get(`${BASE_URL}/currencies`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
            console.log('err', err);
            console.log('res', res);
            if (err || !res.body ) {
                dispatch(apiFail(GET_CURRENCIES_FAIL));
            } else {
                dispatch(apiSuccess(GET_CURRENCIES_SUCCESS, res.body.currency));
            }
        });

};

export const openDropdown = () => async (dispatch) => {
    dispatch(apiRequest(SHOW_DROPDOWN));
}

export const closeDropdown = () => async (dispatch) => {
    dispatch(apiRequest(HIDE_DROPDOWN));
}

export const setCurrency = (id) => async (dispatch) => {
    dispatch(apiSuccess(SET_CURRENCY, id));
}