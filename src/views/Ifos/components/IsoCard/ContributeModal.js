import React, { useState } from 'react'
import { Modal, Button, Flex, LinkExternal, useModal, Text } from '@pancakeswap/uikit'
import BalanceInput from '../../../../components/Input/BalanceInput'
import useTokenBalance from '../../../../hooks/useTokenBalance'
import { getFullDisplayBalance } from '../../../../utils/formatBalance'
import useDepositIso from '../../hooks/useDepositIso'

const ContributeModal = ({ pid, tokenLabel, tokenAddress, userhavenAmount, tokenDecimals, onDismiss }) => {
  const [value, setValue] = useState('0')
  const [pendingTx, setPendingTx] = useState(false)
  const balance = getFullDisplayBalance(useTokenBalance(tokenAddress).balance, tokenDecimals)
  const { onDeposit } = useDepositIso(pid)

  const [onConfirmModal] = useModal(
    <Modal>
      <Text color="#253449">Buy 1,000 Haven to participate in this ISO pool</Text>
    </Modal>
)

  const handleDeposit = async () => {
    try {
      setPendingTx(true)
      if (!userhavenAmount || userhavenAmount.toNumber() < 1000) {
        onConfirmModal()
        return;
      }
      await onDeposit(value)
      setPendingTx(false)
      onDismiss()
    } catch (e) {
      setPendingTx(false)
      console.error(e)
      onDismiss()
    }
  }

  const getTokenLink = tokenAddress ? `https://pancakeswap.finance/swap?outputCurrency=${tokenAddress}` : 'https://pancakeswap.finance/swap'
  return (
    <Modal title={`Contribute ${tokenLabel}`} onDismiss={onDismiss}>
      <BalanceInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        symbol={tokenLabel}
        max={balance}
        onSelectMax={() => setValue(balance.toString())}
      />
      <Flex justifyContent="space-between" mb="24px">
        <Button width="100%" variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button
          width="100%"
          disabled={pendingTx}
          onClick={handleDeposit}
        >
          Confirm
        </Button>
      </Flex>
      <LinkExternal
        href={getTokenLink}
        style={{ margin: 'auto' }}
      >
        {`Get ${tokenLabel}`}
      </LinkExternal>
    </Modal>
  )
}

export default ContributeModal
