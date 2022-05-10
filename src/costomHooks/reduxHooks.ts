import {AppRootStateType, store} from "../App/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export type appDispatchType= ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
