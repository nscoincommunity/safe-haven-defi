import { useCallback } from 'react'
import { useIso } from '../../../hooks/useContract'
import { safePad } from '../../../utils/calls'

const useDepositIso = (pid) => {
  const isoContract = useIso()
  const handleDeposit = useCallback(
    async (amount) => {
      const txHash = await safePad(isoContract, pid, amount)
      console.info(txHash)
    },
    [isoContract, pid],
  )

  return { onDeposit: handleDeposit }
}

export default useDepositIso