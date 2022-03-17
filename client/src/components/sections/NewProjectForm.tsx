import React, { useEffect, useState } from 'react';
import * as css from './NewProjectForm.module.pcss';
import addLogoIcon from '../images/addLogo.svg';
import { Select, Option } from '../select/Select';
import { Popup } from '../popup/Popup';
import { useNavigate } from "react-router-dom";
import { NextIcon } from '../images/NextIcon';
import { Button } from '../buttons/Button';

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
    console.log(isProjectCreated)

    useEffect(() => {
        setFormValues({ ...formValues, type: projectType });
    }, []);

    useEffect(() => {
        if (!uploadedFile) return;
        setUploadedFileObjURL(URL.createObjectURL(uploadedFile));
    }, [uploadedFile]);

    const handleSelectedCurrencies = (selectedCurrency: Option[] | undefined ) => {
        if(selectedCurrency){
            const currencyId = selectedCurrency.map((currency) => currency.id);
            setFormValues({ ...formValues, currencyId });
        }        
    };
    const handleStatusPopup = () => {
        navigate('/');
        handleCloseClick(true);
        setIsProjectCreated(false)
        window.location.reload();
    }

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
        if (res.ok){
            setIsProjectCreated(true)
        } else {
            setIsProjectCreated(false)
        }
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
                    title="Currencies: "
                    handleSelectedValuesChange={(selectedOptions) => handleSelectedCurrencies(selectedOptions)}
                    isMultiple
                />
                <button type="submit">Click me</button>
            </form>
            <Popup 
                isPopupOpened={isProjectCreated}
                onClose={()=>{handleStatusPopup()}}
                content= {
                    <div className={css.popupContent}>
                           <p className={css.popupTitle}>Your project has been successfully created!</p>
                            <Button onClick={()=>handleStatusPopup()}>Go to all projects <NextIcon /></Button> 
                    </div>
                }
            />
        </>
    );
};

const currencies = [
    {
        name: 'SOL',
        id: 1,
        foto_src:"<svg width='439' height='439' viewBox='0 0 439 439' fill='none' xmlns='http://www.w3.org/2000/svg'> <path d='M439 219.5C439 340.727 340.727 439 219.5 439C98.2735 439 0 340.727 0 219.5C0 98.2735 98.2735 0 219.5 0C340.727 0 439 98.2735 439 219.5Z' fill='#F2C45B'/> <path d='M115.89 314.105C117.797 312.81 119.577 310.869 120.463 308.115C121.449 305.053 120.868 302.359 120.406 300.868C120.391 300.818 120.375 300.768 120.359 300.719L120.727 298.573C121.741 299.144 122.91 299.911 124.243 300.848C124.563 301.074 125.012 301.394 125.479 301.727C126.093 302.165 126.739 302.626 127.171 302.927C127.91 303.441 128.962 304.159 130.076 304.75C159.553 323.071 183.93 330.624 203.293 329.688C223.311 328.721 237.35 318.651 244.591 303.954C251.59 289.749 251.834 272.147 246.929 255.841C241.992 239.429 231.61 223.48 216.135 212.442C190.058 193.843 166.164 165.564 154.082 141.517C147.946 129.305 145.505 119.456 146.149 113.025C146.449 110.032 147.366 108.222 148.463 107.056C149.561 105.89 151.56 104.604 155.413 103.969C163.574 102.625 173.014 99.6859 182.592 96.7033C186.311 95.5452 190.051 94.3806 193.745 93.3003C207.552 89.263 222.168 85.8713 237.532 85.9002C267.33 85.9561 302.301 98.8936 339.121 152.713C386.421 221.849 360.453 299.106 305.963 339.692C278.788 359.932 244.883 370.676 210.042 366.591C178.671 362.913 145.814 347.126 115.89 314.105ZM121.376 296.212C121.376 296.213 121.366 296.233 121.342 296.269C121.363 296.228 121.375 296.21 121.376 296.212ZM118.415 297.562C118.413 297.56 118.444 297.563 118.509 297.579C118.449 297.572 118.416 297.564 118.415 297.562Z' fill='white' stroke='black' stroke-width='17.8'/> <path d='M142.967 107.5C142.967 107.5 227.467 84.9999 245.967 84.9999C264.467 84.9999 338.393 120.898 359.967 186.5C390.552 279.5 307.362 340.478 297.967 334.5C387.467 260.5 240.967 123.716 168.967 134C159.967 135.286 164.967 143 164.967 143L162.967 163L147.967 138L142.967 107.5Z' fill='black'/> <path d='M347.656 158.526C374.34 205.498 368.794 178.605 362.871 232.302C373.833 214.569 390.973 227.847 398.052 234.628C399.321 235.843 401.414 235.089 401.355 233.334C401.085 225.369 398.803 208.158 385.618 189.693C367.538 164.373 347.656 158.526 347.656 158.526Z' fill='black'/> <path d='M362.871 232.302C368.794 178.605 374.34 205.498 347.656 158.526C347.656 158.526 367.538 164.373 385.618 189.693C398.803 208.158 401.085 225.369 401.355 233.334C401.414 235.089 399.321 235.843 398.052 234.628C390.973 227.847 373.833 214.569 362.871 232.302ZM362.871 232.302C363.891 229.781 365.484 225.847 365.484 225.847' stroke='black'/> <path d='M132.971 225.139C121.713 244.201 98.6131 242.771 99.0553 265.505C119.687 311.345 119.81 308.057 119.81 308.057C158.027 286.587 142.322 239.181 136.651 225.238C136.01 223.662 133.836 223.675 132.971 225.139Z' fill='black'/> <path d='M46.3388 267.283C68.2902 270.147 81.385 251.064 99.0273 265.409C122.448 309.889 119.781 307.961 119.781 307.961C79.3339 324.859 51.6467 283.297 44.1509 270.244C43.3037 268.769 44.6517 267.063 46.3388 267.283Z' fill='black'/> <path d='M230.467 239.002C230.467 239.002 252.467 261.505 240.967 265.002C226.627 256.176 200.93 263.035 188.335 267.283C185.234 268.329 182.194 265.577 183.312 262.501C187.595 250.716 198.171 228.9 218.467 226.002C230.467 223 230.467 239.002 230.467 239.002Z' fill='black'/> <path d='M243.967 129C241.467 125.5 236.467 116 251.967 116C267.467 116 291.151 133.551 295.967 140.043C294.467 144 284.467 144.885 279.467 144.5C274.467 144.115 265.967 143.293 259.467 140.043C252.967 136.793 246.467 132.5 243.967 129Z' fill='white'/> </svg>",
        
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
