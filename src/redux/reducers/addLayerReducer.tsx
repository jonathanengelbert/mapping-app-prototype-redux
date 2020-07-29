interface IAppState {
    layers: any[],
}

const INITIAL_STATE: IAppState = {
    layers: [],
};

export function addLayerReducer(state =INITIAL_STATE, action: { type: any; layer: any; }) {
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


