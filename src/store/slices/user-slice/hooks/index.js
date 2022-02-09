import { ChainId, Pair, Token } from '@pancakeswap/sdk'
import flatMap from 'lodash/flatMap'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from '../../../../constants';
import useActiveWeb3React from '../../../../hooks/useActiveWeb3React';
import { DEFAULT_CHAINID } from '../../../../constants/network';
import {
  addSerializedPair,
  addSerializedToken,
  FarmStakedOnly,
  StakeStakedOnly,
  muteAudio,
  removeSerializedToken,
  toggleTheme as toggleThemeAction,
  unmuteAudio,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserFarmStakedOnly,
  updateUserStakeStakedOnly,
  updateUserSingleHopOnly,
  updateUserSlippageTolerance,
  updateGasPrice,
  addWatchlistToken,
  addWatchlistPool,
  updateUserPoolStakedOnly,
  updateUserPoolsViewMode,
  updateUserFarmsViewMode,
  updateUserStakesViewMode,
  updateUserPredictionChartDisclaimerShow,
  updateUserPredictionAcceptedRisk,
  updateUserUsernameVisibility,
  updateUserExpertModeAcknowledgementShow,
} from '../actions'
import { deserializeToken, GAS_PRICE_GWEI, serializeToken } from './helpers'

export function useAudioModeManager() {
  const dispatch = useDispatch()
  const audioPlay = useSelector((state) => state.user.audioPlay)

  const toggleSetAudioMode = useCallback(() => {
    if (audioPlay) {
      dispatch(muteAudio())
    } else {
      dispatch(unmuteAudio())
    }
  }, [audioPlay, dispatch])

  return [audioPlay, toggleSetAudioMode]
}

export function useIsExpertMode() {
  return useSelector((state) => state.user.userExpertMode)
}

export function useExpertModeManager() {
  const dispatch = useDispatch()
  const expertMode = useIsExpertMode()

  const toggleSetExpertMode = useCallback(() => {
    dispatch(updateUserExpertMode({ userExpertMode: !expertMode }))
  }, [expertMode, dispatch])

  return [expertMode, toggleSetExpertMode]
}

export function useThemeManager() {
  const dispatch = useDispatch()
  const isDark = useSelector((state) => state.user.isDark)

  const toggleTheme = useCallback(() => {
    dispatch(toggleThemeAction())
  }, [dispatch])

  return [isDark, toggleTheme]
}

export function useUserSingleHopOnly() {
  const dispatch = useDispatch()

  const singleHopOnly = useSelector(
    (state) => state.user.userSingleHopOnly,
  )

  const setSingleHopOnly = useCallback(
    (newSingleHopOnly) => {
      dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }))
    },
    [dispatch],
  )

  return [singleHopOnly, setSingleHopOnly]
}

export function useUserSlippageTolerance() {
  const dispatch = useDispatch()
  const userSlippageTolerance = useSelector((state) => {
    return state.user.userSlippageTolerance
  })

  const setUserSlippageTolerance = useCallback(
    (slippage) => {
      dispatch(updateUserSlippageTolerance({ userSlippageTolerance: slippage }))
    },
    [dispatch],
  )

  return [userSlippageTolerance, setUserSlippageTolerance]
}

export function useUserFarmStakedOnly(isActive) {
  const dispatch = useDispatch()
  const userFarmStakedOnly = useSelector((state) => {
    return state.user.userFarmStakedOnly
  })

  const setUserFarmStakedOnly = useCallback(
    (stakedOnly) => {
      const farmStakedOnly = stakedOnly ? FarmStakedOnly.TRUE : FarmStakedOnly.FALSE
      dispatch(updateUserFarmStakedOnly({ userFarmStakedOnly: farmStakedOnly }))
    },
    [dispatch],
  )

  return [
    userFarmStakedOnly === FarmStakedOnly.ON_FINISHED ? !isActive : userFarmStakedOnly === FarmStakedOnly.TRUE,
    setUserFarmStakedOnly,
  ]
}

export function useUserPoolStakedOnly() {
  const dispatch = useDispatch()
  const userPoolStakedOnly = useSelector((state) => {
    return state.user.userPoolStakedOnly
  })

  const setUserPoolStakedOnly = useCallback(
    (stakedOnly) => {
      dispatch(updateUserPoolStakedOnly({ userPoolStakedOnly: stakedOnly }))
    },
    [dispatch],
  )

  return [userPoolStakedOnly, setUserPoolStakedOnly]
}

