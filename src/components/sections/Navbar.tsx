import React, { FC } from 'react';
import * as css from './Navbar.module.pcss';
import logo from '../images/logo.svg'
import { Link } from 'react-router-dom';
import { ConnectWalletButton } from '../buttons/ConnectWallet';
export const Navbar: FC = () => {
    return (
    <nav>
        <div className={css.navbarContainer}>
            <div className={css.logo}>
                <Link to="/"> 
                    <img src={logo} alt="Logo" /> 
                </Link>
            </div>
            <div className={css.menuElements}>
                <ul>
                    <li>Home</li>
                    <li>Roadmap</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className={css.connectWalletButton}>
                <ConnectWalletButton />    
            </div>
        </div>
    </nav>
        
    );
};