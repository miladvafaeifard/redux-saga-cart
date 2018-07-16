import { take, put } from 'redux-saga/effects';
import { SET_CURRENT_USER, setTaxRate } from './../actions';
import fetch from 'isomorphic-fetch';

export function* taxRateSaga() {
    const { user } = yield take(SET_CURRENT_USER);
    const { country } = user;
    const response = yield fetch(`http://localhost:8081/tax/${country}`);
    const { rate } = yield response.json();
    yield put(setTaxRate(rate));
}
