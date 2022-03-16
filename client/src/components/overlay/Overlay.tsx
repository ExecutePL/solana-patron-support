import React from 'react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import * as css from './Overlay.module.pcss';

export const Overlay = () =>{
    useBodyScrollLock();
    return (
        <div className={css.overlayContainer}/>
    )
}