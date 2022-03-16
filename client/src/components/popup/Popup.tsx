import React, { HTMLAttributes, ReactNode } from "react";
import { Button } from "../buttons/Button";
import { BaseContainer } from "../container/BaseContainer";
import { CloseIcon } from "../images/CloseIcon";
import { Overlay } from "../overlay/Overlay";
import * as css from './Popup.module.pcss'

interface PopupProps {
    title?: string;
    content: ReactNode;
    onClose?: HTMLAttributes<HTMLButtonElement>['onClick'];
    isPopupOpened?: boolean;
}

export const Popup = ({title, content, onClose, isPopupOpened}:PopupProps) => {
    const isPopupClosed = !isPopupOpened;

    if(isPopupClosed) return null;
    return (
        <>
            <div className={css.container}>
                <Button onClick={onClose} buttonClassName={css.closeButton}><CloseIcon /></Button>
                <BaseContainer title={title} containerContent={content} />
            </div>
            <Overlay />
        </>
    )
}