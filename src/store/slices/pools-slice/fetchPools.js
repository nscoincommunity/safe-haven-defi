import BigNumber from 'bignumber.js'
import poolsConfig from '../../../constants/pools'
import safeStakeABI from '../../../abi/safeStake.json'
import sltABI from '../../../abi/slt.json'
import multicall from '../../../utils/multicall'
import { getAddress } from '../../../utils/addressHelpers'
import { BIG_TEN, BIG_ZERO } from '../../../utils/bigNumber'
import { getSouschefV2Contract } from '../../../utils/contractHelpers'

export const fetchPoolsBlockLimits = async () => {
  const callsStartBlock = poolsConfig.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsConfig.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'bonusEndBlock',
    }
  })
  const callsRewardTokenPerBlock = poolsConfig.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'rewardPerBlock',
    }
  })

  const callsDepositFee = poolsConfig.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'depositFeeAmount',
    }
  })
  const starts = await multicall(safeStakeABI, callsStartBlock)
  const ends = await multicall(safeStakeABI, callsEndBlock)
  const rewardTokenPerBlock = await multicall(safeStakeABI, callsRewardTokenPerBlock)
  const depositFee = await multicall(safeStakeABI, callsDepositFee)

  return poolsConfig.map((sltPoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: sltPoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
      rewardTokenPerBlock: (new BigNumber(rewardTokenPerBlock)).div(BIG_TEN.pow(18)).toJSON(),
      depositFee: (new BigNumber(depositFee)).div(100).toJSON()
    }
  })
}

export const fetchPoolsTotalStaking = async () => {
  const callsPools = poolsConfig.map((poolConfig) => {
    return {
      address: poolConfig.stakingToken.address,
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })
  const PoolsTotalStaked = await multicall(sltABI, callsPools)
  return [
    ...poolsConfig.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(PoolsTotalStaked[index]).toJSON(),
    }))
  ]
}

export const fetchPoolStakingLimit = async (sousId) => {
  try {
    const sousContract = getSouschefV2Contract(sousId)
    const stakingLimit = await sousContract.poolLimitPerUser()
    return new BigNumber(stakingLimit.toString())
  } catch (error) {
    return BIG_ZERO
  }
}

export const fetchPoolsStakingLimits = async (
  poolsWithStakingLimit,
) => {
  const validPools = poolsConfig
    .filter((p) => !p.isFinished)
    .filter((p) => !poolsWithStakingLimit.includes(p.sousId))

  // Get the staking limit for each valid pool
  // Note: We cannot batch the calls via multicall because V1 pools do not have "poolLimitPerUser" and will throw an error
  const stakingLimitPromises = validPools.map((validPool) => fetchPoolStakingLimit(validPool.sousId))
  const stakingLimits = await Promise.all(stakingLimitPromises)

  return stakingLimits.reduce((accum, stakingLimit, index) => {
    return {
      ...accum,
      [validPools[index].sousId]: stakingLimit,
    }
  }, {})
}
