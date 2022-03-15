import React from 'react';
import { Link, useParams } from "react-router-dom";
import { BaseContainer } from '../container/BaseContainer';
import { BackIcon } from '../images/BackIcon';
import { Projects } from '../sections/ProjectsList';
import * as css from './Project.module.pcss';
import verifiedIcon from '../images/verifiedIcon.svg';


export const Project = () => {
    const params = useParams();
    const project = Projects.find((project)=>project.id.toString() === params.id);

    return (
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
                    </div>
                }
                buttonContent={<span>Donate</span>}
            />
        </div>
    )
}