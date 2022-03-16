import React, { HTMLAttributes, ReactNode } from "react";
import { ButtonHTMLAttributes } from 'react';
import * as css from './Button.module.pcss'
import cx from 'classnames/bind';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    onClick?: HTMLAttributes<HTMLButtonElement>['onClick'];
    children: ReactNode;
    buttonClassName?:string;
}

export const Button = ({children, onClick, buttonClassName, ...props} : ButtonProps) => (
    <button onClick={onClick} className={cx(css.button, buttonClassName)} {...props}>
        {children}
    </button>
)