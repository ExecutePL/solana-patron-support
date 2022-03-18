import React, { FC } from 'react';
import * as css from './Footer.module.pcss';
import discord from '../images/discord.svg';
export const Footer: FC = () => {
    const click = ()=> {
        window.open('https://discord.gg/Ce5RESaG','_blank')
    }
    return (
        <>
            <section className={css.beVerified}>
                <div className={css.container}>
                    <div className={css.verifiedInner}>
                        <div className={css.verifiedContent}>
                            <h3 className={css.heading}>Want to be verified?</h3>
                            <p className={css.subHeading}>Contact us for verification</p>
                        </div>
                        <div className={css.verifiedRight}>
                            <img src={discord} height="50" width="50" />
                            <button className={css.whiteButton} onClick={click}>Open Discord</button>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <p className={css.copyright}>Copyright © 2022 | All rights reserved</p>
            </footer>
        </>
    );
};
