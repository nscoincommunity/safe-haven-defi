import React, { useState } from 'react'
import { Button, Heading, Skeleton, Text } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { BIG_ZERO } from '../../../../../utils/bigNumber'
import { getBalanceAmount } from '../../../../../utils/formatBalance'
import Balance from '../../../../../components/Balance'
import { useDispatch } from 'react-redux'
import { fetchStakeUserDataAsync } from '../../../../../store/slices/stake-slice'
import useToast from '../../../../../hooks/useToast'
import useHarvestStake from '../../../hooks/useHarvestStake'

import { ActionContainer, ActionTitles, ActionContent } from './styles'

const HarvestAction = ({ pid, userData, userDataReady }) => {
  const { toastSuccess, toastError } = useToast()
  const earningsBigNumber = new BigNumber(userData.earnings)
  let earnings = BIG_ZERO
  let earningsBusd = 0
  const sltPrice = new BigNumber(useSelector(state => state.app.priceOfOneSLT))
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    earningsBusd = earnings.multipliedBy(sltPrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestStake(pid)
  const dispatch = useDispatch()
  const { account } = useWeb3React()

  return (
    <ActionContainer>
      <ActionTitles>
        <Text bold textTransform="uppercase" color="#253449" fontSize="12px" pr="4px">
          SLT
        </Text>
        <Text bold textTransform="uppercase" color="#253449" fontSize="12px">
          Earned
        </Text>
      </ActionTitles>
      <ActionContent>
        <div>
          <Heading color="#253449">{displayBalance}</Heading>
          {earningsBusd > 0 && (
            <Balance fontSize="12px" color="#253449" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
          )}
        </div>
        <Button
          disabled={earnings.eq(0) || pendingTx || !userDataReady}
          onClick={async () => {
            setPendingTx(true)
            try {
              await onReward()
              toastSuccess(
                `Harvested!`,
                `Your SLT earnings have been sent to your wallet!`
              )
            } catch (e) {
              toastError(
                'Error',
                'Please try again. Confirm the transaction and make sure you are paying enough gas!'
              )
              console.error(e)
            } finally {
              setPendingTx(false)
            }
            dispatch(fetchStakeUserDataAsync({ account, pids: [pid] }))
          }}
          ml="4px"
        >
          Harvest
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
