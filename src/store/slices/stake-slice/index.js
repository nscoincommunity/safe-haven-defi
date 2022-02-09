import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js';
import stakesConfig from '../../../constants/stake';
import fetchStakes from './fetchStakes'
import {
  fetchStakeUserEarnings,
  fetchStakeUserAllowances,
  fetchStakeUserTokenBalances,
  fetchStakeUserStakedBalances,
  fetchStakeUserLastDepositTime,
  fetchStakeWithdrawFee
} from './fetchStakeUser'
import fetchFarmsPrices from '../farms-slice/fetchFarmsPrices'
import { BIG_ZERO } from '../../../utils/bigNumber'
import { getPoolApr } from '../../../utils/apr';

const noAccountStakeConfig = stakesConfig.map((stake) => ({
  ...stake,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    earnings: '0',
  },
}))

const initialState = {
  data: noAccountStakeConfig,
  userDataLoaded: false,
}

export const fetchStakesPublicDataAsync = createAsyncThunk(
  'stakes/fetchStakesPublicDataAsync',
  async (pids) => {
    const stakesToFetch = stakesConfig.filter((stakeConfig) => pids.includes(stakeConfig.pid))

    const stakes = await fetchStakes(stakesToFetch)
    const stakesWithPrices = await fetchFarmsPrices(stakes)

    const stakesWithoutHelperLps = stakesWithPrices.filter((stake) => {
      return stake.pid || stake.pid === 0
    })
    const tvlStakes = stakesWithoutHelperLps.filter(stake => stake.pid === 5)
    const tvlPriceBusd = tvlStakes[0].tokenPriceBusd
    const stakesWithApr = stakesWithoutHelperLps.map((stake) => {
      const totalLiquidity = new BigNumber(stake.stakeTokenRatio).times(stake.tokenPriceBusd) || BIG_ZERO
      const apr = getPoolApr(
        stake.tokenPriceBusd,
        new BigNumber(tvlPriceBusd),
        stake.stakeTokenRatio,
        new BigNumber(stake.earningsPerBlock),
      )
      return { ...stake, liquidity: totalLiquidity, apr }
    })
    return stakesWithApr
  },
)

export const fetchStakeUserDataAsync = createAsyncThunk(
  'stakes/fetchStakeUserDataAsync',
  async ({ account, pids }) => {
    const stakesToFetch = stakesConfig.filter((stakeConfig) => pids.includes(stakeConfig.pid))
    const userStakeAllowances = await fetchStakeUserAllowances(account, stakesToFetch)
    const userStakeTokenBalances = await fetchStakeUserTokenBalances(account, stakesToFetch)
    const userStakedBalances = await fetchStakeUserStakedBalances(account, stakesToFetch)
    const userStakeEarnings = await fetchStakeUserEarnings(account, stakesToFetch)
    const userFarmWithdrawFee = await fetchStakeWithdrawFee(account, stakesToFetch)
    const lastDepositTime = await fetchStakeUserLastDepositTime(account, stakesToFetch)

    return userStakeAllowances.map((stakeAllowance, index) => {
      return {
        pid: stakesToFetch[index].pid,
        allowance: userStakeAllowances[index],
        tokenBalance: userStakeTokenBalances[index],
        stakedBalance: userStakedBalances[index],
        earnings: userStakeEarnings[index],
        withdrawFee: userFarmWithdrawFee[index] / 100,
        lastDepositTime: lastDepositTime[index]
      }
    })
  },
)

export const stakesSlice = createSlice({
  name: 'Stakes',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStakesPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((stake) => {
        const liveStakeData = action.payload.find((stakeData) => stakeData.pid === stake.pid)
        return { ...stake, ...liveStakeData }
      })
    })

    builder.addCase(fetchStakeUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl
        const index = state.data.findIndex((stake) => stake.pid === pid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    })
  },
})

export default stakesSlice.reducer
