import {appReducer, InitialStateType} from "./app-reduser";
import {appActions} from "./appActions";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: '',
        status: 'idle',
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, appActions.setAppError({error: 'some error'}))
    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {
    const endState = appReducer(startState, appActions.setAppStatus({status: 'loading'}))
    expect(endState.status).toBe('loading');
})
