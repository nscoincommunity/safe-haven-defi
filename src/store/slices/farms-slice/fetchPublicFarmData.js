import BigNumber from 'bignumber.js';
import safechefABI from '../../../abi/safeChef.json';
import erc20 from '../../../abi/erc20.json';
import strategyChefABI from '../../../abi/strategyChef.json';
import lpABI from '../../../abi/lp.json';
import { getAddress, getSafeChefAddress } from '../../../utils/addressHelpers';
import { BIG_TEN, BIG_ZERO } from '../../../utils/bigNumber';
import multicall from '../../../utils/multicall';

const fetchFarm = async (farm) => {
  const { pid, lpAddresses, token, quoteToken } = farm
  const lpAddress = getAddress(lpAddresses)
  const calls = [
    // Balance of token in the LP contract
    {
      address: token.address,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: quoteToken.address,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Token decimals
    {
      address: token.address,
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: quoteToken.address,
      name: 'decimals',
    },
  ]
  const [tokenBalanceLP, quoteTokenBalanceLP, tokenDecimals, quoteTokenDecimals] =
    await multicall(erc20, calls)
  const [wantAddress, ratio] =
    pid || pid === 0 
      ? await multicall(strategyChefABI, [
        {
          address: farm.strat,
          name: 'wantAddress',
        },
        {
          address: farm.strat,
          name: 'wantLockedTotal',
        }
      ]) : [null, null]
  const [totalSupply] =
    pid || pid === 0 
      ? await multicall(lpABI, [
        {
          address: wantAddress[0],
          name: 'totalSupply',
        }
      ]) : [null]

  let totalLPsupply = new BigNumber(totalSupply).div(BIG_TEN.pow(18))
  let ratioNumber = parseFloat(ratio)
  let lpTokenRatio = new BigNumber(ratio).div(BIG_TEN.pow(18))
  if (ratioNumber < 1) {
    lpTokenRatio = new BigNumber(1).div(BIG_TEN.pow(18))
  }
    
  // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
  
  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

  // Amount of quoteToken in the LP that are staked in the MC
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

  // Total staked in LP, in quote token value
  const lpTotalInQuoteToken = quoteTokenAmountMc.div(totalLPsupply).times(new BigNumber(2))
  // Only make safechef calls if farm has pid
  const masterChefABI = safechefABI;
  const [info, totalAllocPoint, earningsPerBlock] =
    pid || pid === 0
      ? await multicall(masterChefABI, [
          {
            address: getSafeChefAddress(),
            name: 'poolInfo',
            params: [pid],
          },
          {
            address: getSafeChefAddress(),
            name: 'totalAllocPoint',
          },
          {
            address: getSafeChefAddress(),
            name: 'EarningsPerBlock',
          },
        ])
      : [null, null, null]
      
  const allocPoint = info ? new BigNumber(info.allocPoint._hex) : BIG_ZERO
  const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO
  const lastRewardBlock = info ? new BigNumber(info.lastRewardBlock._hex) : BIG_ZERO
  const accEarningsPerShare = info ? new BigNumber(info.accEarningsPerShare._hex) : BIG_ZERO
  // const stratAddress = info ? info.strat : ''
  const depositFeeBP = info ? info.depositFeeBP : 0
  const isWithdrawFee = info ? info.isWithdrawFee : 0
  const isCommunity = false

  return {
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
    lpTotalSupply: new BigNumber(totalLPsupply).toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    poolWeight: poolWeight.toJSON(),
    multiplier: `${allocPoint.div(100).toString()}X`,
    totalAllocPoint,
    earningsPerBlock: (new BigNumber(earningsPerBlock)).div(BIG_TEN.pow(18)),
    lpTokenRatio,
    lastRewardBlock,
    accEarningsPerShare,
    depositFeeBP,
    isWithdrawFee,
    isCommunity,
    quoteTokenAmountMc
  }
}

export default fetchFarm
