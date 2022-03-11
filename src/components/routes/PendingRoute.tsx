import { useWallet,useConnection } from '@solana/wallet-adapter-react';
import { useWalletModal, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {Keypair, PublicKey, SystemProgram, Transaction} from '@solana/web3.js';
import { createTransaction } from '@solana/pay';
import React, { FC, useEffect,useCallback  } from 'react';
import { useConfig } from '../../hooks/useConfig';
import { usePayment } from '../../hooks/usePayment';
import { BackButton } from '../buttons/BackButton';
import { Amount } from '../sections/Amount';
import { PoweredBy } from '../sections/PoweredBy';
import { QRCode } from '../sections/QRCode';
import * as css from './PendingRoute.module.pcss';
import BigNumber from "bignumber.js";
import { loadPoolInfo, PoolTransactions } from '@project-serum/pool';
export const PendingRoute: FC = () => {
    const { symbol, connectWallet,splToken,recipient } = useConfig();
    const { amount, reset } = usePayment();
    const { publicKey,sendTransaction } = useWallet();
    const { setVisible } = useWalletModal();

    const { connection } = useConnection();

    const onClick = async  function(){

        let poolInfo = await loadPoolInfo(connection, new PublicKey('8YnCv62yA1WXuReeYqBFjT7DZBH2A8uJt5HfHPfR7wtK'));
        console.log(poolInfo.state);

        if(1==1)return;

        if (!publicKey || !amount){
            console.log('WalletNotConnectedError');
            console.log(amount);
            return;
        }
        const transaction1 = await createTransaction(connection, publicKey, recipient, amount, {
            splToken,
        });
        await sendTransaction(transaction1, connection);
    }

    function payNow(){
        onClick();
    }
    useEffect(() => {
        if (connectWallet && !publicKey) {
            setVisible(true);
        }
    }, [connectWallet, publicKey, setVisible]);

    return (
        <div className={css.root}>
            <div className={css.header}>
                <BackButton onClick={reset}>Cancel</BackButton>
                {connectWallet ? <WalletMultiButton /> : null}
            </div>
            <div className={css.main}>
                <div className={css.amount}>
                    <Amount amount={amount} />
                </div>
                <div className={css.symbol}>{symbol}</div>
                <div className={css.code}>
                    <QRCode />
                </div>
                <div className={css.scan}>Scan this code with your Solana Pay wallet</div>
                <div className={css.confirm}>You'll be asked to approve the transaction</div>
                <button onClick={payNow}>requestPayment</button>
            </div>
            <div className={css.footer}>
                <PoweredBy />
            </div>
        </div>
    );
};
