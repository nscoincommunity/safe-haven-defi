import fetchPublicIsoData from './fetchPublicIsoData'

const fetchIso = async (iso) => {
  const isoPublicData = await fetchPublicIsoData(iso)
  return { ...iso, ...isoPublicData }
}

export default fetchIso
