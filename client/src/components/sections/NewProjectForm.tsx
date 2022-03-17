import React, { useEffect, useRef, useState } from 'react';
import * as css from './NewProjectForm.module.pcss';
import addLogoIcon from '../images/addLogo.svg';
import { Button } from '../buttons/Button';
import { Select, Option } from '../select/Select';

interface NewProjectProps {
    projectType: string;
}

export const NewProjectForm = ({ projectType }: NewProjectProps) => {
    const [formValues, setFormValues] = useState<ProjectFormValues | null>(null);
    const [isSocialMediaOpened, setSocialMediaOpened] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | any>(null);
    const [uploadedFileObjURL, setUploadedFileObjURL] = useState<string>('');

    console.log(formValues);

    useEffect(() => {
        setFormValues({ ...formValues, type: projectType });
    }, []);

    useEffect(() => {
        if (!uploadedFile) return;
        setUploadedFileObjURL(URL.createObjectURL(uploadedFile));
    }, [uploadedFile]);

    const selectedLogo = uploadedFile && URL.createObjectURL(uploadedFile);
    console.log(selectedLogo);

    const handleSelectedCurrencies = (selectedCurrency: Option[]) => {
        const currencyId = selectedCurrency.map((currency) => currency.id);
        console.log({ currencyId });
        setFormValues({ ...formValues, currencyId });
    };

    const createProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();

        if (uploadedFile) {
            formData.append('file', uploadedFile, uploadedFile.name);
        }
        if (formValues) {
            formData.set('data', JSON.stringify(formValues));
        }

        const res = await fetch('/api/create/organization', {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        console.log(data);
    };
    return (
        <>
            <form className={css.form} onSubmit={(e) => createProject(e)}>
                <label htmlFor="logo" className={css.fileLabel}>
                    {uploadedFile ? (
                        <div className={css.imageWrapper}>
                            <img src={uploadedFileObjURL} alt={'userName'} className={css.image} />
                        </div>
                    ) : (
                        <img src={addLogoIcon} className={css.addLogoIcon} />
                    )}
                </label>
                <input
                    type="file"
                    accept=".png, .jpeg, .svg"
                    id="logo"
                    name="logo"
                    className={css.fileInput}
                    required
                    onChange={(e) => setUploadedFile(e.target.files && e.target.files[0])}
                />
                <label htmlFor="name" className={css.label}>
                    Name of project
                </label>
                <input
                    id="name"
                    type="text"
                    className={css.input}
                    required
                    onChange={(e) => setFormValues({ ...formValues, organization_name: e.target.value })}
                />
                <label htmlFor="description" className={css.label}>
                    Description of project
                </label>
                <input
                    id="description"
                    className={css.input}
                    required
                    onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                />
                <label htmlFor="financeGoal" className={css.label}>
                    Financial goal
                </label>
                <input
                    id="financialGoal"
                    type="number"
                    className={css.input}
                    required
                    onChange={(e) => setFormValues({ ...formValues, target_raised: Number(e.target.value) })}
                />
                <p onClick={() => setSocialMediaOpened(!isSocialMediaOpened)} className={css.socialMediaTitle}>
                    <span>{isSocialMediaOpened ? 'Close' : 'Add'}</span> social media{' '}
                    <span>{isSocialMediaOpened ? '-' : '+'}</span>
                </p>
                {isSocialMediaOpened && (
                    <>
                        <label htmlFor="discord" className={css.label}>
                            Discord
                        </label>
                        <input
                            id="discord"
                            type="string"
                            className={css.input}
                            onChange={(e) => setFormValues({ ...formValues, discord: e.target.value })}
                        />
                        <label htmlFor="facebook" className={css.label}>
                            Facebook
                        </label>
                        <input
                            id="facebook"
                            type="string"
                            className={css.input}
                            onChange={(e) => setFormValues({ ...formValues, facebook: e.target.value })}
                        />
                        <label htmlFor="instagram" className={css.label}>
                            Instagram
                        </label>
                        <input
                            id="instagram"
                            type="string"
                            className={css.input}
                            onChange={(e) => setFormValues({ ...formValues, instagram: e.target.value })}
                        />
                        <label htmlFor="telegram" className={css.label}>
                            Telegram
                        </label>
                        <input
                            id="telegram"
                            type="string"
                            className={css.input}
                            onChange={(e) => setFormValues({ ...formValues, telegram: e.target.value })}
                        />
                        <label htmlFor="twitter" className={css.label}>
                            Twitter
                        </label>
                        <input
                            id="twitter"
                            type="string"
                            className={css.input}
                            onChange={(e) => setFormValues({ ...formValues, twitter: e.target.value })}
                        />
                    </>
                )}
                <Select
                    options={currencies}
                    selectName="currency"
                    defaultOption="- Select currenies -"
                    label="Currencies: "
                    handleSelectedValuesChange={(selectedOptions) => handleSelectedCurrencies(selectedOptions)}
                />
                <button type="submit">Click me</button>
            </form>
        </>
    );
};

const currencies = [
    {
        name: 'SOL',
        id: 1,
    },
    {
        name: 'USDT',
        id: 2,
    },
    {
        name: 'USDC',
        id: 3,
    },
];

type ProjectFormValues = {
    organization_name?: string;
    description?: string;
    organization_foto_src?: any;
    target_raised?: number;
    organization_adress?: string;
    type?: string;
    discord?: string;
    facebook?: string;
    instagram?: string;
    telegram?: string;
    twitter?: string;
    currencyId?: number[];
};
