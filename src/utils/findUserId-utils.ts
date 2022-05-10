import {AppRootStateType} from "../App/store";
import {ThunkAPIType} from "./error-utils";

export const findUserId=(thunkAPI: ThunkAPIType)=>{
    const state = thunkAPI.getState() as AppRootStateType
    const userId = state.login.userId
    if (!userId) {
        return thunkAPI.rejectWithValue({error:"User ID not found in the state, try to login again"});
    }else {
        return userId
    }
}