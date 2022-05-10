import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import {AppBar, Button, LinearProgress,Typography,Toolbar} from "../../styles/mui";
import {selectStatus} from "../../App";
import {loginActions, selectIsLoggedIn} from "../Login";
import {useAppDispatch, useAppSelector} from "../../costomHooks";
import {PATH} from "../../Routing";




const Header =React.memo( () => {


    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const status = useAppSelector(selectStatus)

    const onClickHandler =useCallback(async ()=>{
        await dispatch(loginActions.logoutTC({email:"", password:""}))
        navigate(PATH.LOGIN_PAGE)
    },[dispatch,loginActions.logoutTC,navigate ])

    return (
        <AppBar position="static">
            <Toolbar sx={{justifyContent: 'space-between', m:'0 22px 0 22px'}} >
                <Typography variant="h6">
                    ContactList
                </Typography>
                {isLoggedIn && <Button color="inherit" onClick={onClickHandler}>Logout</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    );
});

export default Header;