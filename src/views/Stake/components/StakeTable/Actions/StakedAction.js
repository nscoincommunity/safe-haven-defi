import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button, useModal, IconButton, AddIcon, MinusIcon, Text, Heading } from '@pancakeswap/uikit'
import { useLocation } from 'react-router-dom'
import { BigNumber } from 'bignumber.js'
import ConnectWalletButton from '../../../../../components/ConnectWalletButton'
import Balance from '../../../../../components/Balance';
import { useWeb3React } from '@web3-react/core';
import { useStakeUser } from '../../../../../store/slices/stake-slice/hooks'
import { fetchStakeUserDataAsync } from '../../../../../store/slices/stake-slice'
import { useERC20 } from '../../../../../hooks/useContract';
import { useDispatch, useSelector } from 'react-redux'
import { getBalanceAmount, getFullDisplayBalance, getBalanceNumber } from '../../../../../utils/formatBalance'
import useUnstakeStakes from '../../../hooks/useUnstakeStakes'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import useStakes from '../../../hooks/useStakes'
import useApproveStake from '../../../hooks/useApproveStake'
import { ActionContainer, ActionTitles, ActionContent } from './styles'

const IconButtonWrapper = styled.div`
  display: flex;
`

const Staked = ({
  pid,
  apr,
  userData,
  multiplier,
  tokenAddress,
  stakeSymbol,
  stakeLabel,
  token,
  tokenPriceBusd
}) => {
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { allowance, tokenBalance, stakedBalance } = useStakeUser(pid)
  const { onStake } = useStakes(pid)
  const { onUnstake } = useUnstakeStakes(pid)
  const location = useLocation()
  const sltPrice = new BigNumber(useSelector(state => state.app.priceOfOneSLT))
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const getTokenLink = tokenAddress ? `https://pancakeswap.finance/swap?outputCurrency=${tokenAddress}` : 'https://pancakeswap.finance/swap'

  const handleStake = async (amount) => {
    await onStake(amount)
    dispatch(fetchStakeUserDataAsync({ account, pids: [pid] }))
  }

  const handleUnstake = async (amount) => {
    await onUnstake(amount)
    dispatch(fetchStakeUserDataAsync({ account, pids: [pid] }))
  }

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN)
    }
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
      return getFullDisplayBalance(stakedBalance).toLocaleString()
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      stakePrice={tokenPriceBusd}
      stakeLabel={stakeLabel}
      apr={apr}
      stakedBalance={stakedBalance}
      onConfirm={handleStake}
      tokenName={stakeSymbol}
      multiplier={multiplier}
      getTokenLink={getTokenLink}
      sltPrice={sltPrice}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} stakePrice={tokenPriceBusd} tokenName={stakeSymbol} withdrawFee={userData.withdrawFee} lastDepositTime={userData.lastDepositTime} />,
  )
  const stakeContract = useERC20(token.address)
  const dispatch = useDispatch()
  const { onApprove } = useApproveStake(stakeContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchStakeUserDataAsync({ account, pids: [pid] }))

      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text bold textTransform="uppercase" color="#253449" fontSize="12px">
            Start Staking
          </Text>
        </ActionTitles>
        <ActionContent>
          <ConnectWalletButton width="100%" />
        </ActionContent>
      </ActionContainer>
    )
  }

  if (isApproved) {
    if (stakedBalance.gt(0)) {
      return (
        <ActionContainer>
          <ActionTitles>
            <Text bold textTransform="uppercase" color="#253449" fontSize="12px" pr="4px">
              {stakeSymbol}
            </Text>
            <Text bold textTransform="uppercase" color="#253449" fontSize="12px">
              Staked
            </Text>
          </ActionTitles>
          <ActionContent>
            <div>
              <Heading color="#253449">{displayBalance()}</Heading>
              {stakedBalance.gt(0) && (new BigNumber(tokenPriceBusd)).gt(0) && (
                <Balance
                  fontSize="12px"
                  color="#253449"
                  decimals={2}
                  value={getBalanceNumber((new BigNumber(tokenPriceBusd)).times(stakedBalance))}
                  unit=" USD"
                  prefix="~"
                />
              )}
            </div>
            <IconButtonWrapper>
              <IconButton variant="primary" onClick={onPresentWithdraw} mr="6px">
                <MinusIcon color="#fff" width="20px" />
              </IconButton>
              <IconButton
                variant="primary"
                onClick={onPresentDeposit}
                disabled={['history'].some((item) => location.pathname.includes(item))}
              >
                <AddIcon color="#fff" width="20px" />
              </IconButton>
            </IconButtonWrapper>
          </ActionContent>
        </ActionContainer>
      )
    }

    return (
      <ActionContainer>
        <ActionTitles>
          <Text bold textTransform="uppercase" color="#253449" fontSize="12px" pr="4px">
            STAKE
          </Text>
          <Text bold textTransform="uppercase" color="#253449" fontSize="12px">
            {stakeSymbol}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Button
            width="100%"
            onClick={onPresentDeposit}
            variant="primary"
            disabled={['history'].some((item) => location.pathname.includes(item))}
          >
            Stake
          </Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Text bold textTransform="uppercase" color="#253449" fontSize="12px">
          Enable Stake
        </Text>
      </ActionTitles>
      <ActionContent>
        <Button width="100%" disabled={requestedApproval} onClick={handleApprove} variant="primary">
          Enable
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default Staked