export function useUserStakeStakedOnly(isActive) {
  const dispatch = useDispatch()
  const userStakeStakedOnly = useSelector((state) => {
    return state.user.userStakeStakedOnly
  })

  const setUserStakeStakedOnly = useCallback(
    (stakedOnly) => {
      const stakeStakedOnly = stakedOnly ? StakeStakedOnly.TRUE : StakeStakedOnly.FALSE
      dispatch(updateUserStakeStakedOnly({ userStakeStakedOnly: stakeStakedOnly }))
    },
    [dispatch],
  )

  return [
    userStakeStakedOnly === StakeStakedOnly.ON_FINISHED ? !isActive : userStakeStakedOnly === StakeStakedOnly.TRUE,
    setUserStakeStakedOnly,
  ]
}

export function useUserPoolsViewMode() {
  const dispatch = useDispatch()
  const userPoolsViewMode = useSelector((state) => {
    return state.user.userPoolsViewMode
  })

  const setUserPoolsViewMode = useCallback(
    (viewMode) => {
      dispatch(updateUserPoolsViewMode({ userPoolsViewMode: viewMode }))
    },
    [dispatch],
  )

  return [userPoolsViewMode, setUserPoolsViewMode]
}

export function useUserFarmsViewMode() {
  const dispatch = useDispatch()
  const userFarmsViewMode = useSelector((state) => {
    return state.user.userFarmsViewMode
  })

  const setUserFarmsViewMode = useCallback(
    (viewMode) => {
      dispatch(updateUserFarmsViewMode({ userFarmsViewMode: viewMode }))
    },
    [dispatch],
  )

  return [userFarmsViewMode, setUserFarmsViewMode]
}

export function useUserStakesViewMode() {
  const dispatch = useDispatch()
  const userStakesViewMode = useSelector((state) => {
    return state.user.userStakesViewMode
  })

  const setUserStakesViewMode = useCallback(
    (viewMode) => {
      dispatch(updateUserStakesViewMode({ userStakesViewMode: viewMode }))
    },
    [dispatch],
  )

  return [userStakesViewMode, setUserStakesViewMode]
}

export function useUserPredictionAcceptedRisk() {
  const dispatch = useDispatch()
  const userPredictionAcceptedRisk = useSelector((state) => {
    return state.user.userPredictionAcceptedRisk
  })

  const setUserPredictionAcceptedRisk = useCallback(
    (acceptedRisk) => {
      dispatch(updateUserPredictionAcceptedRisk({ userAcceptedRisk: acceptedRisk }))
    },
    [dispatch],
  )

  return [userPredictionAcceptedRisk, setUserPredictionAcceptedRisk]
}

export function useUserPredictionChartDisclaimerShow() {
  const dispatch = useDispatch()
  const userPredictionChartDisclaimerShow = useSelector((state) => {
    return state.user.userPredictionChartDisclaimerShow
  })

  const setPredictionUserChartDisclaimerShow = useCallback(
    (showDisclaimer) => {
      dispatch(updateUserPredictionChartDisclaimerShow({ userShowDisclaimer: showDisclaimer }))
    },
    [dispatch],
  )

  return [userPredictionChartDisclaimerShow, setPredictionUserChartDisclaimerShow]
}

export function useUserExpertModeAcknowledgementShow() {
  const dispatch = useDispatch()
  const userExpertModeAcknowledgementShow = useSelector((state) => {
    return state.user.userExpertModeAcknowledgementShow
  })

  const setUserExpertModeAcknowledgementShow = useCallback(
    (showAcknowledgement) => {
      dispatch(updateUserExpertModeAcknowledgementShow({ userExpertModeAcknowledgementShow: showAcknowledgement }))
    },
    [dispatch],
  )

  return [userExpertModeAcknowledgementShow, setUserExpertModeAcknowledgementShow]
}

export function useUserUsernameVisibility() {
  const dispatch = useDispatch()
  const userUsernameVisibility = useSelector((state) => {
    return state.user.userUsernameVisibility
  })

  const setUserUsernameVisibility = useCallback(
    (usernameVisibility) => {
      dispatch(updateUserUsernameVisibility({ userUsernameVisibility: usernameVisibility }))
    },
    [dispatch],
  )

  return [userUsernameVisibility, setUserUsernameVisibility]
}

export function useUserTransactionTTL() {
  const dispatch = useDispatch()
  const userDeadline = useSelector((state) => {
    return state.user.userDeadline
  })

  const setUserDeadline = useCallback(
    (deadline) => {
      dispatch(updateUserDeadline({ userDeadline: deadline }))
    },
    [dispatch],
  )

  return [userDeadline, setUserDeadline]
}

