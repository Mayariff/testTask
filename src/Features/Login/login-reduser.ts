import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../App/app-reduser";
import {handleAsyncError} from "../../utils/error-utils";
import {authAPI, loginDataType} from "../../API";


export const loginTC = createAsyncThunk<{ isLoggedIn: boolean, userId: string}, loginDataType,
    { rejectValue: { error: string} }>('auth/login',
    async (params: loginDataType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await authAPI.login(params)
            if (res.data.length > 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {isLoggedIn: true, userId: res.data[0].userId}
            } else {
               return  handleAsyncError(thunkAPI)
            }
        } catch (err) {
            return handleAsyncError(thunkAPI)
        }
    })

export const logoutTC = createAsyncThunk<{ isLoggedIn: boolean, userId: undefined}, loginDataType,
    { rejectValue: { error: string} }>('auth/logout',
    async (params, thunkAPI)=>{
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await authAPI.login({email:"", password:""})
            if (!res.data.length) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {isLoggedIn: false, userId: undefined}
            } else {
                return handleAsyncError(thunkAPI)
            }
        } catch (err) {
            return handleAsyncError(thunkAPI)
        }
    })

export const slice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        userId: '' as string| undefined
    },
    reducers: {
        setUserId(state, action: PayloadAction<{userId:string}>){
           state.userId = action.payload.userId
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        });
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        });
    }
})

export const loginReducer = slice.reducer
export const {setUserId} = slice.actions
export const asyncActions = {
    loginTC,
    logoutTC
}
export type InitialStateType = {
    isLoggedIn: boolean,
    userId: string| undefined
}
