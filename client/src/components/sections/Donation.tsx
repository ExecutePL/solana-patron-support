import React, { useEffect, useState } from 'react';
import { Item, RadioGroup } from '../radioGroup/RadioGroup';
import * as css from './Donation.module.pcss';
import { Option, Select } from '../select/Select';
import { Button } from '../buttons/Button';
import { useNavigate } from "react-router-dom";

export type DonationType = any;

interface DonationProps {
    organizationAdress?:string;
    organizationLabel?:string;
    selectedDonationType: DonationType;
    onDonationTypeClick: (type: string) => void;
}

export const Donation = ({ selectedDonationType, onDonationTypeClick, organizationAdress, organizationLabel  }: DonationProps) => {
    const [currenciesList, setCurrenciesList] = useState([]);
    const getCurrencies = async () => {
        const res = await fetch('/api/get/currency', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await res.json();
        data.forEach((o: { id: number }, i: number) => (o.id = i + 1));
        setCurrenciesList(data);
    };
    useEffect(() => {
        getCurrencies();
    }, []);

    const [selectedCurrenciesList, setSelectedCurrenciesList] = useState<Option[]>([]);
    const [selectedCurreny, setSelectedCurrency] = useState<any>();
    console.log(selectedCurreny)
    const navigate = useNavigate();

    const handleSelectedCurrencies = (selectedCurrency: Option) => {
        setSelectedCurrency(selectedCurrency);
    };

    const selectCurrencies = (selectedDonationType: string) => {
        switch (selectedDonationType.toString()) {
            case 'One-Time Donation':
                return currenciesList;
            case 'Colatteral Donation':
                {
                    const list = currenciesList.filter(({ type }) => type === 'colatteral');
                    return list;
                }
        }
    };
    
    useEffect(() => {
        const currencyList = selectCurrencies(selectedDonationType);
        setSelectedCurrenciesList(currencyList);
    }, [selectedDonationType, currenciesList]);

    const handleDonate = () =>{
        const link = `/new?recipient=${organizationAdress}&label=${organizationLabel}
        &curr=${selectedCurreny[0].name}&decimals=${selectedCurreny[0].decimals}&minDecimals=${selectedCurreny[0].minDecimals}`
        console.log(link)
        navigate(link);
    }
    console.log(currenciesList)

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
                    options={selectedCurrenciesList}
                    selectName="currency"
                    defaultOption="- Select currenies -"
                    title="Currencies: "
                    handleSelectedValuesChange={(selectedOptions) => handleSelectedCurrencies(selectedOptions)}
                />
            </div>
            <Button buttonClassName={css.donateButton} onClick={()=>handleDonate()}>Donate</Button>
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
