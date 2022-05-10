import {asyncActions,  slice} from "./contacts-reduser";
import {contactResponseType} from "../../API";



let contactsReducer = slice.reducer

let userId: string
let startState: Array<contactResponseType>

beforeEach(() => {
    userId = '123'
    startState = [
            {   name: "Alexa",
                surname: "Petrova",
                email: "hanna@gmail.ru",
                phone: "+7 777 666",
                userId: userId,
                id: "1",
                avatar: "https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg"
            },
            {name: "Alexa",
                surname: "Petrova",
                email: "hanna@gmail.ru",
                phone: "+7 777 666",
                userId: userId,
                id: "2",
                avatar: "https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg"
            },
        {name: "Alexa",
            surname: "Petrova",
            email: "hanna@gmail.ru",
            phone: "+7 777 666",
            userId: userId,
            id: "2",
            avatar: "https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg"
        }
    ]
})
test('Contacts should be added', () => {

    let payload = {contacts: startState}
    const action = asyncActions.fetchContacts.fulfilled(payload, "requestId", {userId})
    const endState = contactsReducer([], action)
    expect(endState.length).toBe(3)
})