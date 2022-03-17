import React, { FC, ReactNode, useState } from 'react';
import * as css from './Navbar.module.pcss';
import { Link } from 'react-router-dom';
import { Button } from '../buttons/Button';
import { Popup } from '../popup/Popup';
import { StartOwnProject } from './StartOwnProject';
import cx from 'classnames/bind';
import { PatronusLandLogo } from '../images/PatronusLandLogo/PatronusLandLogo';

export interface NavbarProps {
    children: ReactNode;
}
export const Navbar: FC<NavbarProps> = ({ children }) => {
    const [isStartPopupOpened, setIsStartPopupOpened] = useState<boolean>(false);
    const [isButtonHover, setIsButtonHover] = useState<boolean>(false);
    return (
        <>
            <nav>
                <div className={css.navbarContainer}>
                    <div className={css.logo}>
                        <Link to="/">
                            <PatronusLandLogo />
                        </Link>
                    </div>
                    <Button
                        onClick={() => setIsStartPopupOpened(true)}
                        onMouseEnter={() => setIsButtonHover(true)}
                        onMouseLeave={() => setIsButtonHover(false)}
                        buttonClassName={cx(css.button, { [css.hoveredButton] : isButtonHover})}

                    >
                        {isButtonHover ? 'Get Start' : '+ Start Own Project'}
                    </Button>
                    <div className={css.buttons}>
                        <div className={css.connectWalletButton}>{children}</div>
                    </div>
                </div>
            </nav>
            <Popup
                title="Start Own Project"
                isPopupOpened={isStartPopupOpened}
                content={<StartOwnProject onCancleClick={() => setIsStartPopupOpened(false)} />}
                onClose={() => setIsStartPopupOpened(false)}
            />
        </>
    );
};
