import {createSlice} from "@reduxjs/toolkit";
import {create} from "domain";

// interface IAppState {
//     layers: any[],
// }

// const INITIAL_STATE: IAppState = {
//     layers: [],
// };

// export function addLayerReducer(state={layers:[]}, action: { type: any; layer: any; }) {
//     switch (action.type) {
//         case "ADD_LAYER":
//             // @ts-ignore
//             state.layers = [
//                 ...state.layers,
//                 action.layer
//             ];
//
//             return state;
//
//         default:
//             return state;
//     }
// }

interface IiniitalState {
    layers: any[]
}


const layerSlice = createSlice({
    name: 'layers',
    initialState: { layers: [] },
    reducers: {
        addLayer(state, action) {
            // @ts-ignore
            state.push(action.layer);
        }
    }
});

export const {addLayer} = layerSlice.actions;

export default layerSlice.reducer;
