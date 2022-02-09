import { ChainId } from '@pancakeswap/sdk'
import addresses from '../constants/contracts';
import { DEFAULT_CHAINID } from '../constants/network';

export const getAddress = (address) => {
  const chainId = DEFAULT_CHAINID
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getHavenTokenAddress = () => {
  return getAddress(addresses.havenToken);
}
export const getDividendDistributorAddress = () => {
  return getAddress(addresses.dividendDistributor);
}
export const getsltTokenAddress = () => {
  return getAddress(addresses.sltToken);
}
export const getSafeChefAddress = () => {
  return getAddress(addresses.safeChef);
}
export const getHavenISOAdress = () => {
  return getAddress(addresses.havenISO)
}
export const getHavenLayerReferralAddress = () => {
  return getAddress(addresses.havenLayerReferral)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}