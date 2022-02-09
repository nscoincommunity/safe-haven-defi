import { useCallback } from 'react'
import { harvestFarm } from '../../../utils/calls'
import { useSafeChef } from '../../../hooks/useContract'

const useHarvestFarm = (farmPid) => {
  const safeChefContract = useSafeChef()

  const handleHarvest = useCallback(async () => {
    await harvestFarm(safeChefContract, farmPid)
  }, [farmPid, safeChefContract])

  return { onReward: handleHarvest }
}

export default useHarvestFarm
