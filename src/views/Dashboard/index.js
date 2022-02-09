import { useState } from 'react';
import { useSelector } from "react-redux";
import { Grid, Zoom } from "@mui/material";
import { Skeleton, Button, Input } from '@pancakeswap/uikit';
import Web3 from 'web3';
import "./dashboard.scss";
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { getDividendDistributorAddress } from '../../utils/addressHelpers';
import dividendDistributorABI from '../../abi/dividendDistributorContract.json';

const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));

function Dashboard() {
    const isAppLoading = useSelector(state => state.app.loading);
    const app = useSelector(state => state.app);
    const { account } = useActiveWeb3React();

    const [volume, setVolume] = useState(0);
    const [usersReward, setUsersReward] = useState(0);

    const changeVolume = (e) => {
        let value = parseInt(e.target.value, 10)
        if (e.target.value === "") {
            setVolume(e.target.value);
        }
        if (!value) {
            return;
        }
        setVolume(value);
        let percentageOfUserBalance  = (app.balanceOfUser / app.circulatingSupply);
        let volumeOfRewards =  value * 0.08;
        setUsersReward(percentageOfUserBalance * volumeOfRewards);
    }

    const claimBNB = async () => {
        if (!account) {
            alert("Please connect your wallet");
            return;
        }
        const dividendDistributorContract = await new web3.eth.Contract(dividendDistributorABI, getDividendDistributorAddress())
        let Data = await dividendDistributorContract.methods.claimDividend().encodeABI();

        let Txdetail = {
            from: account,
            to: getDividendDistributorAddress(),
            value: web3.utils.toHex(web3.utils.toWei("0")),
            gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
            gasLimit: web3.utils.toHex(web3.utils.toWei('100000', 'gwei')),
            data: Data
        }
        window.ethereum.request({ method: 'eth_sendTransaction', params: [Txdetail] })
            .then(async (res) => {
                var ethFlag = true;
                while(ethFlag) {
                    await web3.eth.getTransactionReceipt(res, (error, receipt) => {
                        if (error) {
                            console.log(error)
                            alert("claim failed");
                        } else if (receipt == null) {
                    } else {
                        console.log("confirm", receipt);
                        alert("Claim Successfull");
                        ethFlag = false;
                    }
                });
            }
        })
    }

    return (
        <div className="dashboard-view">
            <div className="dashboard-infos-wrap">
                <Zoom in={true}>
                    <Grid container spacing={4}>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Current Price</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width={100} />
                                    ) : (
                                        `$ ${new Intl.NumberFormat('en-US').format(app.priceOfOneHaven)}`
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Circulating Supply</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width={200} />
                                    ) : (
                                        new Intl.NumberFormat('en-US').format(app.circulatingSupply)
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Liquidity Pool Balance</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width={160} />
                                    ) : (
                                        `$ ${new Intl.NumberFormat('en-US').format(app.liquidityPoolInDollars)}`
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Market Cap</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width={160} />
                                    ) : (
                                        `$ ${new Intl.NumberFormat('en-US').format(app.marketCap)}`
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Total $Haven Holdings</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width={200} />
                                    ) : (
                                        app.balanceOfUser
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Total ETH Paid</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width={200} />
                                    ) : (
                                        `${new Intl.NumberFormat('en-US').format(app.totalRealised)} ETH `
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Pending ETH Rewards</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width={200} />
                                    ) : (
                                        `${app.unpaidEarnings} ETH `
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Sell Tax</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width={100} />
                                    ) : (
                                        `${app.taxSaleInPercentage} %`
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Buy Tax</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width={100} />
                                    ) : (
                                        `${app.buyTaxInPercentage} % `
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Total Burned</p>
                                <p className="card-value">
                                    {isAppLoading ? (
                                        <Skeleton width={200} />
                                    ) : (
                                        new Intl.NumberFormat('en-US').format(app.burntTokens)
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div className="double-button-bar">
                                <Button
                                    as="a"
                                    href="https://pancakeswap.finance/swap?outputCurrency=0x9caE753B661142aE766374CEFA5dC800d80446aC" 
                                    external
                                >
                                    BUY $HAVEN
                                </Button>
                                <Button onClick={claimBNB}>CLAIM ETH</Button>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div className="dashboard-card trading-container">
                                <p className="trading-desc">
                                    Estimations are based on a default of the last 24h of trading volume.
                                    Change the volume to predict earnings based on other volume figures.
                                </p>
                                <div className="trading-info">
                                    <div className="mini-container">
                                        <span>Trading Volume = $</span>
                                        <Input type="text" value={volume} onChange={changeVolume} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <div className="dashboard-card trading-container-2">
                                <p>YOUR ETH EARNINGS 24H : {usersReward.toFixed(5)} USD</p>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div className="dashboard-card trading-container-2">
                                <p>
                                    {isAppLoading ? (
                                        <Skeleton width={200} />
                                    ) : (
                                        `TOTAL PAID TO HOLDERS : ${new Intl.NumberFormat('en-US').format(app.totalDistributed)} ETH`
                                    )}
                                </p>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div className="dashboard-card trading-container-2">
                                <p>
                                    {isAppLoading ? (
                                        <Skeleton width={200} />
                                    ) : (
                                        `$HAVEN BUYBACK BALANCE : ${new Intl.NumberFormat('en-US').format(app.balanceOfContract)} BNB`
                                    )}
                                </p>
                            </div>
                        </Grid>
                    </Grid>
                </Zoom>
            </div>
        </div>
    );
}

export default Dashboard;
