import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../Features/Login/Login";
import {Contacts} from "../Features/Contacts";
import {PATH} from "./index";



const Routing = () => {
    return (
        <Routes>
            <Route path={PATH.START_PAGE} element={<Contacts />} />
            <Route path={PATH.LOGIN_PAGE} element={<Login />} />
            <Route path={PATH.CONTACT_PAGE} element={<Contacts />} />
            <Route path={PATH.ERR404_PAGE} element={<h1>404: PAGE NOT FOUND</h1>}/>
            <Route path="/*" element={<Navigate to={PATH.ERR404_PAGE} />}/>
        </Routes>
    );
};

export default Routing;