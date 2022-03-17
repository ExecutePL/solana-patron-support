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
        foto_src:
            "<svg data-name='86977684-12db-4850-8f30-233a7c267d11' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 2000'> <path d='M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z' fill='#2775ca'/> <path d='M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z' fill='#fff'/> <path d='M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zM1229.17 295.83c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z' fill='#fff'/> </svg>",
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
