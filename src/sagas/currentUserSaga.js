import { delay, effects } from 'redux-saga';

export function* currentUserSaga() {
    while(true){
        yield delay(1000);
    }
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