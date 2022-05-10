import {AppRootStateType} from "./store";

export const selectStatus = (state: AppRootStateType) => state.app.status
export const selectContacts = (state: AppRootStateType) => state.contacts

