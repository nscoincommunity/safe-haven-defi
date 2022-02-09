import { serializeTokens } from './tokens'

const serializedTokens = serializeTokens()

const farms = [
  {
    pid: 5,
    stakeSymbol: 'SLT',
    lpAddresses: {
      97: '',
      56: '0x869F4e106c8f2b9062F93Db214FE23Fb073873e1',    
    },
    token: serializedTokens.slt, 
    quoteToken: serializedTokens.wbnb,
    strat: "0x8741032865eB50e894Bc68331831e7e0220d5B9F",
    isStatus: 'active'
  },
  {
    pid: 6,
    stakeSymbol: 'BNB',
    lpAddresses: {
      97: '',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.wbnb,
    strat: "0x5A191385e8a9C437E5b04eFf07cf9259102Bab65",
    isStatus: 'active'
  },
  {
    pid: 7,
    stakeSymbol: 'ETH',
    lpAddresses: {
      97: '',
      56: '0x70D8929d04b60Af4fb9B58713eBcf18765aDE422',
    },
    token: serializedTokens.eth,    
    quoteToken: serializedTokens.wbnb,
    strat: "0x32a8953Aa0822D22bbBd6a8F2F9374750601ca5b",
    isStatus: 'active'
  },
  {
    pid: 8,
    stakeSymbol: 'BUSD-BNB',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: serializedTokens.busd,    
    quoteToken: serializedTokens.wbnb,
    strat: "0x5c040B417b4e0444D7fE5e61568b8efDF4D03fA2",
    isStatus: 'inactive'
  },
  {
    pid: 28,
    stakeSymbol: 'HAVEN',
    lpAddresses: {
      97: '',
      56: '0x63373252f5090B3CEE061348D627A17cf6Ab360F',
    },
    token: serializedTokens.haven,    
    quoteToken: serializedTokens.wbnb,
    strat: "0x7ba58e11671D01e18B4E511c827d94C2fc0bf06e",
    isStatus: 'active'
  },
  {
    pid: 29,
    stakeSymbol: 'CAKE',
    lpAddresses: {
      97: '',
      56: '0xFB7E9FE9D13561AdA7131Fa746942a14F7dd4Cf6',
    },
    token: serializedTokens.cake,    
    quoteToken: serializedTokens.wbnb,
    strat: "0x0Be018d4a3653869bB6AD67118C9C9Bf656cA9B0",
    isStatus: 'active'
  },
  {
    pid: 30,
    stakeSymbol: 'BTCB',
    lpAddresses: {
      97: '',
      56: '0x356b7d0d3c54F22C82B7a670C6Ba9E2381b0624c',
    },
    token: serializedTokens.btcb,    
    quoteToken: serializedTokens.wbnb,
    strat: "0x92dfb8d6D8c0413CA31488984969D87D83fe6fE2",
    isStatus: 'active'
  },
  {
    pid: 31,
    stakeSymbol: 'BUSD',
    lpAddresses: {
      97: '',
      56: '0x9bdEdb0c876fC0Da79D945DF28942b898Af89Fc7',
    },
    token: serializedTokens.busd,    
    quoteToken: serializedTokens.wbnb,
    strat: "0xe96cd73154cb9996cEEA03BC783FBDA028Cbdc46",
    isStatus: 'active'
  },
  // {
  //   pid: 32,
  //   stakeSymbol: 'USDC',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x30479874f9320a62bce3bc0e315c920e1d73e278',
  //   },
  //   token: serializedTokens.usdc,
  //   quoteToken: serializedTokens.wbnb,
  //   strat: "0xd07942AB32f8493fb6fca353bf1CA66078B32aEd",
  //   isStatus: 'active'
  // },
]

export default farms
