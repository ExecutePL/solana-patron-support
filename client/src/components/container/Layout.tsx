import React, { useMemo } from 'react';
import { ConnectionProvider,  WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { DEVNET_ENDPOINT } from '../../utils/constants';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Navbar } from '../sections/Navbar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    const connectWallet = true;
    const wallets = useMemo(() => (connectWallet ? [new PhantomWalletAdapter()] : []), [connectWallet]);
    return (
        <>
            <ConnectionProvider endpoint={DEVNET_ENDPOINT}>
                <WalletProvider wallets={wallets} autoConnect={connectWallet}>
                    <WalletModalProvider>
                        <Navbar>
                            <WalletMultiButton />
                        </Navbar>
                        <Outlet />
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </>
    );
};
