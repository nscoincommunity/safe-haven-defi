import poolsConfig from '../../../constants/pools'
import safeStakeABI from '../../../abi/safeStake.json'
import erc20ABI from '../../../abi/erc20.json'
import multicall from '../../../utils/multicall'
import { getSafeChefContract } from '../../../utils/contractHelpers'
import { getAddress } from '../../../utils/addressHelpers'
import BigNumber from 'bignumber.js'

// Pool 0, Slt / Slt is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const safeChefContract =   getSafeChefContract()

export const fetchPoolsAllowance = async (account) => {
  const calls = poolsConfig.map((pool) => ({
    address: pool.stakingToken.address,
    name: 'allowance',
    params: [account, getAddress(pool.contractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return poolsConfig.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  const calls = poolsConfig.map((pool) => ({
    address: pool.stakingToken.address,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = poolsConfig.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  return { ...tokenBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = poolsConfig.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(safeStakeABI, calls)
  const stakedBalances = poolsConfig.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  // Slt / Slt pool
  const { amount: masterPoolAmount } = await safeChefContract.userInfo('0', account)

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount.toString()).toJSON() }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = poolsConfig.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(safeStakeABI, calls)
  const pendingRewards = poolsConfig.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Slt / Slt pool
  // const pendingReward = await safeChefContract.pendingCake('0', account)
  const pendingReward = []

  return { ...pendingRewards, 0: new BigNumber(pendingReward.toString()).toJSON() }
}


export const fetchUserWithdrawFee = async (account) => {
  const calls = poolsConfig.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'getWithdrawalFeeBP',
    params: [account],
  }))
  const withdrawFeeBP = await multicall(safeStakeABI, calls)
  const withdrawFees = poolsConfig.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(withdrawFeeBP[index]).div(100).toJSON(),
    }),
    {},
  )

  // Slt / Slt pool
  const withdrawFee = []

  return { ...withdrawFees, 0: new BigNumber(withdrawFee.toString()).toJSON() }
}
