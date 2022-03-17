import React, { useState } from "react"
import { Button } from "../buttons/Button";
import * as css from './StartOwnProject.module.pcss';
import { NextIcon } from "../images/NextIcon";
import { NewProjectType } from "./NewProjectType";
import { NewProjectForm } from "./NewProjectForm";
import { BackIcon } from "../images/BackIcon";

interface StartOwnProjectProps {
    onCancleClick: ()=>void;
}

export type SelectedProjectType = 'indyvidual' | 'organization';

export const StartOwnProject = ({onCancleClick} : StartOwnProjectProps) => {
    const [step, setStep] = useState<string>('projectType');
    const [selectedProjectType, setSelectedProjectType] = useState<string>('organization');

    const isProjectTypeStep = step==='projectType';
    const isProjectDataStep = step==='projectData';

    const handleNextClick = () => {
        if(isProjectTypeStep){
            setStep('projectData')
        }else{
            console.log('connect')
        }
    }

    const handleBackClick = () => {
        if(isProjectTypeStep){
            onCancleClick()
        }else{
            setStep('projectType')
        }
    }
    const handleDataStepClose = (isCloseClicked: boolean) => {
        if(isCloseClicked){
            onCancleClick();
        }
    }
    return (
        <div className={css.container}>
           {isProjectTypeStep && <NewProjectType onTypeClick={(type)=>setSelectedProjectType(type)} selectedProjectType={selectedProjectType}/>}
           {isProjectDataStep && <NewProjectForm projectType={selectedProjectType} handleCloseClick={(isCloseClicked)=>handleDataStepClose(isCloseClicked)}/>}
            <div className={css.buttonContainer}>
                <Button onClick={()=>handleBackClick()} buttonClassName={css.cancleButton}>
                    {isProjectTypeStep && 'Cancle'}
                    {isProjectDataStep && <span className={css.backButton}><BackIcon/> Back</span>}
                </Button>
                { isProjectTypeStep && 
                <Button onClick={()=>handleNextClick()} buttonClassName={css.nextButton}>
                    <div className={css.nextButtonContent}><span>Next</span> <NextIcon/></div>
                </Button> }
            </div>     
        </div>
    )
}