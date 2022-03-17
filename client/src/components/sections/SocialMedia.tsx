import React from 'react';
import * as css from './SocialMedia.module.pcss';
import facebookIcon from '../../images/facebook.svg';
import twitterIcon from '../../images/twitter.svg';
import instagramIcon from '../../images/instagram.svg';
import discordIcon from '../../images/discord.svg';
import telegramIcon from '../../images/telegram.svg';

interface SocialMediaProps {
    facebookLink?: string;
    instagramLink?: string;
    twitterLink?: string;
    discordLink?: string;
    telegramLink?: string;
}

export const SocialMedia = ({
    facebookLink,
    instagramLink,
    twitterLink,
    discordLink,
    telegramLink
} : SocialMediaProps ) => (
    <ul className={css.socialMediaList}>
        {facebookLink && 
            <li>
                <a href={facebookLink}>
                    <img src={facebookIcon} alt="facebook" className={css.icon}/>
                </a>
            </li>
        }
        {instagramLink && 
            <li>
                <a href={instagramLink}>
                   <img src={instagramIcon} alt="instagram" className={css.icon}/>
                </a>
            </li>
        }
        {twitterLink && 
            <li>
                <a href={twitterLink}>
                   <img src={twitterIcon} alt="twitter" className={css.icon}/>
                </a>
            </li>
        }
        {discordLink && 
            <li>
                <a href={discordLink}>
                    <img src={discordIcon} alt="discord" className={css.icon}/>
                </a>
            </li>
        }
        {telegramLink && 
            <li>
                <a href={telegramLink}>
                    <img src={telegramIcon} alt="telegram" className={css.icon}/>
                </a>
            </li>
        }
    </ul>
)