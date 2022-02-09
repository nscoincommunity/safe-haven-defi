import fetchStake from './fetchStake'

const fetchStakes = async (stakesToFetch) => {
  const data = await Promise.all(
    stakesToFetch.map(async (stakeConfig) => {
      const stake = await fetchStake(stakeConfig)
      const serializedStake = { ...stake, token: stake.token }
      return serializedStake
    }),
  )
  return data
}

export default fetchStakes
