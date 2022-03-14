import React, { FC } from 'react';
import * as css from './Home.module.pcss';
import { Navbar } from '../sections/Navbar';
export const Home: FC = () => {
    return (
        <div className={css.root}>
            <div className={css.header}>
             <Navbar />
            </div>
        </div>
    );
};
