import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { updateUserBalance, updateUserPendingReward } from '../../../store/slices/pools-slice'
import getGasPrice from '../../../utils/getGasPrice'
import { useSafeChef, useSafeStake } from '../../../hooks/useContract'

const harvestPool = async (safeStakeContract) => {
  const gasPrice = getGasPrice()
  const tx = await safeStakeContract.deposit('0', { gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

const useHarvestPool = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const safeStakeContract = useSafeStake(sousId)
  const safeChefContract = useSafeChef()

  const handleHarvest = useCallback(async () => {
    await harvestPool(safeStakeContract)
    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, dispatch, safeChefContract, safeStakeContract, sousId])

  return { onReward: handleHarvest }
}

export default useHarvestPool
