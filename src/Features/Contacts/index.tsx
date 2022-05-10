import Contact from "./Contact/Contact";
import Contacts from "./Contacts";
import { asyncActions } from "./contacts-reduser";
import {contactResponseType} from "../../API";

export type contactType = {
    contact: contactResponseType
}

export {Contact,Contacts, asyncActions}