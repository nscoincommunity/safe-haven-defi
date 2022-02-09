import { serializeTokens } from './tokens'

const serializedTokens = serializeTokens()

const farms = [
  {
    pid: 0,
    lpSymbol: 'HAVEN-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x63373252f5090B3CEE061348D627A17cf6Ab360F',
    },
    token: serializedTokens.haven,
    quoteToken: serializedTokens.wbnb,
    strat: "0x807780650A1a2FA266f180c99AD0D98C6deA1977",
    isStatus: 'active'
  },
  {
    pid: 1,
    lpSymbol: 'HAVEN-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x8b113Aa30a284995cEb9470FB04b8581025D56cc',
    },
    token: serializedTokens.haven,     // 0x9caE753B661142aE766374CEFA5dC800d80446aC
    quoteToken: serializedTokens.busd,    // 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
    strat: "0xd8e7679f660276d5dc746856681C24664d81A26e",
    isStatus: 'active'
  },
  {
    pid: 2,
    lpSymbol: 'SLT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x869F4e106c8f2b9062F93Db214FE23Fb073873e1',
    },
    token: serializedTokens.slt,
    quoteToken: serializedTokens.wbnb,
    strat: "0x18b7F3cd2951E84C34aA8E685d76Fa7a741a26a5",
    isStatus: 'active'
  },
  {
    pid: 3,
    lpSymbol: 'SLT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xB14F95f53AC80E068F0F4A4A4A59c6538AeF4398',
    },
    token: serializedTokens.slt,
    quoteToken: serializedTokens.busd,
    strat: "0xB701E8cb48aB85d86b003bEE6fA59c276085F90D",
    isStatus: 'active'
  },
  {
    pid: 4,
    lpSymbol: 'SLT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xB14F95f53AC80E068F0F4A4A4A59c6538AeF4398',
    },
    token: serializedTokens.slt,
    quoteToken: serializedTokens.busd,
    strat: "0xBE06cf6aE61b25B581d9CaDC81D61CBfFA0826A6",
    isStatus: 'inactive'
  },
  {
    pid: 8,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
    strat: "0x5c040B417b4e0444D7fE5e61568b8efDF4D03fA2",
    isStatus: 'inactive'
  },
  // {
  //   pid: 9,
  //   lpSymbol: 'BUSD-USDT LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',   // 1.66
  //   },
  //   token: serializedTokens.busd,    // 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
  //   quoteToken: serializedTokens.usdt,    // 0x55d398326f99059fF775485246999027B3197955
  //   strat: "0xeDe908f7B1B3D182e38c18eC7e2AA3EB209521f7",
  //   isStatus: 'inactive'
  // },
  {
    pid: 10,
    lpSymbol: 'BUSD-USDT LP',
    lpAddresses: {
      97: '',
      56: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.usdt,
    strat: "0xeDe908f7B1B3D182e38c18eC7e2AA3EB209521f7",
    isStatus: 'inactive'
  },
  {
    pid: 11,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
    strat: "0xa8CD3a2Bf2d1192255007673bA21cA3B5f63a4f1",
    isStatus: 'inactive'
  },
  {
    pid: 12,
    lpSymbol: 'USDT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.wbnb,
    strat: "0x94cdF186A495930984685ae9E3522FAfCB3AaC3d",
    isStatus: 'inactive'
  },
  {
    pid: 13,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
    strat: "0x65f898330417fdEa7274Fc2eB9E974dEA9422174",
    isStatus: 'inactive'
  },
  {
    pid: 14,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.busd,
    strat: "0x2183bf639A35AE1b575Fa2a7B3d5f2A695A0132B",
    isStatus: 'inactive'
  },
  {
    pid: 15,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
    strat: "0x471b75288f0b829765aE3F84e50e363D67248685",
    isStatus: 'inactive'
  },
  {
    pid: 16,
    lpSymbol: 'USDT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.wbnb,
    strat: "0x5BCb1Ef1FfE64fc9262395Bf80A6BB3Ea5aCac78",
    isStatus: 'inactive'
  },
  {
    pid: 17,
    lpSymbol: 'MBOX-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x8FA59693458289914dB0097F5F366d771B7a7C3F',
    },
    token: serializedTokens.mbox,
    quoteToken: serializedTokens.wbnb,
    strat: "0xf11d9DB860Da38c441BDf6862Ef7239FdFdc8ad4",
    isStatus: 'inactive'
  },
  {
    pid: 18,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.busd,
    strat: "0x5857cf9dEBc0b4dc08eE522Ba1cB9A2C7fE0fD3f",
    isStatus: 'inactive'
  },
  {
    pid: 19,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc',
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.wbnb,
    strat: "0x05b4Ff1c270B9B8171382dBca64d7cFc86Fa230c",
    isStatus: 'inactive'
  },
  {
    pid: 20,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082',
    },
    token: serializedTokens.btcb,
    quoteToken: serializedTokens.wbnb,
    strat: "0xeEA631F4Fc1E181f4A749f4f16cF1ed7F8952935",
    isStatus: 'inactive'
  },
  {
    pid: 21,
    lpSymbol: 'BTCB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xf45cd219aef8618a92baa7ad848364a158a24f33',
    },
    token: serializedTokens.btcb,
    quoteToken: serializedTokens.busd,
    strat: "0xAe5d01ff505041df762484b20A8E8658786826Af",
    isStatus: 'inactive'
  },
  {
    pid: 22,
    lpSymbol: 'BTCB-ETH LP',
    lpAddresses: {
      97: '',
      56: '0xD171B26E4484402de70e3Ea256bE5A2630d7e88D',
    },
    token: serializedTokens.btcb,
    quoteToken: serializedTokens.eth,
    strat: "0x378f340F19c6c846c2F4deae8CF188952E5301E0",
    isStatus: 'inactive'
  },
  {
    pid: 23,
    lpSymbol: 'TUSD-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x2e28b9b74d6d99d4697e913b82b41ef1cac51c6c',
    },
    token: serializedTokens.tusd,
    quoteToken: serializedTokens.busd,
    strat: "0x0C50e96C906157cc648798A8787ADEe1c1459954",
    isStatus: 'inactive'
  },
  {
    pid: 24,
    lpSymbol: 'USDC-USDT LP',
    lpAddresses: {
      97: '',
      56: '0xec6557348085aa57c72514d67070dc863c0a5a8c',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.usdt,
    strat: "0xd7b77F7a0b65147EE231b210e4Bfcd9D56415df5",
    isStatus: 'inactive'
  },
  {
    pid: 25,
    lpSymbol: 'ETH-USDC LP',
    lpAddresses: {
      97: '',
      56: '0xEa26B78255Df2bBC31C1eBf60010D78670185bD0',
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.usdc,
    strat: "0xedbcE22E8001D8A80760DCfb0Bc611eC4af2175F",
    isStatus: 'inactive'
  },
  {
    pid: 26,
    lpSymbol: 'CAKE-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x804678fa97d91B974ec2af3c843270886528a9E6',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.busd,
    strat: "0xB9A50F4671acc859F8F90E7B06bCbe7B4F3A294F",
    isStatus: 'inactive'
  },
  {
    pid: 27,
    lpSymbol: 'DOT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF',
    },
    token: serializedTokens.dot,
    quoteToken: serializedTokens.wbnb,
    strat: "0x0EE28088ae72E56f5C7EE83a86D0815eDb83f10d",
    isStatus: 'inactive'
  },
  {
    pid: 33,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.busd,
    strat: "0x02aE953ad2b5F502DF1b6D349c805A042E311d01",
    isStatus: 'active'
  },
  {
    pid: 34,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.busd,
    strat: "0x41854F532Dc7dE90f37731f7c0f64967F7c32DAB",
    isStatus: 'active'
  },
  {
    pid: 35,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
    strat: "0x0823CA1BFE0359520285464EAB0D8580feA66D3F",
    isStatus: 'active'
  },
  {
    pid: 36,
    lpSymbol: 'USDT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.wbnb,
    strat: "0x6Ef5aB18FCaA7F9a7419991d238a0E0b8823a570",
    isStatus: 'active'
  },
  // {
  //   pid: 37,
  //   lpSymbol: 'USDT-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
  //   },
  //   token: serializedTokens.usdt,
  //   quoteToken: serializedTokens.wbnb,
  //   strat: "0x6Ef5aB18FCaA7F9a7419991d238a0E0b8823a570",
  //   isStatus: 'inactive'
  // },
  {
    pid: 38,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc',
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.wbnb,
    strat: "0x91CB1d8203B313AA9b54dCd4E518B6cE6156b4d2",
    isStatus: 'active'
  },
  {
    pid: 39,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.busd,
    strat: "0x970A7eF9FCEf18778F2d68BF104C44520D295D62",
    isStatus: 'active'
  }
]

export default farms
