import React, { FC, useEffect } from 'react';
import * as css from './Navbar.module.pcss';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { ConnectWalletButton } from '../buttons/ConnectWallet';
import { useConfig } from '../../hooks/useConfig';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
export const Navbar: FC = () => {
    const { connectWallet } = useConfig();
    const { publicKey } = useWallet();
    const { setVisible } = useWalletModal();

    useEffect(() => {
        console.log(connectWallet);
        if (connectWallet && !publicKey) {
            setVisible(true);
        }
    }, [connectWallet, publicKey, setVisible]);

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
                    {connectWallet ? <WalletMultiButton /> : null}
                </div>
            </div>
        </nav>
    );
};
