import { useWalletModal } from '@pancakeswap/uikit';
import { useWeb3React } from '@web3-react/core';
import useAuth from '../../../hooks/useAuth';
import { useTranslation } from '../../../contexts/Localization';
import "./connect-menu.scss";

function ConnectMenu() {
    const { t } = useTranslation()
    const { login, logout } = useAuth()
    const { onPresentConnectModal } = useWalletModal(login, logout, t);
    const { account } = useWeb3React();
    let buttonText = "Connect Wallet";

    if (account) {
        buttonText = "Disconnect";
    }

    const walletControl = () => {
        if (account) {
            logout();
            return;
        }
        onPresentConnectModal();
    }

    return (
        <div className="connect-button" onClick={walletControl}>
            <p>{buttonText}</p>
        </div>
    );
}

export default ConnectMenu;
