import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import isosConfig from '../../../constants/iso';
import useRefresh from '../../../hooks/useRefresh';
import { fetchIsosPublicDataAsync, fetchIsoUserDataAsync } from '.'

export const usePollIsosWithUserData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {
    const pids = isosConfig.map((isoToFetch) => isoToFetch.pid)

    dispatch(fetchIsosPublicDataAsync(pids))

    if (account) {
      dispatch(fetchIsoUserDataAsync({ account, pids }))
    }
  }, [dispatch, slowRefresh, account])
}

export const useIsos = () => {
  const isos = useSelector((state) => state.iso)
  const { userDataLoaded } = isos
  return {
    userDataLoaded,
    data: isos.data,
  }
}

export const useIsoFromPid = (pid) => {
  const iso = useSelector((state) => state.iso.data.find((f) => f.pid === pid))
  return iso
}

export const useIsoUser = (pid) => {
  const { userData } = useIsoFromPid(pid)
  const { referralsCount } = userData
  return {
    referralsCount
  }
}