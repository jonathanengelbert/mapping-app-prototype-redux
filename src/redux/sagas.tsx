import { put, takeEvery, all } from 'redux-saga/effects'


const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

// ...

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
    yield delay(3000);
    yield put({ type: 'INCREMENT' });
}

function* decrementAsync() {
    yield delay(3000);
    yield put({ type: 'DECREMENT' });
}

export function *rootSaga() {
    yield all([
        takeEvery("TEST", incrementAsync),
        takeEvery("DECREMENT_ASYNC", decrementAsync)

    ])
}

