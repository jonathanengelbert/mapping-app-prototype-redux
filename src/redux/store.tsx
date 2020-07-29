import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import { rootSaga} from "./sagas";
import {rootReducer} from "./reducers/rootReducer";
import {addLayerReducer} from "./reducers/addLayerReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    // rootReducer,
    addLayerReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware),
    )
);

sagaMiddleware.run(rootSaga);


