import React, { HTMLAttributes, ReactNode } from "react";
import * as css from './Button.module.pcss'
import cx from 'classnames/bind';

interface ButtonProps {
    onClick: HTMLAttributes<HTMLButtonElement>['onClick'];
    children: ReactNode;
    buttonClassName?:string;
}

export const Button = ({children, onClick, buttonClassName} : ButtonProps) => (
    <button onClick={onClick} className={cx(css.button, buttonClassName)}>
        {children}
    </button>
)