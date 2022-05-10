import axios, { AxiosResponse } from "axios";
import {ContactModelType, contactResponseType, loginDataType, loginResponseType} from "./index";

const instance = axios.create({
    baseURL: 'http://localhost:3004/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const authAPI={
    login(data: loginDataType){
        return instance.get<Array<loginResponseType>>(`security_data/?email=${data.email}&password=${data.password}`,)
    }
}
export const contactsAPI={
    getContacts(userId:string){
      return instance.get<Array<contactResponseType>>(`user/${userId}/contacts`)
    },
    deleteContact(id:string){
        return instance.delete(`/contacts/${id}`)
    },
    updateContact(data:{id:string, model: ContactModelType}){
        return instance.put<ContactModelType, AxiosResponse<contactResponseType>>(`contacts/${data.id}`,data.model)
    },
    addContact(model: ContactModelType){
        return instance.post(`contacts`,model)
    }
}

