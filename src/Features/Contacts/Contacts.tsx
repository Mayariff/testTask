import React, {ChangeEvent, useCallback, useDeferredValue, useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import s from './Contacts.module.scss'
import {AddContact, Modal} from "../Modal";
import {Button, InputAdornment, SearchOutlinedIcon, TextField} from "../../styles/mui";
import {useAppDispatch, useAppSelector} from "../../costomHooks";
import {selectIsLoggedIn, selectUserId} from "../Login";
import {Contact, asyncActions} from "./index";
import {PATH} from "../../Routing";
import {selectContacts} from "../../App";
import {contactResponseType} from "../../API";


const Contacts = React.memo(() => {

    const userId= useAppSelector(selectUserId)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const contacts = useAppSelector(selectContacts) as Array<contactResponseType>

    const navigate= useNavigate()
    const dispatch = useAppDispatch()

     //для поисковой строки
    const [searchValue, setSearchValue] = useState<string>('')
    //отложенная отрисовка https://ru.reactjs.org/docs/concurrent-mode-reference.html#usedeferredvalue
    const deferredText = useDeferredValue(searchValue);
    //обработчик для изменения инпута
    const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),[setSearchValue])
    //фильтруем  массив
    const filterValues = contacts && contacts.filter(c=> {
        return Object.values(c).toString().toLowerCase().includes(deferredText.toLowerCase())  })

    //API модального окна 'добавить контакт'
    const [addModal, setAddModal] = useState(false);
    //закрыть модалку
    const closeModal = useCallback(() => {setAddModal(false)}, [setAddModal])
    //открыть модалку
    const clickBtnAddContactHandler = () => {setAddModal(true)}


    useEffect(() => {
        if (!isLoggedIn) {
            navigate(PATH.LOGIN_PAGE);
        }
      if(userId) {
          dispatch(asyncActions.fetchContacts({userId}))
      }
    }, [dispatch, isLoggedIn,navigate,userId])

    return (
        <div className={s.container}>
            <div className={s.contactMenu}>
                <Button variant="contained" sx={{backgroundColor: '#5181b8'}} onClick={clickBtnAddContactHandler}> Add Contact </Button>
                <TextField color={'primary'}
                           value={searchValue}
                           onChange={onChangeSearch}
                           variant="filled"
                           size="small"
                           placeholder="Search"
                           hiddenLabel
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="end">
                                       <SearchOutlinedIcon/>
                                   </InputAdornment>
                               ),
                           }}
                />
            </div>
            {
                filterValues.map(c=><Contact key={`${c.userId}${c.phone}${c.id}${c.email}`} contact={c} />)
            }
            <Modal isOpen={addModal}  closeModal={closeModal}>
                <AddContact showAdd={setAddModal} />
            </Modal>
        </div>
    );
});

export default Contacts;

