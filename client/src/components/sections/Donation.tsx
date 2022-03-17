import React, { useEffect, useState } from 'react';
import { Item, RadioGroup } from '../radioGroup/RadioGroup';
import * as css from './Donation.module.pcss';
import { Option, Select } from '../select/Select';

export type DonationType = any;

interface DonationProps {
    selectedDonationType: DonationType;
    onDonationTypeClick: (type: string) => void;
}

export const Donation = ({ selectedDonationType, onDonationTypeClick }: DonationProps) => {
    const [selectedCurrencies, setSelectedCurrencies] = useState<Option[]>();
    const handleSelectedCurrencies = (selectedCurrency: Option[]) => {
        setSelectedCurrencies(selectedCurrency);
    };
    const [currenciesListCopy, setCurrenciesListCopy] = useState([]);
    const [currenciesList, setCurrenciesList] = useState([]);

    // console.log(selectedCurrencies);

    const getCurrencies = async () => {
        const res = await fetch('/api/get/currency', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await res.json();
        data.forEach((o: { id: any }, i: number) => (o.id = i + 1));

        setCurrenciesList(data);
    };
    console.log({ selectedDonationType });

    const currencies = (selectedDonationType: string) => {
        switch (selectedDonationType.toString()) {
            case 'One-Time Donation':
                return currenciesList;
            case 'Colatteral Donation':
                const list = currenciesList.filter(({ type }) => type === 'colatteral');
                return list;
        }
    };
    const isCollateral = (selectedType: DonationType) => {
        switch (selectedType.toString()) {
            case 'One-Time Donation':
                return currenciesList;
            case 'Colatteral Donation':
                const list = currenciesList.filter(({ type }) => type === 'colatteral');
                return list;
        }
    };
    useEffect(() => {
        getCurrencies();
    }, []);
    useEffect(() => {
        const test = currencies(selectedDonationType.toString());
        console.log({ test });
    }, [selectedDonationType, currenciesList]);

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
                    options={isCollateral(selectedDonationType)}
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
