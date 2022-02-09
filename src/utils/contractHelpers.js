import { ethers } from 'ethers';
import { simpleRpcProvider } from './providers';
import poolsConfig from '../constants/pools'

// Addresses
import {
  getAddress,
  getHavenTokenAddress,
  getDividendDistributorAddress,
  getsltTokenAddress,
  getSafeChefAddress,
  getHavenLayerReferralAddress,
  getMulticallAddress,
  getHavenISOAdress
} from './addressHelpers';

// ABI
import havenTokenABI from '../abi/havenTokenContract.json';
import dividendDistributorABI from '../abi/dividendDistributorContract.json';
import sltTokenABI from '../abi/testLayerToken.json';
import safeChefABI from '../abi/safeChef.json';
import havenLayerReferralABI from '../abi/havenLayerReferral.json';
import isoABI from '../abi/iso.json'
import sousChefV2 from '../abi/sousChefV2.json'
import safeStakeABI from '../abi/safeStake.json'

import bep20Abi from '../abi/erc20.json';
import MultiCallAbi from '../abi/Multicall.json'

const getContract = (abi, address, signer) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getHavenTokenContract = (signer) => {
  return getContract(havenTokenABI, getHavenTokenAddress(), signer)
}
export const getDividendDistributorContract = (signer) => {
  return getContract(dividendDistributorABI, getDividendDistributorAddress(), signer)
}
export const getsltTokenContract = (signer) => {
  return getContract(sltTokenABI, getsltTokenAddress(), signer)
}
export const getSafeChefContract = (signer) => {
  return getContract(safeChefABI, getSafeChefAddress(), signer)
}
export const getHavenLayerReferralContract = (signer) => {
  return getContract(havenLayerReferralABI, getHavenLayerReferralAddress(), signer)
}

export const getBep20Contract = (address, signer) => {
  return getContract(bep20Abi, address, signer)
}

export const getMulticallContract = (signer) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}

export const getIsoContract = (signer) => {
  return getContract(isoABI, getHavenISOAdress(), signer)
}


export const getSouschefV2Contract = (id, signer) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChefV2, getAddress(config.contractAddress), signer)
}
export const getSafeStakeContract = (id, signer) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(safeStakeABI, getAddress(config.contractAddress), signer)
}