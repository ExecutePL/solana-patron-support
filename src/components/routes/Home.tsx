import React, { FC } from 'react';
import * as css from './Home.module.pcss';
import { Navbar } from '../sections/Navbar';
import { ProjectsList } from '../sections/ProjectsList';
import { Footer } from '../sections/Footer';
export const Home: FC = () => {
    return (
        <>
            <Navbar />
            <ProjectsList />
            <Footer />
        </>
    );
};
