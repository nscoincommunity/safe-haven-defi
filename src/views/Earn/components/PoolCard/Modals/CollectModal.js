import React, { useState } from 'react'
import {
  Modal,
  Text,
  Button,
  Heading,
  Flex,
  AutoRenewIcon,
} from '@pancakeswap/uikit'
import useTheme from '../../../../../hooks/useTheme'
import useToast from '../../../../../hooks/useToast'
import { formatNumber } from '../../../../../utils/formatBalance'
import useHarvestPool from '../../../hooks/useHarvestPool'

const CollectModal= ({
  formattedBalance,
  earningsDollarValue,
  earningToken,
  sousId,
  onDismiss,
}) => {
  const { theme } = useTheme()
  const { toastSuccess, toastError } = useToast()
  const { onReward } = useHarvestPool(sousId)
  const [pendingTx, setPendingTx] = useState(false)

  const handleHarvestConfirm = async () => {
    setPendingTx(true)
    try {
      await onReward()
      toastSuccess(
        `Harvested!`,
        `Your ${earningToken.symbol} earnings have been sent to your wallet!`
      )
      setPendingTx(false)
      onDismiss()
    } catch (e) {
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!')
      console.error(e)
      setPendingTx(false)
    }
  }

  return (
    <Modal
      title={`${earningToken.symbol} 'Harvest'}`}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <Flex justifyContent="space-between" alignItems="center" mb="24px">
        <Text color="#253449">'Harvesting:</Text>
        <Flex flexDirection="column">
          <Heading color="#253449">
            {formattedBalance} {earningToken.symbol}
          </Heading>
          {earningsDollarValue > 0 && (
            <Text fontSize="12px" color="#253449cc">{`~${formatNumber(earningsDollarValue)} USD`}</Text>
          )}
        </Flex>
      </Flex>

      <Button
        mt="8px"
        onClick={handleHarvestConfirm}
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
      >
        {pendingTx ? 'Confirming' : 'Confirm'}
      </Button>
      <Button variant="text" onClick={onDismiss} pb="0px">
        Close Window
      </Button>
    </Modal>
  )
}

export default CollectModal
