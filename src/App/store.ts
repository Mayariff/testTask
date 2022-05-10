import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {loginReducer} from "../Features/Login/login-reduser";
import {contactsReducer} from "../Features/Contacts/contacts-reduser";
import {appReducer} from "./app-reduser";

const rootReducer = combineReducers({
    login: loginReducer,
    contacts: contactsReducer,
    app: appReducer
})



//создаем стор
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunk),
})

//  тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

