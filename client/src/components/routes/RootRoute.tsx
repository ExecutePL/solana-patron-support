import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { TorusWalletAdapter } from '@solana/wallet-adapter-torus';
import { PublicKey } from '@solana/web3.js';
import React, { FC, useMemo } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { DEVNET_ENDPOINT, DEVNET_DUMMY_MINT } from '../../utils/constants';
import { ConfigProvider } from '../contexts/ConfigProvider';
import { FullscreenProvider } from '../contexts/FullscreenProvider';
import { PaymentProvider } from '../contexts/PaymentProvider';
import { ThemeProvider } from '../contexts/ThemeProvider';
import { TransactionsProvider } from '../contexts/TransactionsProvider';
import { SOLIcon } from '../images/SOLIcon';
import { Home } from './Home';

export const RootRoute: FC = () => {
    // If you're testing without a phone, set this to true to allow a browser-based wallet connection to be used
    const connectWallet = true;
    const wallets = useMemo(
        () => (connectWallet ? [new PhantomWalletAdapter(), new TorusWalletAdapter()] : []),
        [connectWallet]
    );

    const [params] = useSearchParams();
    const { recipient, label, currency, decimals } = useMemo(() => {
        let recipient: PublicKey | undefined, 
        label: string | undefined, 
        currency: string | undefined,
        decimals: number | undefined,
        minDecimals: number | undefined;

        const recipientParam = params.get('recipient');
        const labelParam = params.get('label');
        const currencyParam = params.get('curr');
        const decimalsParam = params.get('decimals');
        const minDecimalsParam = params.get('minDecimals');

        if (recipientParam && labelParam ) {
            try {
                recipient = new PublicKey(recipientParam);
                label = labelParam;
                currency = currencyParam ? currencyParam :  'USDC';
                decimals = decimalsParam ? Number(decimalsParam) : 6;
                minDecimals = minDecimalsParam ? Number(minDecimalsParam) : 2;

            } catch (error) {
                console.error(error);
            }
        }

        return { recipient, label, currency, decimals };
    }, [params]);

    return (
        <ThemeProvider>
            <FullscreenProvider>
                {recipient && label ? (
                    <ConnectionProvider endpoint={DEVNET_ENDPOINT}>
                        <WalletProvider wallets={wallets} autoConnect={connectWallet}>
                            <WalletModalProvider>
                                <ConfigProvider
                                    recipient={recipient}
                                    splToken={DEVNET_DUMMY_MINT}
                                    label={label}
                                    symbol={currency ? currency : 'USDC'}
                                    icon={<SOLIcon />}
                                    decimals={decimals}
                                    minDecimals={2}
                                    connectWallet={connectWallet}
                                >
                                    <TransactionsProvider>
                                        <PaymentProvider>
                                            <Outlet />
                                        </PaymentProvider>
                                    </TransactionsProvider>
                                </ConfigProvider>
                            </WalletModalProvider>
                        </WalletProvider>
                    </ConnectionProvider>
                ) : (
                    <Home />
                )}
            </FullscreenProvider>
        </ThemeProvider>
    );
};
