import React, {useCallback, useState} from 'react';
import s from "./Contact.module.scss"
import {DeleteOutlinedIcon, EmailOutlinedIcon, IconButton, ModeEditOutlinedIcon, Paper, PhoneOutlinedIcon} from "../../../styles/mui";
import {Modal, UpdateContact} from "../../Modal";
import {useAppDispatch} from "../../../costomHooks";
import {asyncActions, contactType} from "../";


const Contact = React.memo(({contact}: contactType) => {
    const {name, surname, email, phone, id, avatar, contactInfo} = contact
    const dispatch = useAppDispatch()
    // картинка, если на сервере контакт без нее
    const image = {
        backgroundImage: avatar? `url(${avatar})`: `url(https://st2.depositphotos.com/3528133/8544/i/450/depositphotos_85443334-stock-photo-maneki-neko-cat-figurine-lucky.jpg)`
    }
    // удалить контакт
  const  deleteContactHandler =useCallback(()=>{
        dispatch(asyncActions.removeContact({id}))
  },[id,dispatch])

    //API модального окна 'изменить контакт'
    const [addModal, setAddModal] = useState(false);
    //закрыть модалку
    const closeModal = useCallback(() => {setAddModal(false)},[setAddModal])
    //открыть модалку
    const clickBtnUpdateContactHandler =useCallback(() => {
        setAddModal(true)
    },[setAddModal])

    return (<>
        <div className={s.contactContainer} >
            <Paper elevation={3}>
                <div className={s.contentBox} >
                    <div className={s.avatarBox} style={image}> </div>
                    <div className={s.info}>
                        <h3 className={s.name}>
                            {name} {surname}
                        </h3>
                        <p className={contactInfo? s.aboutContact: `${s.aboutContact} ${s.hidden}` }>
                            {contactInfo? contactInfo : 'About contact' }
                        </p>
                        <div className={s.contactDetails}>
                            <a className={`${s.contact} ${s.first}`} href={`tel:${phone}`}>
                                <IconButton aria-label="previous">
                                    <PhoneOutlinedIcon/>
                                </IconButton>
                                {phone}
                            </a>
                            <a className={s.contact} href={`mailto:${email}`}>
                                <IconButton aria-label="previous">
                                    <EmailOutlinedIcon/>
                                </IconButton>
                                {email}
                            </a>
                        </div>
                    </div>
                    <div className={s.deleteIcon}>
                        <IconButton aria-label="previous" onClick={clickBtnUpdateContactHandler}>
                            <ModeEditOutlinedIcon fontSize={'small'} />
                        </IconButton>
                        <IconButton aria-label="previous" onClick={deleteContactHandler}>
                            <DeleteOutlinedIcon fontSize={'small'}/>
                        </IconButton>
                    </div>
                </div>
            </Paper>
        </div>
            <Modal isOpen={addModal}  closeModal={closeModal}>
                <UpdateContact showAdd={setAddModal} contact={contact} />
            </Modal>
        </>
    );
});

export default Contact;

