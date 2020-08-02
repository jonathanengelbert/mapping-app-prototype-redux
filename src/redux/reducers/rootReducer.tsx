import {combineReducers} from "redux";
import addLayer from "./addLayerReducer";
import addDummy from "./testReducer";


export const rootReducer = combineReducers({
    addDummy,
    addLayer,
});



