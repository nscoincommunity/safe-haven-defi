import { ChainId, Percent, JSBI } from '@pancakeswap/sdk';
import { mainnetTokens, testnetTokens } from './tokens';
import { BIG_TEN } from '../utils/bigNumber';

export const ROUTER_ADDRESS = '0x10ED43C718714eb63d5aA57B78B54704E256024E'

export const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: 'https://bscscan.com',
  [ChainId.TESTNET]: 'https://testnet.bscscan.com',
}

export const BASES_TO_TRACK_LIQUIDITY_FOR = {
    [ChainId.MAINNET]: [mainnetTokens.wbnb, mainnetTokens.dai, mainnetTokens.busd, mainnetTokens.usdt],
    [ChainId.TESTNET]: [testnetTokens.wbnb, testnetTokens.cake, testnetTokens.busd],
}

export const PINNED_PAIRS = {
  [ChainId.MAINNET]: [
    [mainnetTokens.cake, mainnetTokens.wbnb],
    [mainnetTokens.busd, mainnetTokens.usdt],
    [mainnetTokens.dai, mainnetTokens.usdt],
  ],
}

export const BASE_URL = 'https://localhost:3000'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET]
export const BSC_BLOCK_TIME = 3;
export const HAVEN_PER_BLOCK = 40;
export const BLOCKS_PER_YEAR = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365; // 10512000
export const HAVEN_PER_YEAR = HAVEN_PER_BLOCK * BLOCKS_PER_YEAR;

export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18);

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)

export const ALLOWED_PRICE_IMPACT_LOW = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
export const BLOCKED_PRICE_IMPACT_NON_EXPERT = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

export const SUGGESTED_BASES = {
  [ChainId.MAINNET]: [mainnetTokens.busd, mainnetTokens.cake, mainnetTokens.btcb],
  [ChainId.TESTNET]: [testnetTokens.wbnb, testnetTokens.cake, testnetTokens.busd],
}

export const INITIAL_ALLOWED_SLIPPAGE = 50

export const ADDITIONAL_BASES = {
  [ChainId.MAINNET]: {},
}
export const CUSTOM_BASES = {
  [ChainId.MAINNET]: {},
}
export const BASES_TO_CHECK_TRADES_AGAINST = {
  [ChainId.MAINNET]: [
    mainnetTokens.wbnb,
    mainnetTokens.cake,
    mainnetTokens.busd,
    mainnetTokens.usdt,
    mainnetTokens.btcb,
    mainnetTokens.ust,
    mainnetTokens.eth,
    mainnetTokens.usdc,
  ],
  [ChainId.TESTNET]: [testnetTokens.wbnb, testnetTokens.cake, testnetTokens.busd],
}

export const MIN_BNB = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 BNB

export const IPFS_GATEWAY = 'https://ipfs.io/ipfs'

// SDN OFAC addresses
export const BLOCKED_ADDRESSES = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C',
]