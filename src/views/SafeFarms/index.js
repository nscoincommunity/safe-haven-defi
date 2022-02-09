import { useState, useCallback } from 'react';
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { Link } from "@mui/material";
import ConnectWalletButton from '../../components/ConnectWalletButton';
import { Button, Skeleton, Image, Flex } from "@pancakeswap/uikit";
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
// import Slider from "react-slick";
import Web3 from 'web3';
import PageHeader from '../../components/PageHeader';
import Page from '../../components/Layout/Page'
import SltHarvestBalance from './components/SltHarvestBalance'
import SltWalletBalance from './components/SltWalletBalance'
import useAllEarnings from '../../hooks/useAllEarnings'
import { useTVL, useAprs } from '../../hooks/useSafeFarms';
import useFarmsWithBalance from '../../hooks/useFarmsWithBalance';
import useAllHarvest from './hooks/useAllHarvest'
import useTokenBalance from '../../hooks/useTokenBalance';
import { getsltTokenAddress } from '../../utils/addressHelpers';
import { getBalanceNumber, displayNumber } from '../../utils/formatBalance';
import { getDividendDistributorAddress } from '../../utils/addressHelpers';
import dividendDistributorABI from '../../abi/dividendDistributorContract.json';
import HavenLogo from '../../assets/images/HavenLogo.png'
import './safefarms.scss';

const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"));

const Label = styled.div`
  color: #253449cc;
  font-size: 14px;
`

export default function SafeFarms() {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React();
  const isAppLoading = useSelector(state => state.app.loading);
  const app = useSelector(state => state.app);

  const sltPrice = app.priceOfOneSLT
  const sltBalance = getBalanceNumber(useTokenBalance(getsltTokenAddress()).balance)
  const allEarnings = useAllEarnings()
  const tvlData = useTVL()
  const aprs = useAprs()
  const tvlValue = tvlData.reduce((partial_sum, a) => partial_sum + a, 0);
  const farmsWithBalance = useFarmsWithBalance()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

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
    <div className='safefarms-view'>
      <PageHeader>
        <Flex justifyContent="center">
          <Image src={HavenLogo} width={150} height={150} alt="" />
        </Flex>
      </PageHeader>
      <Page className='safefarms-view-content'>
        <div className='safefarms-actions'>
          <div></div>
          <div className='safefarms-actions-buttons'>
            <Button
              as="a"
              href="https://pancakeswap.finance/swap?outputCurrency=0x9caE753B661142aE766374CEFA5dC800d80446aC" 
              external
            >
              BUY $HAVEN
            </Button>
            <Button onClick={claimBNB}>CLAIM ETH</Button>
          </div>
        </div>
        <div container className="safefarms-header">
          <div className="safefarms-header-left">
            <h2>Farms & Staking</h2>
            {/* <img src={AddTokenIcon} alt="token logo" onClick={} /> */}
            <div className="token-cardboxes">
              <div className="token-cardbox">
                <Label>
                  {isAppLoading ? (
                    <Skeleton width={50} />
                  ) : (
                    `~$${(sltPrice * earningsSum).toFixed(2)}`
                  )}
                </Label>
                <SltHarvestBalance earningsSum={earningsSum.toFixed(2)}/>
                <Label><b>SLT</b> to Harvest</Label>
              </div>
              <div className="token-cardbox">
              <Label>
                  {isAppLoading ? (
                    <Skeleton width={50} />
                  ) : (
                    `~$${(sltPrice * sltBalance).toFixed(2)}`
                  )}
                </Label>
                <SltWalletBalance sltBalance={sltBalance.toFixed(2)} />
                <Label><b>SLT</b> in Wallet</Label>
              </div>
            </div>
            {!account && <ConnectWalletButton />}
            {account && <Button
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
            >
              Harvest all ({balancesWithValue.length})
            </Button>}
          </div>
          <div className='safefarms-header-right'>
            <h2>Farms & Staking</h2>
          </div>
        </div>

        <div className="safefarms-body">
          <div className="safefarms-tvl-content">
            <h2>Total Value Locked (TVL)</h2>
            <h1>
              {isAppLoading ? (
                <Skeleton width={100} />
              ) : (
                `$ ${displayNumber(tvlValue)}`
              )}
            </h1>
            <h5>SLT Stats</h5>
            <div className="token-info-items">
              <div className="token-info-item">
                <h3>
                  {isAppLoading ? (
                    <Skeleton width={100} />
                  ) : (
                    new Intl.NumberFormat('en-US').format(app.slttotalSupply.toFixed(2))
                  )}
                </h3>
                <h6>Total SLT Supply</h6>
              </div>
              <div className="token-info-item">
                <h3>
                  {isAppLoading ? (
                    <Skeleton width={100} />
                  ) : (
                    `$ ${new Intl.NumberFormat('en-US').format(app.sltmarketCap.toFixed(2))}`
                  )}
                </h3>
                <h6>Market Cap</h6>
              </div>
              <div className="token-info-item">
                <h3>
                  {isAppLoading ? (
                    <Skeleton width={100} />
                  ) : (
                    new Intl.NumberFormat('en-US').format(app.sltburntTokens.toFixed(2))
                  )}
                </h3>
                <h6>Total SLT Burned</h6>
              </div>
              <div className="token-info-item">
                <h3>
                  {isAppLoading ? (
                    <Skeleton width={100} />
                  ) : (
                    `$ ${new Intl.NumberFormat('en-US').format(app.priceOfOneSLT)}`
                  )}
                </h3>
                <h6>SLT Price</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="safefarms-footer">
          <div className="safefarms-footer-item">
            <Link href="/"></Link>
          </div>
          <div className="safefarms-footer-item">
            <div>
              <h4>Earn up to</h4>
              <h3>
                {Math.max(...aprs) ? (
                  `${displayNumber(Math.max(...aprs))}% APR`
                ) : (
                  <Skeleton width={100} />
                )}
              </h3>
              <h4>in Farms</h4>
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
          <div className="safefarms-footer-item">
            <Link href="/"></Link>
          </div>
        </div>
      </Page>
    </div>
  )
}