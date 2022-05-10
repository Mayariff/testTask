import s from './Modal.module.scss'
import {Paper} from "../../styles/mui";
import {ModalType, ReturnComponentType} from "./types";
import React, {useCallback} from "react";

export const Modal: React.FC<ModalType> = React.memo(({ children, isOpen ,...props}): ReturnComponentType => {

    const backGroundClick = useCallback(() => {
        props.closeModal && props.closeModal()
    },[props])

    return (<>
            {isOpen &&
                <div className={s.main}>
                <div className={s.wrapper} onClick={backGroundClick}>  </div>
                <Paper elevation={3} className={s.body}>
                    {children}
                </Paper>
            </div>
            }
      </>
    )
})