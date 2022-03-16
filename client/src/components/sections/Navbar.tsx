import React, { FC,  useMemo, useState } from 'react';
import * as css from './Navbar.module.pcss';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { DEVNET_ENDPOINT } from '../../utils/constants';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { TorusWalletAdapter } from '@solana/wallet-adapter-torus';
import { Button } from '../buttons/Button';
import { Popup } from '../popup/Popup';
import { StartOwnProject } from './StartOwnProject';
export const Navbar: FC = () => {
    const connectWallet = true;
    const wallets = useMemo(
        () => (connectWallet ? [new PhantomWalletAdapter(), new TorusWalletAdapter()] : []),
        [connectWallet]
    );
    const [isStartPopupOpened, setIsStartPopupOpened] = useState<boolean>(false);
    const [isButtonHover, setIsButtonHover] = useState<boolean>(false);
    
    return (
        <>
        <nav>
            <div className={css.navbarContainer}>
                <div className={css.logo}>
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>
                <Button 
                    onClick={()=>setIsStartPopupOpened(true)} 
                    onMouseEnter={()=>setIsButtonHover(true)} 
                    onMouseLeave={()=>setIsButtonHover(false)}
                    buttonClassName={isButtonHover && css.startButton}
                >
                    {isButtonHover ? 'Get Start': '+ Start Own Project' }
                </Button>
                <div className={css.buttons}>
                   
                    <div className={css.connectWalletButton}>
                        <ConnectionProvider endpoint={DEVNET_ENDPOINT}>
                            <WalletProvider wallets={wallets} autoConnect={connectWallet}>
                                <WalletModalProvider>{connectWallet ? <WalletMultiButton /> : null}</WalletModalProvider>
                            </WalletProvider>
                        </ConnectionProvider>
                    </div>
                </div>
            </div>
        </nav>
        <Popup 
            title="Start Own Project" 
            isPopupOpened={isStartPopupOpened} 
            content={<StartOwnProject 
            onCancleClick={()=>setIsStartPopupOpened(false)}/>} 
            onClose={()=>setIsStartPopupOpened(false)}
        />
        </>
    );
};
