interface IAppStateDummy {
    dummyData: any[],
}

const INITIAL_STATE: IAppStateDummy = {
    dummyData: [],
}

export function dummyDataReducer (state =INITIAL_STATE, action: { type: any; dummyData: any; }) {
    switch (action.type) {
        case "ADD_DUMMY":
            state.dummyData = [
                ...state.dummyData,
                action.dummyData
            ];

            return state;

        default:
            return state;
    }
}
