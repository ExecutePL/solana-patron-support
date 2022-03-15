import React from "react"
import { Button } from "../buttons/Button";
import * as css from './NewProjectType.module.pcss';
import cx from 'classnames/bind';
import { SelectedProjectType } from "./StartOwnProject";

interface NewProjectTypeProps {
    selectedProjectType : SelectedProjectType;
    onTypeClick: (type: SelectedProjectType) => void
}

export const NewProjectType = ({selectedProjectType, onTypeClick }:NewProjectTypeProps) =>  (
    <>
        <p className={css.subtitle}>Lorem ipsum dolor sit amet</p>
        <p className={css.description}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.</p>
        <ul className={css.typeList}>
            {projectTypes.map((projectType)=>{
            const isProjectTypeSelected = selectedProjectType===projectType.type;
            return (
                <li key={projectType.type}>
                    <Button buttonClassName={cx(css.projectTypeButton,{[css.selectedProjectTypeButton]:isProjectTypeSelected} )} onClick={()=>onTypeClick(projectType.type)} >
                        <div className={css.radioButtonContainer}><div className={cx(css.radioButton, {[css.selectedRadioButton]:isProjectTypeSelected})}/></div>
                        <div className={css.textContainer}>
                            <p className={css.title}>{projectType.type}</p>
                            <p className={css.description}>{projectType.description}</p>
                        </div>
                    </Button>
                </li>
            )
        })}
        </ul>         
    </>
)


type ProjectType = {
    type: SelectedProjectType,
    description: string
}
const projectTypes:ProjectType[] = [
    {
        type:'indyvidual',
        description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero'
    },
    {
        type:'organization',
        description:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero'
    }
]