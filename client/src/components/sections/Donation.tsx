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
        const test = currencies(selectedDonationType.toString());
        currencies(selectedDonationType.toString());
    }, [selectedDonationType, currenciesList]);

    useEffect(() => {
        setradioStatus(false);
    });

    useEffect(() => {
        setradioStatus(true);
    }, [onDonationTypeClick]);

    const handleDonate = () => {
        const link = `/new?recipient=${organizationAdress}&label=${organizationLabel}
        &curr=${selectedCurreny[0].name}&decimals=${selectedCurreny[0].decimals}&minDecimals=${selectedCurreny[0].minDecimals}`;
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
                    options={isCollateral(selectedDonationType)}
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
