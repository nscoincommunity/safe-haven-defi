import { createAction } from '@reduxjs/toolkit'

export const FarmStakedOnly = {
  ON_FINISHED: 'onFinished',
  TRUE: 'true',
  FALSE: 'false',
}

export const StakeStakedOnly = {
  ON_FINISHED: 'onFinished',
  TRUE: 'true',
  FALSE: 'false',
}

export const ViewMode = {
  TABLE: 'TABLE',
  CARD: 'CARD',
}

export const updateUserExpertMode = createAction('user/updateUserExpertMode')
export const updateUserSingleHopOnly = createAction('user/updateUserSingleHopOnly')
export const updateUserSlippageTolerance = createAction(
  'user/updateUserSlippageTolerance',
)
export const updateUserDeadline = createAction('user/updateUserDeadline')
export const addSerializedToken = createAction('user/addSerializedToken')
export const removeSerializedToken = createAction('user/removeSerializedToken')
export const addSerializedPair = createAction('user/addSerializedPair')
export const removeSerializedPair = createAction('user/removeSerializedPair')

export const muteAudio = createAction('user/muteAudio')
export const unmuteAudio = createAction('user/unmuteAudio')
export const toggleTheme = createAction('user/toggleTheme')
export const updateUserFarmStakedOnly = createAction(
  'user/updateUserFarmStakedOnly',
)

export const updateUserStakeStakedOnly = createAction('user/updateUserStakeStakedOnly')
export const updateUserPoolStakedOnly = createAction('user/updateUserPoolStakedOnly')
export const updateUserPoolsViewMode = createAction('user/updateUserPoolsViewMode')
export const updateUserFarmsViewMode = createAction('user/updateUserFarmsViewMode')
export const updateUserStakesViewMode = createAction('user/updateUserStakesViewMode')
export const updateUserPredictionAcceptedRisk = createAction(
  'user/updateUserPredictionAcceptedRisk',
)
export const updateUserPredictionChartDisclaimerShow = createAction(
  'user/updateUserPredictionChartDisclaimerShow',
)
export const updateUserExpertModeAcknowledgementShow = createAction(
  'user/updateUserExpertModeAcknowledgementShow',
)
export const updateUserUsernameVisibility = createAction(
  'user/updateUserUsernameVisibility',
)
export const updateGasPrice = createAction('user/updateGasPrice')

export const addWatchlistToken = createAction('user/addWatchlistToken')
export const addWatchlistPool = createAction('user/addWatchlistPool')
