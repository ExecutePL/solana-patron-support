import React, { useEffect, useState } from 'react';
import { Item, RadioGroup } from '../radioGroup/RadioGroup';
import * as css from './Donation.module.pcss';
import { Option, Select } from '../select/Select';

export type DonationType = 'one-time' | 'colatteral';

interface DonationProps {
    selectedDonationType: DonationType;
    onDonationTypeClick: (type: string) => void;
}

export const Donation = ({ selectedDonationType, onDonationTypeClick }: DonationProps) => {
    const [selectedCurrencies, setSelectedCurrencies] = useState<Option[]>();
    const handleSelectedCurrencies = (selectedCurrency: Option[]) => {
        setSelectedCurrencies(selectedCurrency);
    };
    console.log(selectedCurrencies);
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
                <Select
                    options={currencies}
                    selectName="currency"
                    defaultOption="- Select currenies -"
                    label="Currencies: "
                    handleSelectedValuesChange={(selectedOptions) => handleSelectedCurrencies(selectedOptions)}
                />
            </div>
        </div>
    );
};

const donationTypes: Item[] = [
    {
        name: 'One-Time Donation',
        value: 'one-time',
    },
    {
        name: 'Colatteral Donation',
        value: 'colatteral',
    },
];

const currencies = [
    {
        name: 'SOL',
        id: 1,
    },
    {
        name: 'USDT',
        id: 2,
    },
    {
        name: 'USDC',
        id: 3,
    },
];
