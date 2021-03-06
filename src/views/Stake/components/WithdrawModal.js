import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, Flex, Text } from '@pancakeswap/uikit'
import { ModalActions, ModalInput } from '../../../components/Modal'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import useToast from '../../../hooks/useToast'

const WithdrawModal = ({ onConfirm, onDismiss, max, tokenName = '', stakePrice, withdrawFee, lastDepositTime }) => {
  const [val, setVal] = useState(0)
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const usdToStake = valNumber.times(stakePrice)

  const handleChange = useCallback(
    (e) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={'Unstake tokens'} onDismiss={onDismiss}>
      <Flex justifyContent="space-between" mb="8px">
        <Text color="#253449">The last deposit block number:</Text>
        <Text color="#253449" bold>{lastDepositTime.toString()}</Text>
      </Flex>
      <Flex justifyContent="space-between" mb="8px">
        <Text color="#253449">Withdrawal Fee:</Text>
        <Text color="#253449" bold>{`${withdrawFee.toString()}%`}</Text>
      </Flex>
      <ModalInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        usdToStake={usdToStake}
        max={fullBalance}
        symbol={tokenName}
        inputTitle={'Unstake'}
      />
      <ModalActions>
        <Button variant="primary" onClick={onDismiss} width="100%" disabled={pendingTx}>
          Cancel
        </Button>
        <Button
          disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
          onClick={async () => {
            setPendingTx(true)
            try {
              await onConfirm(val)
              toastSuccess('Unstaked!', 'Your earnings have also been harvested to your wallet')
              onDismiss()
            } catch (e) {
              toastError(
                'Error',
                'Please try again. Confirm the transaction and make sure you are paying enough gas!',
              )
              console.error(e)
            } finally {
              setPendingTx(false)
            }
          }}
          width="100%"
        >
          {pendingTx ? 'Confirming' : 'Confirm'}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default WithdrawModal
