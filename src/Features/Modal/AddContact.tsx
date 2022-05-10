import s from './Modal.module.scss'
import React from "react";
import {useFormik} from "formik";
import {ContactModelType} from "../../API";
import {AccountCircle, AccountCircleOutlinedIcon, AttachFileOutlinedIcon, Button, EmailOutlinedIcon, FormControl, FormGroup, InputAdornment, PhoneOutlinedIcon, TextField} from "../../styles/mui";
import {AddContactType} from "./types";
import {asyncActions} from "../Contacts";
import {appActions, useAppDispatch, useAppSelector} from "../../costomHooks";
import {selectUserId} from '../Login';

export const AddContact = React.memo(({showAdd}: AddContactType) => {

    const dispatch = useAppDispatch()
    const userId = useAppSelector(selectUserId)

    let formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            phone: '',
            userId: userId ? userId : ' ',
            avatar: '',
            contactInfo: ''
        },
        validate: (values) => {
            const errors: Partial<ContactModelType> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.name.trim()) {
                errors.name = 'Required';
            } else if (values.name.length > 11) {
                errors.name = 'Must be 10 characters or less'
            }
            if (!values.surname.trim()) {
                errors.surname = 'Required';
            } else if (values.surname.length > 20) {
                errors.name = 'Must be 20 characters or less'
            }
            if (!values.phone.trim()) {
                errors.phone = 'Required'
            } else if (!/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(values.phone)) {
                errors.phone = 'Invalid phone number'
            }
            if (values.avatar?.trim() && !/[a-z]*.(png|jpg|gif)/.test(values.avatar)) {
                errors.avatar = 'Invalid url'
            }
            if (values.contactInfo && values.contactInfo.length > 20) {
                errors.contactInfo = 'Must be 20 characters or less'
            }

            return errors
        },
        onSubmit: async (values: ContactModelType) => {
            const res = await dispatch(asyncActions.createContact(values))
            if (!asyncActions.createContact.rejected.match(res)) {
                dispatch(appActions.setAppError({error: 'error. New contact may not be added'}))
            }
            formik.resetForm()
            formik.errors = {}
            showAdd(false)
        }
    })

    return (
        <form className={s.containerModal} onSubmit={formik.handleSubmit}>
            <FormControl>
                <h2 className={s.titleModal}>Add Contact</h2>
                <div className={s.content}>
                    <FormGroup className={s.fields}>
                        <div className={s.field}>
                            <TextField
                                label={"Name"}
                                variant="filled" size="small"
                                helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                                error={!!(formik.touched.name && formik.errors.name)}
                                {...formik.getFieldProps("name")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle/>
                                        </InputAdornment>),
                                }}
                            />
                        </div>
                        <div className={s.field}>
                            <TextField
                                label={"Surname"}
                                variant="filled" size="small"
                                helperText={formik.touched.surname && formik.errors.surname ? formik.errors.surname : ""}
                                error={!!(formik.touched.surname && formik.errors.surname)}
                                {...formik.getFieldProps("surname")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleOutlinedIcon/>
                                        </InputAdornment>),
                                }}/>
                        </div>
                        <div className={s.field}>
                            <TextField
                                label={"About Contact"}
                                variant="filled" size="small"
                                helperText={formik.touched.contactInfo && formik.errors.contactInfo ? formik.errors.contactInfo : ""}
                                error={!!(formik.touched.contactInfo && formik.errors.contactInfo)}
                                {...formik.getFieldProps("contactInfo")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleOutlinedIcon/>
                                        </InputAdornment>),
                                }}/>
                        </div>
                    </FormGroup>
                    <FormGroup className={s.fields}>
                        <div className={s.field}>
                            <TextField
                                label={'Phone'}
                                variant="filled" size="small"
                                helperText={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}
                                error={!!(formik.touched.phone && formik.errors.phone)}
                                {...formik.getFieldProps("phone")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneOutlinedIcon/>
                                        </InputAdornment>),
                                }}/>
                        </div>
                        <div className={s.field}>
                            <TextField
                                label={'Email'}
                                variant="filled" size="small"
                                helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                                error={!!(formik.touched.email && formik.errors.email)}
                                {...formik.getFieldProps("email")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlinedIcon/>
                                        </InputAdornment>),
                                }}/>
                        </div>
                        <div className={s.field}>
                            <TextField
                                label={'URL new image'}
                                variant="filled" size="small"
                                helperText={formik.touched.avatar && formik.errors.avatar ? formik.errors.avatar : ""}
                                error={!!(formik.touched.avatar && formik.errors.avatar)}
                                {...formik.getFieldProps("avatar")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <AttachFileOutlinedIcon/>
                                        </InputAdornment>),
                                }}/>
                        </div>
                    </FormGroup>
                </div>

                <div className={s.buttonContainer}>
                    <Button type={'submit'} variant={"outlined"}>
                        add
                    </Button>
                    <Button onClick={() => showAdd(false)} variant={"outlined"}>
                        cancel
                    </Button>
                </div>
            </FormControl>
        </form>
    )
})