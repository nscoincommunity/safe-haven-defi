import { useMemo, useCallback } from 'react'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import { Modal, ModalBody, Text, Button, Flex } from '@pancakeswap/uikit'
import ConnectWalletButton from '../../../components/ConnectWalletButton'
import { isTransactionRecent, useAllTransactions } from '../../../store/slices/transactions-slice/hooks'
import { clearAllTransactions } from '../../../store/slices/transactions-slice/actions'
import { AutoRow } from '../../Layout/Row'
import Transaction from './Transaction'

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a, b) {
  return b.addedTime - a.addedTime
}

function renderTransactions(transactions) {
  return (
    <Flex flexDirection="column">
      {transactions.map((tx) => {
        return <Transaction key={tx.hash + tx.addedTime} tx={tx} />
      })}
    </Flex>
  )
}

const TransactionsModal = ({ onDismiss }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useDispatch()
  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt)

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  return (
    <Modal title={'Recent Transactions'} headerBackground="gradients.cardHeader" onDismiss={onDismiss}>
      {account && (
        <ModalBody>
          {!!pending.length || !!confirmed.length ? (
            <>
              <AutoRow mb="1rem" style={{ justifyContent: 'space-between' }}>
                <Text color="#253449">Recent Transactions</Text>
                <Button variant="tertiary" scale="xs" onClick={clearAllTransactionsCallback}>
                  clear all
                </Button>
              </AutoRow>
              {renderTransactions(pending)}
              {renderTransactions(confirmed)}
            </>
          ) : (
            <Text color="#253449">No recent transactions</Text>
          )}
        </ModalBody>
      )}
      {!account && <ConnectWalletButton />}
    </Modal>
  )
}

export default TransactionsModal
