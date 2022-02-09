import fetchIso from './fetchIso'

const fetchIsos = async (isoToFetch) => {
  const data = await Promise.all(
    isoToFetch.map(async (isoConfig) => {
      const iso = await fetchIso(isoConfig)
      const serializedIso = { ...iso }
      return serializedIso
    }),
  )
  return data
}

export default fetchIsos
