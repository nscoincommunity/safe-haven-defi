import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./social";
import { Link } from "@mui/material";
import "./drawer-content.scss";
import DocsIcon from "../../../assets/icons/stake.svg";
import classnames from "classnames";
import DashboardIcon from "../../../assets/icons/Dashboard.png";
import SafeFarmIcon from "../../../assets/icons/SafeFarms.png";
import FarmsIcon from "../../../assets/icons/Farms.png";
import StakeIcon from "../../../assets/icons/Stake.png";
import EarnIcon from "../../../assets/icons/Earn.png";
import SafePadIcon from "../../../assets/icons/SafePad.png";
import ReferralIcon from "../../../assets/icons/referral.svg";
import SwapIcon from "../../../assets/icons/swap.svg";



function NavContent({mobileOpen, isSmallerScreen}) {
    const [isActive] = useState();

    const checkPage = useCallback((location, page) => {
        const currentPath = location.pathname.replace("/", "");
        if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
            return true;
        }
        if (currentPath === "farms" && page === "farms") {
            return true;
        }
        if (currentPath === "pools" && page === "pools") {
            return true;
        }
        if (currentPath.indexOf("safestake") >= 0 && page === "safestake") {
            return true;
        }
        if (currentPath.indexOf("safefarms") >= 0 && page === "safefarms") {
            return true;
        }
        if (currentPath.indexOf("safepad") >= 0 && page === "safepad") {
            return true;
        }
        if (currentPath.indexOf("swap") >= 0 && page === "swap") {
            return true;
        }
        if (currentPath.indexOf("referral") >= 0 && page === "referral") {
            return true;
        }
        if (currentPath.indexOf("safetools") >= 0 && page === "safetools") {
            return true;
        }
        if (currentPath.indexOf("safelock") >= 0 && page === "safelock") {
            return true;
        }
        if (currentPath.indexOf("calculator") >= 0 && page === "calculator") {
            return true;
        }
        return false;
    }, []);

    return (
        <div className="dapp-sidebar" style={{minWidth: mobileOpen ? 280 : 50, paddingTop: isSmallerScreen ? 20 : 100}}>
            <div className="dapp-menu-links">
                <div className="dapp-nav">
                    <Link
                        component={NavLink}
                        to="/dashboard"
                        isActive={(match, location) => {
                            return checkPage(location, "dashboard");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={DashboardIcon} style={{marginRight: mobileOpen ? 10 : 0}}  />
                            {mobileOpen && <p>Dashboard</p>}
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/safefarms"
                        isActive={(match, location) => {
                            return checkPage(location, "safefarms");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={SafeFarmIcon} style={{marginRight: mobileOpen ? 10 : 0}}  />
                            {mobileOpen && <p>SafeFarms</p>}
                        </div>
                    </Link>

                    <div className="safe-sublink">
                        <Link
                            component={NavLink}
                            to="/farms"
                            isActive={(match, location) => {
                                return checkPage(location, "farms");
                            }}
                            className={classnames("button-dapp-menu", { active: isActive })}
                            style={{marginLeft: mobileOpen ? 32 : 20}}
                        >
                            <div className="dapp-menu-item">
                                <img alt="" src={FarmsIcon} style={{marginRight: mobileOpen ? 10 : 0}} />
                                {mobileOpen && <p>Farms</p>}
                            </div>
                        </Link>
                        <Link
                            component={NavLink}
                            to="/pools"
                            isActive={(match, location) => {
                                return checkPage(location, "pools");
                            }}
                            className={classnames("button-dapp-menu", { active: isActive })}
                            style={{marginLeft: mobileOpen ? 32 : 20}}
                        >
                            <div className="dapp-menu-item">
                                <img alt="" src={StakeIcon} style={{marginRight: mobileOpen ? 10 : 0}} />
                                {mobileOpen && <p>Pools</p>}
                            </div>
                        </Link>
                    </div>

                    <Link
                        component={NavLink}
                        to="/safestake"
                        isActive={(match, location) => {
                            return checkPage(location, "safestake");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={EarnIcon} style={{marginRight: mobileOpen ? 10 : 0}} />
                            {mobileOpen && <p>SafeStake</p>}
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/safepad"
                        isActive={(match, location) => {
                            return checkPage(location, "safepad");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={SafePadIcon} style={{marginRight: mobileOpen ? 10 : 0}} />
                            {mobileOpen && <p>SafePad</p>}
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/swap"
                        isActive={(match, location) => {
                            return checkPage(location, "swap");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={SwapIcon} style={{marginRight: mobileOpen ? 10 : 0}} />
                            {mobileOpen && <p>Swap</p>}
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/referral"
                        isActive={(match, location) => {
                            return checkPage(location, "referral");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            <img alt="" src={ReferralIcon} style={{marginRight: mobileOpen ? 10 : 0}} />
                            {mobileOpen && <p>Referral</p>}
                        </div>
                    </Link>
                </div>
            </div>
            <div className="dapp-menu-doc-link">
                <Link href="/" target="_blank">
                    <img alt="" src={DocsIcon} style={{marginRight: mobileOpen ? 10 : 0}} />
                    {mobileOpen && <p>Docs</p>}
                </Link>
            </div>
            <Social mobileOpen={mobileOpen} />
        </div>
    );
}

export default NavContent;
