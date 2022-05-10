import { authAPI,contactsAPI } from "./api"

export type loginDataType ={
    email: string,
    password: string
}

export type ContactModelType ={
    userId: string,
    name: string,
    surname: string,
    phone: string,
    email: string,
    avatar?: string
    contactInfo?: string
}


export type loginResponseType ={
    id: string
    userId: string
    email: string
    password: string
}
export type contactResponseType= {
    id: string
    userId: string
    name: string
    surname: string
    phone: string
    email: string
    avatar?: string
    contactInfo?: string
}

export {authAPI,contactsAPI}