import { serializeTokens } from './tokens'
const serializedTokens = serializeTokens()

const ifos = [
  {
    pid: 0,
    tokenLabel: 'BUSD',
    token: serializedTokens.busd,
    isActive: true,
  },

  {
    pid: 1,
    tokenLabel: 'BNB',
    token: serializedTokens.wbnb,
    isActive: true,
  },

  {
    pid: 2,
    tokenLabel: 'ETH',
    token: serializedTokens.eth,
    isActive: true,
  },

  {
    pid: 3,
    tokenLabel: 'HAVEN',
    token: serializedTokens.haven,
    isActive: true,
  },
]

export default ifos
