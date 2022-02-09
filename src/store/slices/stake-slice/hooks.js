import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from '../../../utils/bigNumber';
import stakesConfig from '../../../constants/stake';
import useRefresh from '../../../hooks/useRefresh';
import { deserializeToken } from '../user-slice/hooks/helpers';
import { fetchStakesPublicDataAsync, fetchStakeUserDataAsync } from '.'

const deserializeStakeUserData = (stake) => {
  return {
    allowance: stake.userData ? new BigNumber(stake.userData.allowance) : BIG_ZERO,
    tokenBalance: stake.userData ? new BigNumber(stake.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: stake.userData ? new BigNumber(stake.userData.stakedBalance) : BIG_ZERO,
    earnings: stake.userData ? new BigNumber(stake.userData.earnings) : BIG_ZERO,
    withdrawFee: stake.userData ? new BigNumber(stake.userData.withdrawFee) : BIG_ZERO,
    lastDepositTime: stake.userData ? new BigNumber(stake.userData.lastDepositTime) : BIG_ZERO,
  }
}

const deserializeStake = (stake) => {
  const { 
    stakeSymbol, 
    pid, 
    dual, 
    multiplier, 
    isCommunity, 
    tokenPriceBusd, 
    isWithdrawFee, 
    depositFeeBP, 
    liquidity, 
    apr, 
    stakeTokenRatio, 
    earningsPerBlock,
  } = stake
  return {
    liquidity,
    apr,
    stakeTokenRatio,
    earningsPerBlock,
    isWithdrawFee,
    depositFeeBP,
    stakeSymbol,
    pid,
    dual,
    multiplier,
    isCommunity,
    tokenPriceBusd,
    token: deserializeToken(stake.token),
    userData: deserializeStakeUserData(stake),
    tokenAmountTotal: stake.tokenAmountTotal ? new BigNumber(stake.tokenAmountTotal) : BIG_ZERO,
    stakedTotalToken: stake.stakedTotalToken ? new BigNumber(stake.stakedTotalToken) : BIG_ZERO,
    tokenTotalSupply: stake.tokenTotalSupply ? new BigNumber(stake.tokenTotalSupply) : BIG_ZERO,
    poolWeight: stake.poolWeight ? new BigNumber(stake.poolWeight) : BIG_ZERO,
  }
}

export const usePollStakesWithUserData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {
    const pids = stakesConfig.map((stakeToFetch) => stakeToFetch.pid)

    dispatch(fetchStakesPublicDataAsync(pids))

    if (account) {
      dispatch(fetchStakeUserDataAsync({ account, pids }))
    }
  }, [dispatch, slowRefresh, account])
}

export const useStakes = () => {
  const stakes = useSelector((state) => state.stake)
  const deserializedStakesData = stakes.data.map(deserializeStake)
  const { userDataLoaded } = stakes
  return {
    userDataLoaded,
    data: deserializedStakesData,
  }
}

export const useStakeFromPid = (pid) => {
  const stake = useSelector((state) => state.stake.data.find((f) => f.pid === pid))
  return stake && deserializeStake(stake)
}

export const useStakeUser = (pid) => {
  const { userData } = useStakeFromPid(pid)
  const { allowance, tokenBalance, stakedBalance, earnings } = userData
  return {
    allowance,
    tokenBalance,
    stakedBalance,
    earnings,
  }
}