import React, { FC, useContext } from 'react';
import * as css from './Home.module.pcss';
import { ProjectsList } from '../sections/ProjectsList';
import { Footer } from '../sections/Footer';
import { HeroSlider } from '../sections/HeroSlider';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConfig } from '../../hooks/useConfig';

export const Home: FC = () => {
    return (
        <>
            <HeroSlider />
            <ProjectsList />
            <Footer />
        </>
    );
};
