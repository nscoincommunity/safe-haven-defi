import { useMemo } from 'react'
import { ChainId, WETH } from '@pancakeswap/sdk'
import useActiveWeb3React from './useActiveWeb3React'
import {
  getBep20Contract,
  getSafeChefContract,
  getIsoContract,
  getSafeStakeContract,
} from '../utils/contractHelpers'
import { getMulticallAddress } from '../utils/addressHelpers'

import { ERC20_BYTES32_ABI } from '../abi/erc20'
import multiCallAbi from '../abi/Multicall.json'
import ENS_PUBLIC_RESOLVER_ABI from '../abi/ens-public-resolver.json'
import ERC20_ABI from '../abi/erc20.json'
import ENS_ABI from '../abi/ens-registrar.json'
import WETH_ABI from '../abi/weth.json'
import { getContract } from '../utils'

export const useSafeChef = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getSafeChefContract(library.getSigner()), [library])
}

export const useERC20 = (address) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address, library.getSigner()), [address, library])
}

export const useIso = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getIsoContract(library.getSigner()), [library])
}

function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useMulticallContract() {
  return useContract(getMulticallAddress(), multiCallAbi, false)
}

export function useBytes32TokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useENSRegistrarContract(withSignerIfPossible) {
  const { chainId } = useActiveWeb3React()
  let address
  if (chainId) {
    // eslint-disable-next-line default-case
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.TESTNET:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address, withSignerIfPossible) {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useTokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible) {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export const useSafeStake = (id) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getSafeStakeContract(id, library.getSigner()), [id, library])
}