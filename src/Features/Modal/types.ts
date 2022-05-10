import {ReactElement} from "react";
import {contactResponseType} from "../../API";

export type ReturnComponentType = Nullable<ReactElement>;
export type Nullable<T> = T | null;
export type ModalType = {
    children: React.ReactElement
    isOpen: boolean
    closeModal: ()=>void
}

export type updateContactType = {
    showAdd: (modal: boolean) => void
    contact: contactResponseType
}

export type AddContactType = {
    showAdd: (modal: boolean) => void
}