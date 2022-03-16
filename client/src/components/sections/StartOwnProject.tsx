import React, { useState } from "react"
import { Button } from "../buttons/Button";
import * as css from './StartOwnProject.module.pcss';
import { NextIcon } from "../images/NextIcon";
import { NewProjectType } from "./NewProjectType";
import { NewProjectForm } from "./NewProjectForm";

interface StartOwnProjectProps {
    onCancleClick: ()=>void;
}

type StartOwnProjectStep = 'projectType' | 'projectData'

export type SelectedProjectType = 'indyvidual' | 'organization';

export const StartOwnProject = ({onCancleClick} : StartOwnProjectProps) => {
    const [step, setStep] = useState<StartOwnProjectStep>('projectType');
    const [selectedProjectType, setSelectedProjectType] = useState<SelectedProjectType>('organization');

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
    return (
        <div className={css.container}>
           {isProjectTypeStep && <NewProjectType onTypeClick={(type)=>setSelectedProjectType(type)} selectedProjectType={selectedProjectType}/>}
           {isProjectDataStep && <NewProjectForm/>}
            <div className={css.buttonContainer}>
                <Button onClick={()=>handleBackClick()} buttonClassName={css.cancleButton}>
                    {isProjectTypeStep && 'Cancle'}
                    {isProjectDataStep && 'Back'}
                </Button>
                <Button onClick={()=>handleNextClick()} buttonClassName={css.nextButton}>
                    <div className={css.nextButtonContent}><span>Next</span> <NextIcon/></div>
                </Button> 
            </div>     
        </div>
    )
}