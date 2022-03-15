import React, { FC } from 'react';
import * as css from './Home.module.pcss';
import { Navbar } from '../sections/Navbar';
import { ProjectsList } from '../sections/ProjectsList';
import { Footer } from '../sections/Footer';
import { HeroSlider } from '../sections/HeroSlider';
export const Home: FC = () => {
    return (
        <>
            <Navbar />
            <HeroSlider />
            <ProjectsList />
            <Footer />
        </>
    );
};
