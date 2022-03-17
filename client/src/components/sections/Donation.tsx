import React, { useEffect, useState } from 'react';
import { Item, RadioGroup } from '../radioGroup/RadioGroup';
import * as css from './Donation.module.pcss';
import { Option, Select } from '../select/Select';

export type DonationType = any;

interface DonationProps {
    selectedDonationType: DonationType;
    onDonationTypeClick: (type: string) => void;
    selectedOrganizationCurrencies: Array<object>;
}

export const Donation = ({
    selectedDonationType,
    onDonationTypeClick,
    selectedOrganizationCurrencies,
}: DonationProps) => {
    const [selectedCurrencies, setSelectedCurrencies] = useState<Option[]>();
    const handleSelectedCurrencies = (selectedCurrency: Option[]) => {
        setSelectedCurrencies(selectedCurrency);
        console.log('Test');
    };
    const [currenciesListCopy, setCurrenciesListCopy] = useState([]);
    const [currenciesList, setCurrenciesList] = useState([]);
    const [radioStatus, setradioStatus] = useState(false);

    // console.log(selectedCurrencies);

    const getCurrencies = () => {
        setCurrenciesList(selectedOrganizationCurrencies);
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
        getCurrencies();
    }, []);

    useEffect(() => {
        currencies(selectedDonationType.toString());
    }, [selectedDonationType, currenciesList]);

    useEffect(() => {
        setradioStatus(false);
    });

    useEffect(() => {
        setradioStatus(true);
    }, [onDonationTypeClick]);

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
                    isRadioChange={radioStatus}
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
