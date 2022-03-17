import { useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePayment } from '../../hooks/usePayment';
import { BackButton } from '../buttons/BackButton';
import { Button } from '../buttons/Button';
import { TransactionsLink } from '../buttons/TransactionsLink';
import { NextIcon } from '../images/NextIcon';
import { Popup } from '../popup/Popup';
import { PoweredBy } from '../sections/PoweredBy';
import { Progress } from '../sections/Progress';
import * as css from './ConfirmedRoute.module.pcss';

export const ConfirmedRoute: FC = () => {
    const publicKey = useWallet();
    const [isSucces, setSuccess] = useState<boolean>(false);
    const [transaction, setTransaction] = useState<any>();
    const { reset, status, amount, reference} = usePayment();
    const [params] = useSearchParams();
    const navigate = useNavigate(); 

    const { recipient, currency } = useMemo(() => {
        let recipient: any | undefined, 
        currency: string | undefined;
        const recipientParam = params.get('recipient');
        const currencyParam = params.get('curr');
        if (recipientParam && currencyParam) {
            try {
                recipient = recipientParam;
                currency = currencyParam ? currencyParam :  'USDC';

            } catch (error) {
                console.error(error);
            }
        }
        return { recipient, currency };
    }, [params]);

    useEffect(()=>{
        const transaction = {
            amount: amount && amount.c ? amount.c[0] : 0,
            donator_adress: publicKey.publicKey?.toBase58(),
            currencyName:currency,
            organizationWallet:recipient
        }
        setTransaction(transaction);
    }, [amount, reference, currency, recipient, publicKey])
    
    const addTransaction = async() => {
        console.log(transaction)
        const res = await fetch('/api/create/transaction', {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (res.ok){
            setSuccess(true);
        } else {
            console.log('error')
        }
    }

    useEffect(()=>{
        if(status==='Finalized'){
            addTransaction();
        }
    }, [status])

    const handleClosePopip = () =>{
        navigate('/');
        setSuccess(false)
        window.location.reload();
    }

    return (
        <div className={css.root}>
            <div className={css.header}>
                <BackButton onClick={reset}>Start Over</BackButton>
                <TransactionsLink />
            </div>
            <div className={css.main}>
                <Progress />
            </div>
            <div className={css.footer}>
                <PoweredBy />
            </div>
            <Popup content={
                <div className={css.popupContent}>
                    <p className={css.popupText}>Transactaion has been accepted.</p>
                    <p className={css.popupText}>Thanks for the donation!</p>
                    <Button onClick={()=>handleClosePopip()} buttonClassName={css.popupButton}>Go to all projects <NextIcon /></Button>
                </div>
            }
            isPopupOpened={isSucces}/>
        </div>
    );
};
