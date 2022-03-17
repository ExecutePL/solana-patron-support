import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BaseContainer } from '../container/BaseContainer';
import { BackIcon } from '../images/BackIcon';
import { ProjectData } from '../sections/ProjectsList';
import * as css from './Project.module.pcss';
import verifiedIcon from '../images/verifiedIcon.svg';
import { Popup } from '../popup/Popup';
import { Donation, DonationType } from '../sections/Donation';
import project1 from '../images/project1.svg';
import { useWallet } from '@solana/wallet-adapter-react';
import { SocialMedia } from '../sections/SocialMedia';

export const Project = () => {
    const params = useParams();
    const uuid = params.uuid;
    const [isDonatePopupOpened, setIsDonatePopupOpened] = useState<boolean>(false);
    const [selectedDonationType, setSelectedDonationType] = useState<DonationType>('One-Time Donation');
    const [project, setProject] = useState<ProjectData>();
    //console.log(project);

    const getProjectsList = async (uuid: string) => {
        const res = await fetch('/api/get/one-organization', {
            method: 'POST',
            body: JSON.stringify({
                uuid,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await res.json();
        setProject(data);
    };

    useEffect(() => {
        uuid && getProjectsList(uuid);
    }, [uuid]);

    const currenciesOrganization = project?.currencies.map((item) => {
        return { ...item.currency };
    });
    return (
        <>
            <div className={css.container}>
                <Link to="/" className={css.allProjectsLink}>
                    <BackIcon />
                    All Projects
                </Link>
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
                            <img
                                src={project?.foto_src ? project.foto_src : project1}
                                alt={project?.name}
                                className={css.image}
                            />
                            <p className={css.decription}>{project?.description}</p>
                            {project?.socials && (
                                <SocialMedia
                                    facebookLink={project?.socials[0].facebook}
                                    instagramLink={project?.socials[0].instagram}
                                    twitterLink={project?.socials[0].twitter}
                                    telegramLink={project?.socials[0].telegram}
                                    discordLink={project?.socials[0].discord}
                                />
                            )}
                            <div className={css.progressContainer}>
                                <p className={css.progressLabel}>Donation progress: </p>
                                <p className={css.targetRise}>${project?.total_raised}</p>
                                <p className={css.totalRise}>of ${project?.target_raised} collected</p>
                                <progress
                                    id="donationProgress"
                                    value={project?.total_raised}
                                    max={project?.target_raised}
                                    className={css.progress}
                                ></progress>
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
                        selectedOrganizationCurrencies={currenciesOrganization}
                    />
                }
                isPopupOpened={isDonatePopupOpened}
                onClose={() => setIsDonatePopupOpened(false)}
            />
        </>
    );
};
