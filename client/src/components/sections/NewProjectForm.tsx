import React, { useEffect, useState } from 'react';
import * as css from './NewProjectForm.module.pcss';
import addLogoIcon from '../images/addLogo.svg';
import { Select, Option } from '../select/Select';
import { Popup } from '../popup/Popup';
import { useNavigate } from 'react-router-dom';
import { NextIcon } from '../images/NextIcon';
import { Button } from '../buttons/Button';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

interface NewProjectProps {
    projectType: string;
    handleCloseClick: (isCloseClicked: boolean) => void;
}

export const NewProjectForm = ({ projectType, handleCloseClick }: NewProjectProps) => {
    const [formValues, setFormValues] = useState<ProjectFormValues | null>(null);
    const [isSocialMediaOpened, setSocialMediaOpened] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadedFileObjURL, setUploadedFileObjURL] = useState<string>('');
    const [isProjectCreated, setIsProjectCreated] = useState<boolean>(false);
    const navigate = useNavigate();
    const publicKey = useWallet();
    const isOrganizationProject = projectType === 'organization';
    const isInrevidiulProject = !isOrganizationProject;
    const { setVisible } = useWalletModal();

    const [currenciesList, setCurrenciesList] = useState([]);
    useEffect(() => {
        if (isInrevidiulProject) {
            if (publicKey.publicKey) {
                setFormValues({
                    ...formValues,
                    type: projectType,
                    organization_adress: publicKey.publicKey.toString(),
                });
            } else {
                setFormValues({ ...formValues, type: projectType });
                setVisible(true);
            }
        } else {
            setFormValues({ ...formValues, type: projectType });
        }
    }, [publicKey, isInrevidiulProject]);

    useEffect(() => {
        if (!uploadedFile) return;
        setUploadedFileObjURL(URL.createObjectURL(uploadedFile));
    }, [uploadedFile]);

    const handleSelectedCurrencies = (selectedCurrency: Option[] | undefined) => {
        if (selectedCurrency) {
            const currencyId = selectedCurrency.map((currency) => currency.id);
            setFormValues({ ...formValues, currencyId });
        }
    };
    const handleStatusPopup = () => {
        navigate('/');
        handleCloseClick(true);
        setIsProjectCreated(false);
        window.location.reload();
    };

    const createProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formValues?.organization_adress) {
            setVisible(true);
        } else {
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
            if (res.ok) {
                setIsProjectCreated(true);
            } else {
                setIsProjectCreated(false);
            }
        }
    };
    const getCurrencies = async () => {
        const res = await fetch('/api/get/currency', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await res.json();
        data.forEach((o: { id: number }, i: number) => (o.id = i + 1));
        setCurrenciesList(data);
    };

    useEffect(() => {
        getCurrencies();
    }, []);
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
                {isOrganizationProject && (
                    <>
                        <label htmlFor="name" className={css.label}>
                            Organization Wallet ID
                        </label>
                        <input
                            id="name"
                            type="text"
                            className={css.input}
                            required
                            onChange={(e) => setFormValues({ ...formValues, organization_adress: e.target.value })}
                        />
                    </>
                )}
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
                    options={currenciesList}
                    selectName="currency"
                    defaultOption="- Select currenies -"
                    title="Currencies: "
                    handleSelectedValuesChange={(selectedOptions) => handleSelectedCurrencies(selectedOptions)}
                    isMultiple
                />
                <Button type="submit" buttonClassName={css.createButton}>
                    Create Project
                </Button>
            </form>
            <Popup
                isPopupOpened={isProjectCreated}
                onClose={() => {
                    handleStatusPopup();
                }}
                content={
                    <div className={css.popupContent}>
                        <p className={css.popupTitle}>Your project has been successfully created!</p>
                        <Button onClick={() => handleStatusPopup()}>
                            Go to all projects <NextIcon />
                        </Button>
                    </div>
                }
            />
        </>
    );
};

type ProjectFormValues = {
    organization_name?: string;
    description?: string;
    organization_foto_src?: File;
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
