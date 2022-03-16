import { PublicKey, Transaction } from '@solana/web3.js';
import React, { createContext, useContext, useEffect, useState } from 'react';
const AppContext = createContext({ walletId: '' });

type PhantomEvent = 'disconnect' | 'connect' | 'accountChanged';

interface ConnectOpts {
    onlyIfTrusted: boolean;
}
type WindowWithSolana = Window & {
    solana?: PhantomProvider;
};

export interface PhantomProvider {
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
    disconnect: () => Promise<void>;
    on: (event: PhantomEvent, callback: (args: any) => void) => void;
    isPhantom: boolean;
    publicKey: PublicKey;
    signTransaction: (t: Transaction) => {};
}

export const AppWrapper = ({ children }: any) => {
    const [walletAvail, setWalletAvail] = useState(false);
    const [provider, setProvider] = useState<PhantomProvider | null>(null);
    const [walletAddress, setWalletAddress] = useState({ walletId: '' });
    useEffect(() => {
        if ('solana' in window) {
            const solWindow = window as WindowWithSolana;
            if (solWindow?.solana?.isPhantom) {
                setProvider(solWindow.solana);
            }
        }
    }, [provider]);
    useEffect(() => {
        provider?.on('connect', (publicKey: PublicKey) => {
            setWalletAddress({ walletId: `${publicKey}` });
        });
        provider?.on('disconnect', () => {
            console.log('disconnect event');
        });
    }, [provider]);

    return <AppContext.Provider value={walletAddress}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
    return useContext(AppContext);
};
