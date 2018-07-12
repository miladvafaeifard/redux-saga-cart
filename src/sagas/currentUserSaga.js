import { call, take, put, apply } from 'redux-saga/effects';
import { GET_CURRENT_USER_INFO, setCurrentUser  } from './../actions';

export function* currentUserSaga() {
    const { id } = yield take(GET_CURRENT_USER_INFO);
    const response = yield call(fetch, `http://localhost:8081/user/${id}`);
    const data = yield apply(response, response.json);
    yield put(setCurrentUser(data));
}  

/*
* Experiment take, put and call effects.
*/

// export function* currentUserSaga2() {
//     yield effects.take('GET_STATE');
//     console.info('get state ... 1');
//     yield effects.take('SET_STATE');
//     console.info('set state ... 2');
// }

// export function* putAction() {
//     yield effects.put({
//         type: 'GET_STATE',
//         value: 34
//     });

//     yield delay(5000);

//     yield effects.put({
//         type: 'SET_STATE',
//         value: 34
//     });
// }