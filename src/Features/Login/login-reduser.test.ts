import {InitialStateType, loginTC, logoutTC, setUserId, slice} from "./login-reduser";
import {loginDataType} from "../../API";


let loginReducer= slice.reducer

let startState: InitialStateType

beforeEach(() => {
    startState = {
        isLoggedIn: false,
        userId:''
    }
})

test('User should be log in', () => {
 const payload= {email:"1234@yandex.ru", password:"1234"}
    const action = loginTC.fulfilled({ isLoggedIn: false, userId:'1'}, "requestId", payload)
    const endState = loginReducer(startState, action)

    expect(endState.isLoggedIn).toBe(true)
})

test('User should be log out', () => {
    const payload= {email:"", password:""} as loginDataType
    const action = logoutTC.fulfilled({ isLoggedIn: true, userId:undefined}, "requestId", payload)
    const endState = loginReducer(startState, action)

    expect(endState.isLoggedIn).toBe(false)
})

test('UserID should be as in payload', () => {
    const payload= {userId: '333'}
    const endState = loginReducer(startState, setUserId(payload))
    expect(endState.userId).toBe('333');
})