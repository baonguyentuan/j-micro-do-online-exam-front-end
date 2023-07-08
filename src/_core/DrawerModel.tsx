import { ReactElement } from "react";

export interface PropsDrawerModifierModel {
    isOpen: boolean
    title: string,
    component: ReactElement,
    submit: ()=>void 
}