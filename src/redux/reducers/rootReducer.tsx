interface IAppState {
    layers: any[],
    activeLayer: boolean
}

const INITIAL_STATE: IAppState = {
    layers: [],
    activeLayer: false
};


export function rootReducer(state =INITIAL_STATE, action: { type: any; layer: any; }) {
    switch (action.type) {
        case "ADD_LAYER":
            state.layers = [
                ...state.layers,
                action.layer
            ];

            return state;

        default:
            return state;
    }
}


