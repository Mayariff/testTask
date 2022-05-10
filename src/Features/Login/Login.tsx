import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {PATH} from "../../Routing";
import {useFormik} from "formik";
import s from './Login.module.scss'
import {Button, FormControl, FormGroup, Paper, TextField, FormLabel} from "../../styles/mui";
import {appActions, useAppDispatch, useAppSelector} from "../../costomHooks";
import {loginActions, selectIsLoggedIn} from "./";
import {loginDataType} from "../../API";



const Login = React.memo(() => {

    const navigate= useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    let formik = useFormik({
        initialValues: {
            email: '1234@mail.ge',
            password: '1234',
        },
        validate: (values) => {
            const errors: Partial<loginDataType> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be 3 characters or more'
            }
            return errors
        },
        onSubmit: async (values: loginDataType) => {
            const res = await dispatch(loginActions.loginTC(values))
            if (!loginActions.loginTC.rejected.match(res)) {
                dispatch(loginActions.setUserId({userId: res.payload.userId}))
            }else{
                dispatch(appActions.setAppError({ error: 'some error' }))
            }
            formik.resetForm()
        }
    })


    useEffect(() => {
        if (isLoggedIn) {
            navigate(PATH.CONTACT_PAGE)
        }else {
            return
        }
        },[isLoggedIn, navigate]
    )

    return (
                <Paper className={s.PaperContainer}>
                    <form onSubmit={formik.handleSubmit} className={s.form}>
                        <FormControl>
                            <FormLabel>
                                <p>Use common test account credentials:</p>
                                <p>Email: 1234@mail.ge // hanna@gmail.ru</p>
                                <p>Password: 1234</p>
                            </FormLabel>
                            <FormGroup>
                                    <TextField label="Email"
                                              margin="normal"
                                              {...formik.getFieldProps("email")}/>
                                        <div className={formik.errors.email? s.error: s.hidden}>
                                            {formik.touched.email && formik.errors.email ? formik.errors.email: "error "}
                                        </div>
                                <TextField type="password"
                                           label="Password"
                                           margin="normal"
                                           {...formik.getFieldProps("password")} />
                                <div className={formik.errors.password? s.error: s.hidden}>
                                    {formik.touched.password && formik.errors.password ? formik.errors.password : "error "}
                                </div>
                                <Button type={'submit'} variant={'contained'} color={'primary'} sx={{mt:'10px'}}>
                                    Login
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Paper>
    );
},);

export default Login;