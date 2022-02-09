import { serializeTokens } from './tokens'

const serializedTokens = serializeTokens()

const pools = [
  {
    sousId: 1,
    stakingToken: serializedTokens.haven,
    earningToken: serializedTokens.busd,
    contractAddress: {
      97: '',
      56: '0x636b816CffFd88096a02660f17F2e0ee48024861',
    },
    harvest: true,
    sortOrder: 999,
    tokenPerBlock: '236022650499999',
    isFinished: false,
  }
]

export default pools
