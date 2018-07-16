import { take, call, put, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import { TOGGLE_CHECKING_OUT, setCheckoutPhase, QUANTITY_VERIFICATION_CHECKOUT_PHASE, ERROR_CHECKOUT_PHASE, CREDIT_VALIDATION_CHECKOUT_PHASE, PURCHASE_FINALIZATION_CHECKOUT_PHASE, SUCCESS_CHECKOUT_PHASE } from '../actions';
import { currentUserSelector } from '../selectors';


function* validate({user, kind}) {
    const response = yield fetch(`http://localhost:8081/${kind}/validate/${user.get('id')}`);
    const { validated } = yield response.json();
    return validated;
}

function* executePurchase(user) {
    const response = yield fetch(`http://localhost:8081/card/charge/${user.get('id')}`);
    const { success } = yield response.json();
    return success;
}

function* checkout() {
    const user = yield select(currentUserSelector);
    yield put(setCheckoutPhase(QUANTITY_VERIFICATION_CHECKOUT_PHASE));
    const cartValidated = yield call(validate, {user , kind: 'cart'});
    if(!cartValidated) {
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
        return;
    }

    console.log('validated cart');

    yield put(setCheckoutPhase(CREDIT_VALIDATION_CHECKOUT_PHASE));
    const creditCardValidated = yield call(validate, {user , kind: 'card'});
    if(!creditCardValidated) {
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
        return;
    }

    yield put(setCheckoutPhase(PURCHASE_FINALIZATION_CHECKOUT_PHASE));

    const purchageSuccessful = yield call(executePurchase, user);
    if(!purchageSuccessful) {
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
        return;
    }

    yield put(setCheckoutPhase(SUCCESS_CHECKOUT_PHASE));
}

export function* checkoutSaga() {
    while (true) {
        console.log('checking...!');
        const isCheckingOut = yield take(TOGGLE_CHECKING_OUT);
        if (isCheckingOut) {
            yield call(checkout);
        }
    }
}