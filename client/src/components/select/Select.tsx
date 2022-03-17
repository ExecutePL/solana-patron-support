import React, { ReactNode, useEffect, useState } from 'react';
import * as css from './Select.module.pcss';
import cx from 'classnames/bind';

export type Option = {
    id: number;
    name: string;
};

interface SelectProps {
    options: Option[];
    defaultOption?: string;
    selectName: string;
    label?: string;
    handleSelectedValuesChange: (selectedOptions: any) => void;
    isMultiple?: boolean;
}

export const Select = ({ options, selectName, label, handleSelectedValuesChange, isMultiple }: SelectProps) => {
    const [selectedOptions, setSelectedOptions] = useState<any>();
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    useEffect(() => {
        if (selectedOptions) {
            const values = selectedOptions.map((option: Option) => option.name);
            setSelectedValues(values.toString());
            handleSelectedValuesChange(selectedOptions);
        }
    }, [selectedOptions]);

    const handleSelectChange = (selectedOption: string) => {
        const checkedOption = options.find((option) => option.name === selectedOption);
        if (isMultiple) {
            if (selectedOptions) {
                const selectedOption = selectedOptions.find((option: Option) => option === checkedOption);
                if (selectedOption) {
                    const filter = selectedOptions.filter((value: Option) => value != selectedOption);
                    setSelectedOptions(filter);
                } else {
                    setSelectedOptions([...selectedOptions, checkedOption]);
                }
            } else {
                setSelectedOptions([checkedOption]);
            }
        } else {
            setSelectedOptions([checkedOption]);
        }
    };
    return (
        <div className={css.container}>
            {label && (
                <label htmlFor={selectName} className={css.title}>
                    {label}
                </label>
            )}
            <div className={css.selectedOptionsContainer}>
                <span className={css.selectedOptions}>
                    {selectedValues ? selectedValues : 'please, select currency'}
                </span>
            </div>
            <select
                name={selectName}
                id={selectName}
                className={css.select}
                onChange={(e) => handleSelectChange(e.target.value)}
            >
                {options.map((option) => {
                    const isSelected = selectedOptions && selectedOptions.find((item: Option) => item === option);
                    return (
                        <option
                            key={option.id}
                            value={option.name}
                            className={cx(css.option, { [css.isOptionSelected]: isSelected })}
                        >
                            {option.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
