import {AppRootStateType} from "../../App/store";

export const selectIsLoggedIn = (state: AppRootStateType) => state.login.isLoggedIn
export const selectUserId = (state: AppRootStateType) => state.login.userId
