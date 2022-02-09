import { AppBar, Toolbar, Link, useMediaQuery } from "@mui/material";
import { IconButton } from '@pancakeswap/uikit'
import { makeStyles } from "@mui/styles";
// import { getBscScanLink } from '../../utils';
// import { shorten } from "../../utils/shorten";
import SafeHavenIcon from "../../assets/images/HavenLogo.png";
import SafeHavenTextLogo from "../../assets/images/SafeHavenTextLogo.png";
import Drawer1Icon from "../../assets/icons/drawer1.svg"
import Drawer2Icon from "../../assets/icons/drawer2.svg"
import ConnectButton from "./connect-button";
import "./header.scss";

const useStyles = makeStyles({
    appBar: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        background: "#015a87!important",
        backdropFilter: "none",
        zIndex: 10,
        width: "100%",
    }
});

function Header({ handleDrawerToggle, mobileOpen }) {
    const classes = useStyles();
    const isSmallerScreen = useMediaQuery("(max-width: 576px)");

    return (
        <div>
            <AppBar position="sticky" className={classes.appBar} elevation={0}>
                <Toolbar disableGutters className="dapp-topbar">
                    <IconButton variant="text" onClick={handleDrawerToggle}>
                        {mobileOpen && <img src={Drawer1Icon} width={30} height={30} alt="" /> }
                        {!mobileOpen && <img src={Drawer2Icon} width={30} height={30} alt="" /> }
                    </IconButton>
                    <div className="branding-logo">
                        <Link href="/">
                            <img className="branding-logo-image" alt="" width="50" src={SafeHavenIcon} />
                            {!isSmallerScreen && <img src={SafeHavenTextLogo} alt="" width={160} />}
                        </Link>
                    </div>
                        {/* {account && (
                            <div className="wallet-link">
                                <Link href={getBscScanLink(account, 'address', chainId)} target="_blank">
                                    <p>{shorten(account)}</p>
                                </Link>
                            </div>
                        )} */}
                    <div className="dapp-topbar-btns-wrap">
                        <ConnectButton />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
