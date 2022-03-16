import React, { useState } from 'react';
import * as css from './NewProjectForm.module.pcss';
import addLogoIcon from '../images/addLogo.svg';

export const NewProjectForm = () => {
    const [formValues, setFormValues] = useState<ProjectFormValues | null>(null);


    return (
        <form className={css.form}>
            <label htmlFor='logo' className={css.fileLabel}>
                <img src={addLogoIcon} className={css.addLogoIcon}/>
            </label>
            <input type='file' accept=".png, .jpeg, .svg" id="logo" name="logo" className={css.fileInput} onChange={(e)=>setFormValues({...formValues, logo: e.target.value})}/>
            <label htmlFor='name' className={css.label}>Name of project</label>
            <input id="name" minLength={5} maxLength={20} type='text' className={css.input} required onChange={(e)=>setFormValues({...formValues, name: e.target.value})}/>
            <label htmlFor='description' className={css.label}>Description of project</label>
            <input id="description" minLength={30} className={css.input} required onChange={(e)=>setFormValues({...formValues, description: e.target.value})}/>
            <label htmlFor='financeGoal' className={css.label}>Financial goal</label>
            <input id="financialGoal" type='text' className={css.input} required onChange={(e)=>setFormValues({...formValues, financeGoal: e.target.value})}/>
        </form>
    )
}

type ProjectFormValues = {
    logo?: string;
    name?: string;
    description?: string;
    financeGoal?: string;
}