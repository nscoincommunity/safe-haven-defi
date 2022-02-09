import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { getHavenISOAdress } from '../../../utils/addressHelpers';

// Retrieve ISO allowance
const useAllowanceIso = (tokenContract, dependency) => {
  const { account } = useWeb3React()
  const [allowance, setAllowance] = useState(null)
  const havenISOAddress = getHavenISOAdress()

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.allowance(account, havenISOAddress)
        setAllowance(new BigNumber(res._hex))
      } catch (e) {
        setAllowance(null)
      }
    }
    fetch()
  }, [account, havenISOAddress, tokenContract, dependency])

  return allowance
}

export default useAllowanceIso