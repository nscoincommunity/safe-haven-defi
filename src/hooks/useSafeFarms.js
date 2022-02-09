import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { useFarms } from '../store/slices/farms-slice/hooks';
import { useStakes } from '../store/slices/stake-slice/hooks'
import useRefresh from './useRefresh'

export const useTVL = () => {
  const [tvldata, setTVLData] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const { data: farmsLP } = useFarms();
  const { data: stakesLP } = useStakes();

  useEffect(() => {
    const fetchAllData = async () => {
        const farmTVL = farmsLP.map(farm => {
            return farm.liquidity ? parseFloat(farm.liquidity) : 0
        });
        const stakeTVL = stakesLP.map(stake => {
            return stake.liquidity ? parseFloat(stake.liquidity) : 0
        });
        const tvl = [...farmTVL, ...stakeTVL]
        setTVLData(tvl)
    }

    fetchAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fastRefresh])

  return tvldata
}

export const useAprs = () => {
    const [aprs, setAprs] = useState([])
    const { account } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const { data: farmsLP } = useFarms();
    const { data: stakesLP } = useStakes();
  
    useEffect(() => {
      const fetchAllData = async () => {
          const farmAprs = farmsLP.map(farm => {
              return farm.apr
          });
          const stakeAprs = stakesLP.map(stake => {
              return stake.apr
          });
          const aprs = [...farmAprs, ...stakeAprs]
          setAprs(aprs)
      }
      fetchAllData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, fastRefresh])
  
    return aprs
  }