export function useAddUserToken() {
  const dispatch = useDispatch()
  return useCallback(
    (token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
    },
    [dispatch],
  )
}

export function useRemoveUserAddedToken(chainId, address) {
  const dispatch = useDispatch()
  return useCallback(
    (chainId, address) => {
      dispatch(removeSerializedToken({ chainId, address }))
    },
    [dispatch],
  )
}

export function useGasPrice() {
  const chainId = DEFAULT_CHAINID
  const userGas = useSelector((state) => state.user.gasPrice)
  return chainId === ChainId.MAINNET ? userGas : GAS_PRICE_GWEI.testnet
}

export function useGasPriceManager() {
  const dispatch = useDispatch()
  const userGasPrice = useGasPrice()

  const setGasPrice = useCallback(
    (gasPrice) => {
      dispatch(updateGasPrice({ gasPrice }))
    },
    [dispatch],
  )

  return [userGasPrice, setGasPrice]
}

function serializePair(pair) {
  return {
    token0: serializeToken(pair.token0),
    token1: serializeToken(pair.token1),
  }
}

export function usePairAdder(pair) {
  const dispatch = useDispatch()

  return useCallback(
    (pair) => {
      dispatch(addSerializedPair({ serializedPair: serializePair(pair) }))
    },
    [dispatch],
  )
}

export function toV2LiquidityToken([tokenA, tokenB]) {
  return new Token(tokenA.chainId, Pair.getAddress(tokenA, tokenB), 18, 'Haven-LP', 'Pancake LPs')
}

/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export function useTrackedTokenPairs() {
  const { chainId } = useActiveWeb3React()
  // const tokens = useAllTokens()
  const tokens = [];

  // pinned pairs
  const pinnedPairs = useMemo(() => (chainId ? PINNED_PAIRS[chainId] ?? [] : []), [chainId])

  // pairs for every token against every base
  const generatedPairs = useMemo(
    () =>
      chainId
        ? flatMap(Object.keys(tokens), (tokenAddress) => {
            const token = tokens[tokenAddress]
            // for each token on the current chain,
            return (
              // loop though all bases on the current chain
              (BASES_TO_TRACK_LIQUIDITY_FOR[chainId] ?? [])
                // to construct pairs of the given token with each base
                .map((base) => {
                  if (base.address === token.address) {
                    return null
                  }
                  return [base, token]
                })
                .filter((p) => p !== null)
            )
          })
        : [],
    [tokens, chainId],
  )

  // pairs saved by users
  const savedSerializedPairs = useSelector(({ user: { pairs } }) => pairs)

  const userPairs = useMemo(() => {
    if (!chainId || !savedSerializedPairs) return []
    const forChain = savedSerializedPairs[chainId]
    if (!forChain) return []

    return Object.keys(forChain).map((pairId) => {
      return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)]
    })
  }, [savedSerializedPairs, chainId])

  const combinedList = useMemo(
    () => userPairs.concat(generatedPairs).concat(pinnedPairs),
    [generatedPairs, pinnedPairs, userPairs],
  )

  return useMemo(() => {
    // dedupes pairs of tokens in the combined list
    const keyed = combinedList.reduce((memo, [tokenA, tokenB]) => {
      const sorted = tokenA.sortsBefore(tokenB)
      const key = sorted ? `${tokenA.address}:${tokenB.address}` : `${tokenB.address}:${tokenA.address}`
      if (memo[key]) return memo
      memo[key] = sorted ? [tokenA, tokenB] : [tokenB, tokenA]
      return memo
    }, {})

    return Object.keys(keyed).map((key) => keyed[key])
  }, [combinedList])
}

export const useWatchlistTokens = () => {
  const dispatch = useDispatch()
  const savedTokens = useSelector((state) => state.user.watchlistTokens) ?? []
  const updatedSavedTokens = useCallback(
    (address) => {
      dispatch(addWatchlistToken({ address }))
    },
    [dispatch],
  )
  return [savedTokens, updatedSavedTokens]
}

export const useWatchlistPools = () => {
  const dispatch = useDispatch()
  const savedPools = useSelector((state) => state.user.watchlistPools) ?? []
  const updateSavedPools = useCallback(
    (address) => {
      dispatch(addWatchlistPool({ address }))
    },
    [dispatch],
  )
  return [savedPools, updateSavedPools]
}
