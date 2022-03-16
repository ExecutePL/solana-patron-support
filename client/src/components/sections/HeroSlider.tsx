import React, { FC, useEffect } from 'react';
import * as css from './HeroSlider.module.pcss';

export const HeroSlider: FC = () => {
    return (
        <section className={css.heroSection}>
            <div className={css.container}>
                <div className={css.heroContent}>
                    <h1>Blockchain platform for making donations</h1>
                    <p>Join the world's largest community of organisations and send donations via cryptocurrencies</p>
                    <button className={css.button}>
                        <span>Explore now</span>
                    </button>
                </div>
            </div>
        </section>
    );
};
