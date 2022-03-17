import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useWalletModal, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
    Connection,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js';
import {
    createAssociatedTokenAccount,
    getAssociatedTokenAddress,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { createTransaction } from '@solana/pay';
import React, { FC, useEffect, useCallback } from 'react';
import { useConfig } from '../../hooks/useConfig';
import { usePayment } from '../../hooks/usePayment';
import { BackButton } from '../buttons/BackButton';
import { Amount } from '../sections/Amount';
import { PoweredBy } from '../sections/PoweredBy';
import { QRCode } from '../sections/QRCode';
import * as css from './PendingRoute.module.pcss';
import BN from 'bignumber.js';
import lo from 'buffer-layout';
import { createAssociatedTokenAccountInstruction } from '@solana/spl-token/src/instructions';

export const PendingRoute: FC = () => {
    const { symbol, connectWallet, splToken, recipient } = useConfig();
    const { amount, reset } = usePayment();
    const { publicKey, sendTransaction, signTransaction } = useWallet();
    const { setVisible } = useWalletModal();

    const { connection } = useConnection();

    const orcaFarmToken = 'orcarKHSqC5CDDsGbho8GKvwExejWHxTqGzXgcewB9L';
    const faucetUSDT = 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr';
    const merchantAddress = '5pwgZ5cumBKM56nGAiAXf7UzmYMgjkQswbWbmEBWNvDG';
    const customerAddress = '78yZfwe88s4GaXhXfKEhMy3vK1wxyrm6Au1T3EsmEaTb';

    const programAddress = new PublicKey('2nwcNoXkFSgXJHjCW98ACpujPHFJt4LvMKFp83718Vb2');
    const customTokenAddress = new PublicKey(faucetUSDT);
    // const customTokenAccount = new PublicKey('8tS2nZ5w2DiJuQqC1TDYJwPu89EGDbbtoAoeeGCYxXUo');

    async function getOrCreateAssociatedTokenAccount(connection: Connection, mint: PublicKey, publicKey: PublicKey) {
        const associatedTokenAddress = await getAssociatedTokenAddress(mint, publicKey);
        if (await connection.getAccountInfo(associatedTokenAddress)) {
            console.log('associated token account', associatedTokenAddress.toString());
            return associatedTokenAddress;
        } else {
            // await createAssociatedTokenAccount(connection, wallet, mint , wallet.publicKey)

            console.log('create associated token account for', publicKey);
            const associatedToken = await getAssociatedTokenAddress(
                mint,
                publicKey,
                false,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            );

            const transaction = new Transaction().add(
                createAssociatedTokenAccountInstruction(
                    publicKey,
                    associatedToken,
                    publicKey,
                    mint,
                    TOKEN_PROGRAM_ID,
                    ASSOCIATED_TOKEN_PROGRAM_ID
                )
            );
            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'processed');
            return associatedToken;
            // await sendAndConfirmTransaction(connection, transaction, [payer], confirmOptions);
        }

        //return await createAssociatedTokenAccount(connection, wallet, mint , wallet.publicKey)
    }
    const transferOverContract = async function () {
        console.log('transferOverContract');
        if (!publicKey || !signTransaction) {
            console.warn('Wallet not connected');
            return;
        }
        const merchantTokenPubkey = await getOrCreateAssociatedTokenAccount(
            connection,
            customTokenAddress,
            new PublicKey(merchantAddress)
        );
        const userTokenPubkey = await getOrCreateAssociatedTokenAccount(connection, customTokenAddress, publicKey);
        const amount = Buffer.alloc(8); // 50 SPL
        lo.ns64('value').encode(new BN('1000000'), amount);
        const approveIx = new TransactionInstruction({
            keys: [
                { pubkey: publicKey, isSigner: true, isWritable: true },
                { pubkey: userTokenPubkey, isSigner: false, isWritable: true },
                { pubkey: merchantTokenPubkey, isSigner: false, isWritable: true },
                { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            ],
            programId: programAddress,
            data: Buffer.of(0, ...amount),
        });
        const transaction = new Transaction().add(approveIx);
        console.log('approveIx', approveIx);

        // const signed = await signTransaction(transaction);
        // console.log("signed",signed);

        const opts = { signers: publicKey };

        const signature = await sendTransaction(transaction, connection, opts);
        console.log('signature', signature);
        const xyx = await connection.confirmTransaction(signature, 'processed');
        console.log('signature:', xyx);

        //
        // const resApprove = await sendAndConfirmTransaction(connection, new Transaction().add(approveIx), [
        //     publicKey,
        // ])
        //
        // console.log("resApprove",resApprove);
        //
        /*const transferRes = await sendAndConfirmTransaction(
            connection,
            new Transaction().add(approveIx),
            [publicKey]
        )*/
        return;
    };
    const transferOverContract_bak = async function () {
        console.log('transferOverContract');
        if (!publicKey || !signTransaction) {
            console.warn('Wallet not connected');
            return;
        }
        const merchantTokenPubkey = await getOrCreateAssociatedTokenAccount(
            connection,
            customTokenAddress,
            new PublicKey(merchantAddress)
        );
        const userTokenPubkey = await getOrCreateAssociatedTokenAccount(connection, customTokenAddress, publicKey);
        const amount = Buffer.alloc(8); // 50 SPL
        lo.ns64('value').encode(new BN('1000000'), amount);
        const approveIx = new TransactionInstruction({
            keys: [
                { pubkey: publicKey, isSigner: true, isWritable: true },
                { pubkey: userTokenPubkey, isSigner: false, isWritable: true },
                { pubkey: merchantTokenPubkey, isSigner: false, isWritable: true },
                { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
            ],
            programId: programAddress,
            data: Buffer.of(0, ...amount),
        });
        const transaction = new Transaction().add(approveIx);
        console.log('approveIx', approveIx);

        // const signed = await signTransaction(transaction);
        // console.log("signed",signed);

        const opts = { signers: publicKey };

        const signature = await sendTransaction(transaction, connection, opts);
        console.log('signature', signature);
        const xyx = await connection.confirmTransaction(signature, 'processed');
        console.log('signature:', xyx);

        //
        // const resApprove = await sendAndConfirmTransaction(connection, new Transaction().add(approveIx), [
        //     publicKey,
        // ])
        //
        // console.log("resApprove",resApprove);
        //
        /*const transferRes = await sendAndConfirmTransaction(
            connection,
            new Transaction().add(approveIx),
            [publicKey]
        )*/
        return;
    };

    const onClick = async function () {
        if (!publicKey || !amount) {
            console.log('WalletNotConnectedError');
            console.log(amount);
            return;
        }
        const transaction1 = await createTransaction(connection, publicKey, recipient, amount, {
            splToken,
        });
        await sendTransaction(transaction1, connection);
    };

    function payNow() {
        onClick();
    }
    useEffect(() => {
        console.log(connectWallet);
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
                <button onClick={transferOverContract}>requestPayment</button>
            </div>
            <div className={css.footer}>
                <PoweredBy />
            </div>
        </div>
    );
};
