import React, { FC, useEffect, useState } from 'react';
import * as css from './ProjectsList.module.pcss';
import verifiedIcon from '../images/verifiedIcon.svg';
import project1 from '../images/project1.svg';
import project2 from '../images/project2.svg';
import { Link } from 'react-router-dom';

export const ProjectsList: FC = () => {
    const [projectList, setProjectList] = useState([]);

    const getProjectsList = async () => {
        const res = await fetch('/api/get/organization', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await res.json();
        setProjectList(data)
    };

    useEffect(()=>{
        getProjectsList();
    }, [])
    
    return (
        <div className={css.projectsListContainer}>
            <ul>
                {projectList && projectList.map(({uuid, foto_src, name, description, verified}:ProjectData, index) => (
                    <Link to={`/project/${uuid}`} key={index}>
                        <li>
                            {verified ? (
                                <div className={css.verifiedStatus}>
                                    <img src={verifiedIcon} />
                                    <span>verified</span>
                                </div>
                            ) : null}
                            <div className={css.projectThumbnail}>
                                <img src={foto_src ? foto_src : project1} alt={name} />
                            </div>
                            <h3>{name}</h3>
                            <p className={css.projectDescription}>{description}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export type ProjectData = {
    uuid:string;
    foto_src?: string;
    name: string;
    description?: string;
    verified?: boolean;
    total_raised?: number;
    target_raised?: number;
    socials:SocialMedia[]
    
};

type SocialMedia = {
    discord?:string;
    facebook?:string;
    instagram?:string;
    twitter?:string;
    telegram?:string;
}


