import React, { useEffect, useState } from 'react';
import { Item, RadioGroup } from '../radioGroup/RadioGroup';
import * as css from './Donation.module.pcss';
import { Option, Select } from '../select/Select';
import { Button } from '../buttons/Button';
import { useNavigate } from 'react-router-dom';

export type DonationType = any;

interface DonationProps {
    organizationAdress?: string;
    organizationLabel?: string;
    organizationId?:number;
    selectedDonationType: DonationType;
    onDonationTypeClick: (type: string) => void;
    selectedOrganizationCurrencies: Array<object>;
}

export const Donation = ({
    selectedDonationType,
    onDonationTypeClick,
    organizationAdress,
    organizationLabel,
    selectedOrganizationCurrencies,
    organizationId
}: DonationProps) => {
    const [currenciesList, setCurrenciesList] = useState([]);
    const getCurrencies = () => {
        setCurrenciesList(selectedOrganizationCurrencies);
    };
    useEffect(() => {
        getCurrencies();
    }, []);

    const [selectedCurrenciesList, setSelectedCurrenciesList] = useState<Option[]>([]);
    const [selectedCurreny, setSelectedCurrency] = useState<any>();
    const [radioStatus, setradioStatus] = useState(false);
    const navigate = useNavigate();

    const handleSelectedCurrencies = (selectedCurrency: Option) => {
        setSelectedCurrency(selectedCurrency);
    };
    const currencies = (selectedDonationType: string) => {
        switch (selectedDonationType.toString()) {
            case 'One-Time Donation':
                return currenciesList;
            case 'Colatteral Donation':
                { 
                    const list = currenciesList.filter(({ type }) => type === 'colatteral');
                    return list
                }
        }
    };

    useEffect(() => {
        const currenciesList = currencies(selectedDonationType.toString());
        currenciesList && setSelectedCurrenciesList(currenciesList)
    }, [selectedDonationType, currenciesList]);

    useEffect(() => {
        setradioStatus(false);
    });

    useEffect(() => {
        setradioStatus(true);
    }, [onDonationTypeClick]);

    const handleDonate = () => {
        const link = `/new?recipient=${organizationAdress}&label=${organizationLabel}
        &curr=${selectedCurreny[0].name}&decimals=${selectedCurreny[0].decimals}&id=${organizationId}`;
        navigate(link);
    };

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
                    isRadioChange={radioStatus}
                />
            </div>
            <Button buttonClassName={css.donateButton} onClick={() => handleDonate()}>
                Donate
            </Button>
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
