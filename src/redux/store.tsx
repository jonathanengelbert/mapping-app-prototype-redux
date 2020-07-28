import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import { rootSaga} from "./sagas";
import {rootReducer} from "./reducers/rootReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
// @ts-ignore
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware),
    )
);

sagaMiddleware.run(rootSaga);


