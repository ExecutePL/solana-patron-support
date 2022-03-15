import React, { FC, useEffect, useMemo } from 'react';
import * as css from './Navbar.module.pcss';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { ConnectWalletButton } from '../buttons/ConnectWallet';
import { DEVNET_ENDPOINT } from '../../utils/constants';
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { TorusWalletAdapter } from '@solana/wallet-adapter-torus';
export const Navbar: FC = () => {
    const connectWallet = true;
    const wallets = useMemo(
        () => (connectWallet ? [new PhantomWalletAdapter(), new TorusWalletAdapter()] : []),
        [connectWallet]
    );
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
                    <ConnectionProvider endpoint={DEVNET_ENDPOINT}>
                        <WalletProvider wallets={wallets} autoConnect={connectWallet}>
                            <WalletModalProvider>{connectWallet ? <WalletMultiButton /> : null}</WalletModalProvider>
                        </WalletProvider>
                    </ConnectionProvider>
                </div>
            </div>
        </nav>
    );
};
