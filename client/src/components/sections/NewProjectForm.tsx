import React, { useState } from 'react';
import * as css from './NewProjectForm.module.pcss';
import addLogoIcon from '../images/addLogo.svg';
import { Button } from '../buttons/Button';

export const NewProjectForm = () => {
    const [formValues, setFormValues] = useState<ProjectFormValues | null>(null);

    const test = {
        organization_name:'test',
      description:'test',
      organization_foto_src:'test',
      target_raised:1000,
      organization_adress:'test',
      type:'test',
      discord:'test',
      facebook:'test',
      instagram:'test',
      telegram:'test',
      twitter:'test',
      currencyId:[1,2],
    }

    const createProject = async () => {
        const res = await fetch('/api/create/organization', {
            method: 'POST',
            body: JSON.stringify({
                ...test,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await res.json();
        console.log(data);
    };
    return (
        <><form className={css.form}>
            <label htmlFor="logo" className={css.fileLabel}>
                <img src={addLogoIcon} className={css.addLogoIcon} />
            </label>
            <input
                type="file"
                accept=".png, .jpeg, .svg"
                id="logo"
                name="logo"
                className={css.fileInput}
                required
                onChange={(e) => setFormValues({ ...formValues, logo: e.target.value })}
            />
            <label htmlFor="name" className={css.label}>
                Name of project
            </label>
            <input
                id="name"
                minLength={5}
                maxLength={20}
                type="text"
                className={css.input}
                required
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            />
            <label htmlFor="description" className={css.label}>
                Description of project
            </label>
            <input
                id="description"
                minLength={30}
                className={css.input}
                required
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
            />
            <label htmlFor="financeGoal" className={css.label}>
                Financial goal
            </label>
            <input
                id="financialGoal"
                type="text"
                className={css.input}
                required
                onChange={(e) => setFormValues({ ...formValues, financeGoal: e.target.value })}
            />
            
        </form>
        <button onClick={createProject}>Click me</button>
        </>
    );
};

type ProjectFormValues = {
    logo?: string;
    name?: string;
    description?: string;
    financeGoal?: string;
};
