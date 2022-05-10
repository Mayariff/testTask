import {appActions} from "../App";

export type ThunkAPIType = {
        dispatch: (action: any) => any
        rejectWithValue: Function
        getState: Function
}

export const handleAsyncError = ( thunkAPI: ThunkAPIType) => {
        thunkAPI.dispatch(appActions.setAppError({error:'Some error occurred'}))
        thunkAPI.dispatch(appActions.setAppStatus({status:'failed'}))
        return thunkAPI.rejectWithValue({error:'some error'})
}