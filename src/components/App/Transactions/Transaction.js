import styled from 'styled-components'
import { CheckmarkIcon, CloseIcon, LinkExternal } from '@pancakeswap/uikit'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { getBscScanLink } from '../../../utils'
import CircleLoader from '../../Loader/CircleLoader'

const TransactionState = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  border-radius: 0.5rem;
  padding: 0.25rem 0rem;
  font-weight: 500;
  font-size: 0.825rem;
  color: #1FC7D4;
`

const IconWrapper = styled.div`
  color: ${({ pending, success, theme }) =>
    pending ? '#1FC7D4' : success ? '#31D0AA' : '#ED4B9E'};
`

export default function Transaction({ tx }) {
  const { chainId } = useActiveWeb3React()

  const summary = tx?.summary
  const pending = !tx?.receipt
  const success = !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined')

  if (!chainId) return null

  return (
    <TransactionState pending={pending} success={success}>
      <LinkExternal href={getBscScanLink(tx.hash, 'transaction', chainId)}>{summary ?? tx.hash}</LinkExternal>
      <IconWrapper pending={pending} success={success}>
        {pending ? <CircleLoader /> : success ? <CheckmarkIcon color="#31D0AA" /> : <CloseIcon color="#ED4B9E" />}
      </IconWrapper>
    </TransactionState>
  )
}
