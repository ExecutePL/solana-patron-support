import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BaseContainer } from '../container/BaseContainer';
import { BackIcon } from '../images/BackIcon';
import { Projects } from '../sections/ProjectsList';
import * as css from './Project.module.pcss';
import verifiedIcon from '../images/verifiedIcon.svg';
import { Popup } from '../popup/Popup';
import { Donation, DonationType } from '../sections/Donation';
import project1 from '../images/project1.svg';
import { useWallet } from '@solana/wallet-adapter-react';
import { SocialMedia } from '../sections/SocialMedia';

export const Project = () => {
    const params = useParams();
    const project = Projects.find((project)=>project.uuid.toString() === params.uuid);
    const [isDonatePopupOpened, setIsDonatePopupOpened] = useState<boolean>(false);
    const [selectedDonationType, setSelectedDonationType] = useState<DonationType>('one-time');
    0;
    const publicKey = useWallet();
    if (publicKey.publicKey) {
        console.log(publicKey.publicKey?.toBase58());
    }
    return (
        <>
        <div className={css.container}>
            <Link to='/' className={css.allProjectsLink}><BackIcon />All Projects</Link>
            <BaseContainer 
                title={project?.name} 
                containerContent={
                    <div className={css.content}>
                        {project?.verified ? (
                                    <div className={css.verifiedStatus}>
                                        <img src={verifiedIcon} />
                                        <span>verified</span>
                                    </div>
                                ) : null}
                        <img src={project?.foto_src ? project.foto_src : project1} alt={project?.name} className={css.image}/>
                        <p className={css.decription}>{project?.description}</p>
                        <SocialMedia 
                            facebookLink={project?.facebook}
                            instagramLink={project?.instagram}
                            twitterLink={project?.twitter}
                            telegramLink={project?.telegram}
                            discordLink={project?.discord}
                        />
                        <div className={css.progressContainer}>
                            <p className={css.progressLabel}>Donation progress: </p>
                            <p className={css.targetRise}>${project?.target_rise}</p>
                            <p className={css.totalRise}>of ${project?.total_rise} collected</p>
                            <progress id="donationProgress" value={project?.target_rise} max={project?.total_rise} className={css.progress}></progress>
                        </div>
                        </div>
                    }
                    buttonContent={<span>Donate</span>}
                    onButtonClick={() => setIsDonatePopupOpened(true)}
                />
            </div>
            <Popup
                title="Please select a donation"
                content={
                    <Donation
                        selectedDonationType={selectedDonationType}
                        onDonationTypeClick={(type) => setSelectedDonationType(type)}
                    />
                }
                isPopupOpened={isDonatePopupOpened}
                onClose={() => setIsDonatePopupOpened(false)}
            />
        </>
    );
};
