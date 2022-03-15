import React, { ReactNode } from 'react';
import { Button } from '../buttons/Button';
import * as css from './BaseContainer.module.pcss'

interface BaseContainerProps {
    title?:string;
    containerContent?:ReactNode
    buttonContent?: ReactNode
}

export const BaseContainer = ({title, containerContent, buttonContent} : BaseContainerProps) => (
    <div className={css.container}>
        <div className={css.topSection}>
            <h2 className={css.title}>{title}</h2>
            {buttonContent && <Button onClick={()=>console.log('click')} buttonClassName={css.button}>{buttonContent}</Button>}
        </div>
        <div className={css.content}>{containerContent}</div>
    </div>
)