import React, { useEffect, useState } from 'react';
import * as css from './Select.module.pcss';
import cx from 'classnames/bind';
import checkIcon from '../../images/check.svg';

export type Option = {
    id: number;
    name: string;
    foto_src?: string;
};

interface SelectProps {
    options: Option[];
    defaultOption?: string;
    selectName: string;
    title?: string;
    handleSelectedValuesChange: (selectedOptions?: Option[]) => void;
    isMultiple?: boolean;
    isRadioChange?: boolean;
}

export const Select = ({
    options,
    title,
    handleSelectedValuesChange,
    isMultiple = false,
    defaultOption,
    isRadioChange,
}: SelectProps) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[] | undefined>(undefined);
    const [isOptionOpened, setIsOptionOpened] = useState<boolean>(false);
    const isOptionSelected = selectedOptions && selectedOptions?.length > 0;
    const [optionsNames, setOptionNames] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (selectedOptions) {
            const optionsNames = selectedOptions.map((option) => option.name);
            setOptionNames(optionsNames.toString());
        }
        if (!isMultiple) {
            setIsOptionOpened(false);
        }
        handleSelectedValuesChange(selectedOptions || []);
    }, [isMultiple, selectedOptions]);

    const handleSelectChange = (selectedOption: Option) => {
        if (isMultiple) {
            if (selectedOptions) {
                const isOptionSelected = selectedOptions.find((option) => option === selectedOption);
                if (isOptionSelected) {
                    const filter = selectedOptions.filter((option: Option) => option != isOptionSelected);
                    setSelectedOptions(filter);
                } else {
                    setSelectedOptions([...selectedOptions, selectedOption]);
                }
            } else {
                setSelectedOptions([selectedOption]);
            }
        } else {
            setSelectedOptions([selectedOption]);
        }
    };

    useEffect(() => {
        setSelectedOptions(null);
    }, [isRadioChange]);
    return (
        <div className={css.container}>
            <p className={css.title}>{title}</p>
            <div className={css.select} onClick={() => setIsOptionOpened(!isOptionOpened)}>
                {isOptionSelected ? optionsNames : defaultOption}
            </div>
            {isOptionOpened && (
                <ul className={css.optionList}>
                    {options.map((option) => {
                        const isSelected = selectedOptions && selectedOptions.find((item: Option) => item === option);
                        return (
                            <li
                                key={option.name}
                                className={cx(css.option, { [css.isOptionSelected]: isSelected })}
                                onClick={() => handleSelectChange(option)}
                            >
                                {option.foto_src && (
                                    <div className={css.logo} dangerouslySetInnerHTML={{ __html: option.foto_src }} />
                                )}
                                {option.name}
                                {isSelected && <img src={checkIcon} className={css.checkIcon} />}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
