import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const slice = createSlice({
    name: 'APP',
    initialState: {
        status: 'idle',
        error: '',
    },
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string }>) {
                state.error = action.payload.error
        },
    }
    })

export const appReducer = slice.reducer;
export const {setAppErrorAC, setAppStatusAC} = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
/*export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>*/


export type InitialStateType = {
    status: RequestStatusType
    error: string
}