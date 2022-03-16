import React from 'react';
import { Button } from '../buttons/Button';
import * as css from './RadioGroup.module.pcss';
import cx from 'classnames/bind';

export type Item = {
    name: string;
    value?: string;
    description?: string;
}

interface RadioGroupProps {
    items: Item[];
    selectedItem?:string;
    onItemClick: (itemName: string) => void;
    radioGroupClassName?: string;
}

export const RadioGroup = ({items, selectedItem, onItemClick, radioGroupClassName }:RadioGroupProps) => {
    return (
        <ul className={css.typeList}>
            {items.map((item)=>{
            const isItemSelected = selectedItem === item.name || selectedItem === item.value;
            return (
                <li key={item.name}>
                    <Button buttonClassName={cx(css.button,{[css.selectedItemButton]:isItemSelected}, radioGroupClassName)} onClick={()=>onItemClick(item.name)} >
                        <div className={css.radioButtonContainer}><div className={cx(css.radioButton, {[css.selectedRadioButton]:isItemSelected})}/></div>
                        <div className={css.textContainer}>
                            <p className={css.title}>{item.name}</p>
                            {item.description && <p className={css.description}>{item.description}</p>}
                        </div>
                    </Button>
                </li>
            )
        })}
        </ul>  
    )
}