import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { BaseContainer } from '../container/BaseContainer';
import { BackIcon } from '../images/BackIcon';
import { Projects } from '../sections/ProjectsList';
import * as css from './Project.module.pcss';
import verifiedIcon from '../images/verifiedIcon.svg';
import { Popup } from '../popup/Popup';
import { Donation, DonationType } from '../sections/Donation';


export const Project = () => {
    const params = useParams();
    const project = Projects.find((project)=>project.id.toString() === params.id);
    const [isDonatePopupOpened, setIsDonatePopupOpened] = useState<boolean>(true);
    const [selectedDonationType, setSelectedDonationType] = useState<DonationType>('one-time');

    return (
        <>
        <div className={css.container}>
            <Link to='/' className={css.allProjectsLink}><BackIcon />All Projects</Link>
            <BaseContainer 
                title={project?.title} 
                containerContent={
                    <div className={css.content}>
                        {project?.verified ? (
                                    <div className={css.verifiedStatus}>
                                        <img src={verifiedIcon} />
                                        <span>verified</span>
                                    </div>
                                ) : null}
                        <img src={project?.thumbnail} alt={project?.title} className={css.image}/>
                        <p className={css.decription}>{project?.desc}</p>
                        <div className={css.progressContainer}>
                            <p className={css.progressLabel}>Donation progress: </p>
                            <p className={css.targetRise}>${project?.target_rise}</p>
                            <p className={css.totalRise}>of ${project?.total_rise} collected</p>
                            <progress id="donationProgress" value={project?.target_rise} max={project?.total_rise} className={css.progress}></progress>
                        </div>
                    </div>
                }
                buttonContent={<span>Donate</span>}
                onButtonClick={()=>setIsDonatePopupOpened(true)}
            />        
        </div>
        <Popup 
            title="Please select a donation" 
            content={
                <Donation 
                    selectedDonationType={selectedDonationType} 
                    onDonationTypeClick={(type)=>setSelectedDonationType(type)}
                />
            } 
            isPopupOpened={isDonatePopupOpened} 
            onClose={()=>setIsDonatePopupOpened(false)}/>
        </>
    )
}