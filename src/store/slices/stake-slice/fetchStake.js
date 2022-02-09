import fetchPublicStakeData from './fetchPublicStakeData'

const fetchStake = async (stake) => {
  const stakePublicData = await fetchPublicStakeData(stake)
  return { ...stake, ...stakePublicData }
}

export default fetchStake
