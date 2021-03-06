import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import multicall from '../utils/multicall'
import { getSafeChefAddress } from '../utils/addressHelpers'
import safeChefABI from '../abi/safeChef.json'
import { useWeb3React } from '@web3-react/core';
import { useFarms } from '../store/slices/farms-slice/hooks';
import { useStakes } from '../store/slices/stake-slice/hooks'
import useRefresh from './useRefresh'

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState([])
  const { account } = useWeb3React()
  const { data: farmsLP } = useFarms();
  const { data: stakesLP } = useStakes();
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const farmsCalls = farmsLP.map((farm) => ({
        address: getSafeChefAddress(),
        name: 'pendingEarnings',
        params: [farm.pid, account],
      }))

      const farmsRawResults = await multicall(safeChefABI, farmsCalls)
      const farmsResults = farmsLP.map((farm, index) => ({ ...farm, balance: new BigNumber(farmsRawResults[index]) }))

      const stakesCalls = stakesLP.map((stake) => ({
        address: getSafeChefAddress(),
        name: 'pendingEarnings',
        params: [stake.pid, account],
      }))

      const stakesrawResults = await multicall(safeChefABI, stakesCalls)
      const stakesResults = stakesLP.map((stake, index) => ({ ...stake, balance: new BigNumber(stakesrawResults[index]) }))

      setFarmsWithBalances([...farmsResults, ...stakesResults])
    }

    if (account) {
      fetchBalances()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fastRefresh])

  return farmsWithBalances
}

export default useFarmsWithBalance
