import { useCallback } from 'react'
import { useIso } from '../../../hooks/useContract'
import { safePad } from '../../../utils/calls'

const useHarvestIso = (pid) => {
  const isoContract = useIso()

  const handleHarvest = useCallback(
    async () => {
      const txHash = await safePad(isoContract, pid, "0")
      console.info(txHash)
    },
    [isoContract, pid],
  )

  return { onHarvest: handleHarvest }
}

export default useHarvestIso