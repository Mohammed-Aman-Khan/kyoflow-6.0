import { configureStore } from '@reduxjs/toolkit'
import MyComponents from './MyComponents'
import CurrentComponent from './CurrentComponent'

export default configureStore({
    reducer: {
        currentComponent: CurrentComponent.reducer,
        myComponents: MyComponents.reducer,
    },
})