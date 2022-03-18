import React from 'react';
import * as css from './NewProjectType.module.pcss';
import { Item, RadioGroup } from '../radioGroup/RadioGroup';

interface NewProjectTypeProps {
    selectedProjectType: string;
    onTypeClick: (type: string) => void;
}

export const NewProjectType = ({ selectedProjectType, onTypeClick }: NewProjectTypeProps) => (
    <div className={css.container}>
        <p className={css.subtitle}>Choose Your type of fundraising project</p>
        <RadioGroup items={projectTypes} onItemClick={onTypeClick} selectedItem={selectedProjectType} />
    </div>
);

const projectTypes: Item[] = [
    {
        name: 'indyvidual',
        description:
            'For creators or private collections managed by a single entity. best option for simple projects, creators or startups',
    },
    {
        name: 'organization',
        description: ' For dao organization with donor-managed assets with collaborative infrastructure',
        link: 'https://squads.so/',
    },
];
