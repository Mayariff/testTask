import {selectIsLoggedIn, selectUserId} from "./selectors";
import {asyncActions, slice} from "./login-reduser";


const loginActions = {
    ...asyncActions,
    ...slice.actions
}
export {selectIsLoggedIn,selectUserId, loginActions}