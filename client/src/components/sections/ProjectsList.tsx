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
                {projectList && projectList.map(({uuid, foto_src, name, description, verified}:Project, index) => (
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

type Project = {
    uuid:string;
    foto_src?: string;
    name: string;
    description?: string;
    verified?: boolean;
    total_rise?: number;
    target_rise?: number;
};

export const Projects: Project[] = [
    { uuid: '1', foto_src: project1, name: 'Project 1', description: 'Lorem ipsum', verified: true, total_rise: 1000, target_rise: 300 },
    { uuid: '2', foto_src: project2, name: 'Project 2', description: 'Lorem ipsum', verified: false, total_rise: 1000, target_rise: 100},
    { uuid: '3', foto_src: project1, name: 'Project 3', description: 'Lorem ipsum', verified: false, total_rise: 1000, target_rise: 50 },
    { uuid: '4', foto_src: project1, name: 'Project 4', description: 'Lorem ipsum', verified: true, total_rise: 1000, target_rise: 600 },
    { uuid: '5', foto_src: project2, name: 'Project 5', description: 'Lorem ipsum', verified: false, total_rise: 1000, target_rise: 900 },
    { uuid: '6', foto_src: project1, name: 'Project 6', description: 'Lorem ipsum', verified: false, total_rise: 1000, target_rise: 1000 },
];
