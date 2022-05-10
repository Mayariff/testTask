import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleAsyncError} from "../../utils/error-utils";
import {findUserId} from "../../utils/findUserId-utils";
import {ContactModelType, contactResponseType, contactsAPI} from "../../API";
import {appActions} from "../../App";

// чтоб IU обновлялся, каждый раз после запроса на сервер, снова делаем get запрос

//запрашиваем контакты
export const fetchContacts = createAsyncThunk<{ contacts:Array<contactResponseType>}, {userId:string},
    { rejectValue: { error: string} }>('contacts/fetchContacts', async (param, thunkAPI)=>{
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await contactsAPI.getContacts(param.userId)
        if (res.data.length > 0) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {contacts: res.data}
        } else {
            return handleAsyncError(thunkAPI)
        }
    } catch (err) {
        return handleAsyncError(thunkAPI)
    }
})

//создание контакта
export const createContact = createAsyncThunk<{},ContactModelType,
    { rejectValue: { error: string} }>('contacts/createContact', async(params, thunkAPI)=>{
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    const userId= findUserId(thunkAPI)
    try {
        await contactsAPI.addContact(params)
        thunkAPI.dispatch(fetchContacts({userId}))
        await thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
    }
    catch (err) {
        return handleAsyncError(thunkAPI)
    }
})
    // удаление контакта
export const removeContact = createAsyncThunk<{id:string}, {id:string},
    { rejectValue: { error: string} }>('contacts/removeContact', async (param, thunkAPI)=>{
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    const userId= findUserId(thunkAPI)
    try {
        const res = await contactsAPI.deleteContact(param.id)
        if (!Object.keys(res.data).length) {
            await thunkAPI.dispatch(fetchContacts({userId}))
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            return handleAsyncError(thunkAPI)
        }
    } catch (err) {
        return handleAsyncError(thunkAPI)
    }
})

// изменение контакта
export const updateContact = createAsyncThunk<{id: string, model: ContactModelType},{id: string, model:ContactModelType},
    { rejectValue: { error: string} }>('contacts/updateContact', async(params, thunkAPI)=>{
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    const userId= findUserId(thunkAPI)
    try {
        await contactsAPI.updateContact({id:params.id, model:params.model})
        await thunkAPI.dispatch(fetchContacts({ userId: userId}))
        thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))

    } catch (err) {
        return handleAsyncError(thunkAPI)
    }
})

export const slice = createSlice({
    name: 'contacts',
    initialState: [] as Array<contactResponseType>,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            return action.payload.contacts
        })
    }
})

export const contactsReducer = slice.reducer

export const asyncActions = {
    fetchContacts,
    createContact,
    removeContact,
    updateContact
}