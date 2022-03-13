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
import { getOrca, OrcaFarmConfig, OrcaPoolConfig, Network } from "@orca-so/sdk";
import Decimal from "decimal.js";
export const PendingRoute: FC = () => {
    const { symbol, connectWallet,splToken,recipient } = useConfig();
    const { amount, reset } = usePayment();
    const { publicKey,sendTransaction,signTransaction,wallet} = useWallet();
    const { setVisible } = useWalletModal();

    const { connection } = useConnection();

    const swap = async function(){
        const orca = getOrca(connection, Network.DEVNET);

        const orcaSolPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
        const solToken = orcaSolPool.getTokenB();
        const solAmount = new Decimal(0.1);
        const quote = await orcaSolPool.getQuote(solToken, solAmount);
        const orcaAmount = quote.getMinOutputAmount();

        console.log(`Swap ${solAmount.toString()} SOL for at least ${orcaAmount.toNumber()} ORCA`);
        const swapPayload = await orcaSolPool.swap(new PublicKey(publicKey.toString()), solToken, solAmount, orcaAmount);
        // const swapTxId = await swapPayload.execute();

        const opts = { signers: swapPayload.signers };

        console.log("Transaction preview",swapPayload.transaction)
        //let xy = await sendTransaction(swapPayload.transaction,connection, opts);
        const signature = await sendTransaction(swapPayload.transaction, connection, opts);
        console.log("signature:", signature);
        let xy  = await connection.confirmTransaction(signature, 'processed');
        console.log("signature:", xy);
        return;
    }
    const onClick = async  function(){
        if(!publicKey)return;
        const orca = getOrca(connection, Network.DEVNET);

        const orcaSolPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
        const solToken = orcaSolPool.getTokenB();
        const solAmount = new Decimal(0.1);
        const quote = await orcaSolPool.getQuote(solToken, solAmount);
        const orcaAmount = quote.getMinOutputAmount();
        // const connection = new Connection("https://api.devnet.solana.com", "singleGossip");
        const { maxTokenAIn, maxTokenBIn, minPoolTokenAmountOut } = await orcaSolPool.getDepositQuote(
            orcaAmount,
            solAmount
        );

        console.log(
            `Deposit at most ${maxTokenBIn.toNumber()} SOL and ${maxTokenAIn.toNumber()} ORCA, for at least ${minPoolTokenAmountOut.toNumber()} LP tokens`
        );
        const poolDepositPayload = await orcaSolPool.deposit(
            new PublicKey(publicKey.toString()),
            maxTokenAIn,
            maxTokenBIn,
            minPoolTokenAmountOut
        );

        let xy = await sendTransaction(poolDepositPayload.transaction,connection);
        console.log("Swapped:", xy);

        // const poolDepositTxId = await poolDepositPayload.execute();
        // console.log("Pool deposited:", poolDepositTxId, "\n");

return;
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
                <button onClick={swap}>requestPayment1</button>
                <button onClick={payNow}>requestPayment2</button>
            </div>
            <div className={css.footer}>
                <PoweredBy />
            </div>
        </div>
    );
};
