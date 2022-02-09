import { createReducer } from '@reduxjs/toolkit'
import { updateVersion } from '../../global/actions';
import {
  addSerializedPair,
  addSerializedToken,
  addWatchlistPool,
  addWatchlistToken,
  FarmStakedOnly,
  StakeStakedOnly,
  removeSerializedPair,
  removeSerializedToken,
  muteAudio,
  toggleTheme,
  unmuteAudio,
  updateGasPrice,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserFarmStakedOnly,
  updateUserFarmsViewMode,
  updateUserPoolStakedOnly,
  updateUserPoolsViewMode,
  updateUserStakeStakedOnly,
  updateUserStakesViewMode,
  updateUserSingleHopOnly,
  updateUserSlippageTolerance,
  ViewMode,
  updateUserPredictionAcceptedRisk,
  updateUserPredictionChartDisclaimerShow,
  updateUserUsernameVisibility,
  updateUserExpertModeAcknowledgementShow,
} from './actions'
import { GAS_PRICE_GWEI } from './hooks/helpers'

const DEFAULT_DEADLINE_FROM_NOW = 60 * 20;
const INITIAL_ALLOWED_SLIPPAGE = 50;

const currentTimestamp = () => new Date().getTime()

function pairKey(token0Address, token1Address) {
  return `${token0Address};${token1Address}`
}

export const initialState = {
  userExpertMode: false,
  userSingleHopOnly: false,
  userSlippageTolerance: INITIAL_ALLOWED_SLIPPAGE,
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  tokens: {},
  pairs: {},
  timestamp: currentTimestamp(),
  audioPlay: true,
  isDark: false,
  userFarmStakedOnly: FarmStakedOnly.ON_FINISHED,
  userPoolStakedOnly: false,
  userStakeStakedOnly: StakeStakedOnly.ON_FINISHED,
  userPoolsViewMode: ViewMode.CARD,
  userFarmsViewMode: ViewMode.CARD,
  userStakesViewMode: ViewMode.CARD,
  userPredictionAcceptedRisk: false,
  userPredictionChartDisclaimerShow: true,
  userExpertModeAcknowledgementShow: true,
  userUsernameVisibility: false,
  gasPrice: GAS_PRICE_GWEI.default,
  watchlistTokens: [],
  watchlistPools: [],
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateVersion, (state) => {
      if (typeof state.userSlippageTolerance !== 'number') {
        state.userSlippageTolerance = INITIAL_ALLOWED_SLIPPAGE
      }

      if (typeof state.userDeadline !== 'number') {
        state.userDeadline = DEFAULT_DEADLINE_FROM_NOW
      }

      state.lastUpdateVersionTimestamp = currentTimestamp()
    })
    .addCase(updateUserExpertMode, (state, action) => {
      state.userExpertMode = action.payload.userExpertMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserSlippageTolerance, (state, action) => {
      state.userSlippageTolerance = action.payload.userSlippageTolerance
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserDeadline, (state, action) => {
      state.userDeadline = action.payload.userDeadline
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserSingleHopOnly, (state, action) => {
      state.userSingleHopOnly = action.payload.userSingleHopOnly
    })
    .addCase(addSerializedToken, (state, { payload: { serializedToken } }) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {}
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken
      state.timestamp = currentTimestamp()
    })
    .addCase(removeSerializedToken, (state, { payload: { address, chainId } }) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[chainId] = state.tokens[chainId] || {}
      delete state.tokens[chainId][address]
      state.timestamp = currentTimestamp()
    })
    .addCase(addSerializedPair, (state, { payload: { serializedPair } }) => {
      if (
        serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address
      ) {
        const { chainId } = serializedPair.token0
        state.pairs[chainId] = state.pairs[chainId] || {}
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair
      }
      state.timestamp = currentTimestamp()
    })
    .addCase(removeSerializedPair, (state, { payload: { chainId, tokenAAddress, tokenBAddress } }) => {
      if (state.pairs[chainId]) {
        delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)]
        delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)]
      }
      state.timestamp = currentTimestamp()
    })
    .addCase(muteAudio, (state) => {
      state.audioPlay = false
    })
    .addCase(unmuteAudio, (state) => {
      state.audioPlay = true
    })
    .addCase(toggleTheme, (state) => {
      state.isDark = !state.isDark
    })
    .addCase(updateUserFarmStakedOnly, (state, { payload: { userFarmStakedOnly } }) => {
      state.userFarmStakedOnly = userFarmStakedOnly
    })
    .addCase(updateUserPoolStakedOnly, (state, { payload: { userPoolStakedOnly } }) => {
      state.userPoolStakedOnly = userPoolStakedOnly
    })
    .addCase(updateUserPoolsViewMode, (state, { payload: { userPoolsViewMode } }) => {
      state.userPoolsViewMode = userPoolsViewMode
    })
    .addCase(updateUserFarmsViewMode, (state, { payload: { userFarmsViewMode } }) => {
      state.userFarmsViewMode = userFarmsViewMode
    })
    .addCase(updateUserStakeStakedOnly, (state, { payload: { userStakeStakedOnly } }) => {
      state.userStakeStakedOnly = userStakeStakedOnly
    })
    .addCase(updateUserStakesViewMode, (state, { payload: { userStakesViewMode } }) => {
      state.userStakesViewMode = userStakesViewMode
    })
    .addCase(updateUserPredictionAcceptedRisk, (state, { payload: { userAcceptedRisk } }) => {
      state.userPredictionAcceptedRisk = userAcceptedRisk
    })
    .addCase(updateUserPredictionChartDisclaimerShow, (state, { payload: { userShowDisclaimer } }) => {
      state.userPredictionChartDisclaimerShow = userShowDisclaimer
    })
    .addCase(updateUserExpertModeAcknowledgementShow, (state, { payload: { userExpertModeAcknowledgementShow } }) => {
      state.userExpertModeAcknowledgementShow = userExpertModeAcknowledgementShow
    })
    .addCase(updateUserUsernameVisibility, (state, { payload: { userUsernameVisibility } }) => {
      state.userUsernameVisibility = userUsernameVisibility
    })
    .addCase(updateGasPrice, (state, action) => {
      state.gasPrice = action.payload.gasPrice
    })
    .addCase(addWatchlistToken, (state, { payload: { address } }) => {
      const tokenWatchlist = state.watchlistTokens ?? []
      if (!tokenWatchlist.includes(address)) {
        state.watchlistTokens = [...tokenWatchlist, address]
      } else {
        const newTokens = state.watchlistTokens.filter((x) => x !== address)
        state.watchlistTokens = newTokens
      }
    })
    .addCase(addWatchlistPool, (state, { payload: { address } }) => {
      const poolsWatchlist = state.watchlistPools ?? []
      if (!poolsWatchlist.includes(address)) {
        state.watchlistPools = [...poolsWatchlist, address]
      } else {
        const newPools = state.watchlistPools.filter((x) => x !== address)
        state.watchlistPools = newPools
      }
    }),
)
