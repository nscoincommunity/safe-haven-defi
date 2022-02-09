import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import useActiveWeb3React from '../../../../hooks/useActiveWeb3React';
import { deserializeToken } from './helpers'

export default function useUserAddedTokens() {
  const { chainId } = useActiveWeb3React()
  const serializedTokensMap = useSelector(({ user: { tokens } }) => tokens)

  return useMemo(() => {
    if (!chainId) return []
    return Object.values(serializedTokensMap?.[chainId] ?? {}).map(deserializeToken)
  }, [serializedTokensMap, chainId])
}
