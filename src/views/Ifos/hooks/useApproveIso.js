import { useCallback } from 'react'
import { ethers } from 'ethers'
import { useCallWithGasPrice } from '../../../hooks/useCallWithGasPrice'
import { getHavenISOAdress } from '../../../utils/addressHelpers'

const useApproveIso = (tokenContract) => {
  const { callWithGasPrice } = useCallWithGasPrice()
  const havenISOAddress = getHavenISOAdress()
  const handleApprove = useCallback(async () => {
    try {
      const tx = await callWithGasPrice(tokenContract, 'approve', [
        havenISOAddress,
        ethers.constants.MaxUint256,
      ])
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [havenISOAddress, tokenContract, callWithGasPrice])

  return { onApprove: handleApprove }
}

export default useApproveIso