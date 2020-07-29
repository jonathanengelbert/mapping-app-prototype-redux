import {combineReducers} from "redux";
import {addLayerReducer} from "./addLayerReducer";
import {dummyDataReducer} from "./testReducer";
interface IAppState {
    layers: any[],
}

const INITIAL_STATE: IAppState = {
    layers: [],
};


export const rootReducer = combineReducers({
    addLayerReducer,
        // dummyDataReducer,
});



