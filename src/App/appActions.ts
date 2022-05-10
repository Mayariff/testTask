import {createAction} from '@reduxjs/toolkit'
import {RequestStatusType} from "./app-reduser";



const setAppStatus= createAction<{status: RequestStatusType}>('APP/setAppStatusAC')
const setAppError = createAction<{error: string}>('APP/setAppErrorAC')

export const appActions = {
    setAppStatus,
    setAppError
}