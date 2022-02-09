import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from '../../constants';
import getGasPrice from '../getGasPrice';

export const stakeFarm = async (safeChefContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  const tx = await safeChefContract.deposit(pid, value, "0x0000000000000000000000000000000000000000", { gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (safeChefContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  const tx = await safeChefContract.withdraw(pid, value, { gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (safeChefContract, pid) => {
  const gasPrice = getGasPrice()

  const tx = await safeChefContract.deposit(pid, '0', "0x0000000000000000000000000000000000000000", { gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const safePad = async (isoContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  const tx = await isoContract.depositPool(pid, value, "0x0000000000000000000000000000000000000000", { gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}