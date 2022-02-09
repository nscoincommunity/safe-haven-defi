import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import isosConfig from '../../../constants/iso'
import fetchIsos from './fetchIsos'
import { fetchIsoUserReferralsCount, fetchIsoUserInfo, fetchUserHavenAmount } from './fetchIsoUser'
import { BIG_ZERO } from '../../../utils/bigNumber'

const noAccountIsoConfig = isosConfig.map((iso) => ({
  ...iso,
  userData: {
    referralsCount: '0',
    amount: BIG_ZERO,
    claimed: false,
    userhavenAmount: undefined
  },
}))

const initialState = {
  data: noAccountIsoConfig,
  userDataLoaded: false,
}

// Async thunks
export const fetchIsosPublicDataAsync = createAsyncThunk(
  'isos/fetchIsosPublicDataAsync',
  async (pids) => {
    const isosToFetch = isosConfig.filter((isoConfig) => pids.includes(isoConfig.pid))
    const isos = await fetchIsos(isosToFetch)
    return isos
  },
)

export const fetchIsoUserDataAsync = createAsyncThunk(
  'iso/fetchIsoUserDataAsync',
  async ({ account, pids }) => {
    const isosToFetch = isosConfig.filter((isoConfig) => pids.includes(isoConfig.pid))
    const userIsoReferralsCount = await fetchIsoUserReferralsCount(account)
    const userIsoInfo = await fetchIsoUserInfo(account, pids)
    const userhavenAmount = await fetchUserHavenAmount(account)
    return isosToFetch.map((isoConfig, index) => {
      return {
        pid: isosToFetch[index].pid,
        referralsCount: userIsoReferralsCount,
        userhavenAmount: userhavenAmount,
        amount: userIsoInfo.userAmounts[index],
        claimed: userIsoInfo.userClaimed[index]
      }
    })
  },
)

export const isosSlice = createSlice({
  name: 'ISO',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchIsosPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((iso) => {
        const liveIsoData = action.payload.find((isoData) => isoData.pid === iso.pid)
        return { ...iso, ...liveIsoData }
      })
    })

    builder.addCase(fetchIsoUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl
        const index = state.data.findIndex((iso) => iso.pid === pid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    })
  },
})

export default isosSlice.reducer
