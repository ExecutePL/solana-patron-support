import React, { FC } from 'react';
import * as css from './ProjectsList.module.pcss';
import verifiedIcon from '../images/verifiedIcon.svg'
import project1 from '../images/project1.svg'
import project2 from '../images/project2.svg'
export const ProjectsList: FC = () => {
    return (
        <div className={css.projectsListContainer}>
            <ul>
                {Projects.map(({ id, thumbnail, title, desc, verified }) => (
                    <li key={id}>
                        {verified ? (
                            <div className={css.verifiedStatus}>
                                 <img src={verifiedIcon} /><span>verified</span>
                            </div>
                        ) : null }
                        <div className={css.projectThumbnail}>
                            <img src={thumbnail} alt={title}/>
                        </div>
                        <h3>{title}</h3>
                        <p className={css.projectDescription}>{desc}</p>
                    </li>
                ))}
            </ul> 
        </div>   
    );
};

const Projects: any [] = [
    { id: 1, thumbnail: project1, title: 'Project 1', desc: 'Lorem ipsum', verified: true },
    { id: 2, thumbnail: project2, title: 'Project 2', desc: 'Lorem ipsum', verified: false },
    { id: 3, thumbnail: project1, title: 'Project 3', desc: 'Lorem ipsum', verified: false },
    { id: 4, thumbnail: project1, title: 'Project 1', desc: 'Lorem ipsum', verified: true },
    { id: 5, thumbnail: project2, title: 'Project 2', desc: 'Lorem ipsum', verified: false },
    { id: 6, thumbnail: project1, title: 'Project 3', desc: 'Lorem ipsum', verified: false },
  ];