import React from 'react';
import Routing from "../Routing/Routing";
import s from './App.module.scss'
import {Header} from "../Features/Header";


export function App() {
    return (
        <div className={s.App}>
            <Header/>
            <div className={s.centerContainer}>
                <Routing/>
            </div>
        </div>
    );
}

