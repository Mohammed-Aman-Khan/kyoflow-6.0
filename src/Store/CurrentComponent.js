import { createSlice } from '@reduxjs/toolkit'

const CurrentComponent = createSlice({
    name: 'currentComponent',
    initialState: null,
    reducers: {
        setCurrentComponent: (state, action) => {
            return action.payload
        },
        resetCurrentComponent: (state, action) => {
            return null
        },
    },
})

export const {
    setCurrentComponent,
    resetCurrentComponent,
} = CurrentComponent.actions

export default CurrentComponent