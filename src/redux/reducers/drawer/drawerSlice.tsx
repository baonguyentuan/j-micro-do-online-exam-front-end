import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PropsDrawerModifierModel } from '../../../_core/DrawerModel';
import { ReactElement } from 'react';

const initialState: PropsDrawerModifierModel = {
    isOpen: false,
    title: '',
    component: <p>123</p>,
    submit: () => console.log(1)
}

const drawerSlice = createSlice({
    name: "drawerSlice",
    initialState,
    reducers: {
        openDrawer: (state: PropsDrawerModifierModel) => {
            state.isOpen = true
        },
        closeDrawer: (state: PropsDrawerModifierModel) => {
            state.isOpen = false
        },
        setDrawerInfo: (state: PropsDrawerModifierModel, action: PayloadAction<{ title: string, component: ReactElement, submit: () => void }>) => {
            state.isOpen = true
            state.title = action.payload.title
            state.component = action.payload.component
            state.submit = action.payload.submit
        }
    }
});

export const { openDrawer, closeDrawer, setDrawerInfo } = drawerSlice.actions

export default drawerSlice.reducer