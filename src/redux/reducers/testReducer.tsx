import { createSlice } from '@reduxjs/toolkit'

const dummyDataSlice = createSlice({
    name: 'dummy',
    initialState: {dummyData: []},
    reducers: {
        addDummy(state, action) {
            // @ts-ignore
            state.dummyData.push(action.dummyData);
        },
        // toggleTodo(state, action) {
        //     const todo = state.find(todo => todo.id === action.payload)
        //     if (todo) {
        //         todo.completed = !todo.completed
        //     }
        // }
    }
})

export const { addDummy } = dummyDataSlice.actions;

export default dummyDataSlice.reducer