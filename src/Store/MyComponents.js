import { createSlice } from '@reduxjs/toolkit'

const MyComponents = createSlice({
    name: 'myComponents',
    initialState: [],
    reducers: {
        addNewComponent: (state, action) => {
            state.push(action.payload)
            return state
        },
        deleteComponent: (state, action) => {
            state = state.filter(({ componentId }) => componentId !== action.payload.componentId)
            return state
        },
        setContent: (state, action) => {
            let index = state.findIndex(({ componentId }) => componentId === action.payload.componentId)
            state[ index ].content = action.payload.content
            return state
        },
        addCssProperty: (state, action) => {
            let index = state.findIndex(({ componentId }) => componentId === action.payload.componentId)
            state[ index ].style[ action.payload.property ] = action.payload.value
            return state
        },
        deleteCssProperty: (state, action) => {
            let index = state.findIndex(({ componentId }) => componentId === action.payload.componentId)
            delete state[ index ].style[ action.payload.property ]
            return state
        },
        addFunction: (state, action) => {
            let index = state.findIndex(({ componentId }) => componentId === action.payload.componentId)
            state[ index ].functions.push({ name: action.payload.name, code: action.payload.code })
            return state
        },
        removeFunction: (state, action) => {
            let index = state.findIndex(({ componentId }) => componentId === action.payload.componentId)
            state[ index ].functions = state[ index ].functions.filter(func => func.name !== action.payload.name)
            return state
        },
    },
})

export const {
    addNewComponent,
    deleteComponent,
    setContent,
    addCssProperty,
    deleteCssProperty,
    addFunction,
    removeFunction,
} = MyComponents.actions

export default MyComponents