import { put, takeEvery, all, call } from 'redux-saga/effects'
import {getLayer} from "../utils/helpers";


function* addLayerSaga(action: { type: "REQUEST_LAYER", layer: any; id: any; }) {
    console.log("ACTION", action.id)
    // @ts-ignore
    const data = yield call(getLayer, action.layer, action.id);
    yield put({
        type:"ADD_LAYER",
        layer: data,
        id: action.id
    });

}

export function *rootSaga() {
    yield all([
        takeEvery("REQUEST_LAYER", addLayerSaga),
    ])
}


