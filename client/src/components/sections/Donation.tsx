import React from "react";
import { Item, RadioGroup } from "../radioGroup/RadioGroup";
import * as css from './Donation.module.pcss';

export type DonationType = 'one-time' | 'colatteral';

interface DonationProps {
    selectedDonationType: DonationType;
    onDonationTypeClick: (type : string) => void;
}

export const Donation = ({selectedDonationType, onDonationTypeClick} : DonationProps) => {
    return (
          <div className={css.container}>
                <p className={css.title}>Donation type: </p>
                <RadioGroup 
                    items={donationTypes}   
                    onItemClick={onDonationTypeClick} 
                    selectedItem={selectedDonationType} 
                    radioGroupClassName={css.radioGroup}
                />
                <div className={css.currencyContainer}>
                    <label htmlFor="currenciesSelect" className={css.title}>Currency</label>
                    <select name="currencies" id="currenciesSelect" className={css.select}>
                        <option value=''>- Select currency -</option>
                        {currencies.map((currency)=>(
                            <option key={currency} value={currency} className={css.option}>{currency}</option>
                        ))}
                    </select>
                </div>
            </div>
    )
}

const donationTypes: Item[] = [
    {
        name: 'One-Time Donation',
        value: 'one-time'
    },
    {
        name: 'Colatteral Donation',
        value: 'colatteral'
    }

]

const currencies = ['SOL', 'USDT', 'USDC'];