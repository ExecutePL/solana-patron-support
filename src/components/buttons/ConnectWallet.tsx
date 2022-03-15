import React, { FC } from 'react';
import * as css from './ConnectWallet.module.pcss';
import walletIcon from '../images/wallet-icon.svg'

export const ConnectWalletButton: FC = () => {

    return (
        <button className={css.connectWallet} type="submit">
            <img src={walletIcon} title="Connect Wallet" />
            Connect Wallet
        </button>
    );
};
