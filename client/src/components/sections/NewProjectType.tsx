import React from "react"
import * as css from './NewProjectType.module.pcss';
import { SelectedProjectType } from "./StartOwnProject";
import { Item, RadioGroup } from "../radioGroup/RadioGroup";

interface NewProjectTypeProps {
    selectedProjectType : SelectedProjectType;
    onTypeClick: (type: string) => void
}

export const NewProjectType = ({selectedProjectType, onTypeClick }:NewProjectTypeProps) =>  (
    <>
        <p className={css.subtitle}>Lorem ipsum dolor sit amet</p>
        <p className={css.description}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.</p>
        <RadioGroup items={projectTypes} onItemClick={onTypeClick} selectedItem={selectedProjectType}/> 
    </>
)

const projectTypes:Item[] = [
    {
        name:'indyvidual',
        description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero'
    },
    {
        name:'organization',
        description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero'
    }
]