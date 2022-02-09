import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR } from '../constants';

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new haven allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  stakingTokenPrice,
  rewardTokenPrice,
  totalStaked,
  tokenPerBlock,
) => {
  let totalAmount = totalStaked;
  if (parseFloat(totalStaked) < 0.00001) {
    totalAmount = 1 / Math.pow(10, 36);
  }
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(new BigNumber(BLOCKS_PER_YEAR))
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(new BigNumber(totalAmount))
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? 0 : apr.toNumber()
}



/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param sltPriceUsd SLT price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 *@param tokenPerBlock Amount of new haven allocated to the pool for each new block
 * @returns Farm Apr
 */
 export const getFarmApr = (
  poolWeight,
  sltPriceUsd,
  poolLiquidityUsd,
  tokenPerBlock,
) => {
  let totalAmount = poolLiquidityUsd;
  if (parseFloat(poolLiquidityUsd) < 0.00001) {
    totalAmount = 1 / Math.pow(10, 36);
  }
  const yearlySltRewardAllocation = (new BigNumber(poolWeight)).times(BLOCKS_PER_YEAR).times(tokenPerBlock)
  const apr = yearlySltRewardAllocation.times(sltPriceUsd).div(totalAmount).times(100)
  return apr.isNaN() || !apr.isFinite() ? 0 : apr.toNumber()
}
