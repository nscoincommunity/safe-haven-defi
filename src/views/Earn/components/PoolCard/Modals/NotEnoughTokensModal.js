import React from 'react'
import styled from 'styled-components'
import { Modal, Text, Button, OpenNewIcon, Link } from '@pancakeswap/uikit'
import useTheme from '../../../../../hooks/useTheme'

const StyledLink = styled(Link)`
  width: 100%;
`

const NotEnoughTokensModal = ({ tokenSymbol, onDismiss }) => {
  const { theme } = useTheme()

  return (
    <Modal
      title={`${tokenSymbol} required`}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <Text color="#ED4B9E" bold>
        {`Insufficient ${tokenSymbol} balance`}
      </Text>
      <Text color="#253449" mt="24px">{`You’ll need ${tokenSymbol} to stake in this pool!`}</Text>
      <Text>
        {`Buy some ${tokenSymbol}, or make sure your %symbol% isn’t in another pool or LP.`}
      </Text>
      <Button variant="primary" mt="24px" as="a" external href="https://pancakeswap.finance/swap">
        Buy {tokenSymbol}
      </Button>
      <StyledLink href="https://yieldwatch.net" external>
        <Button variant="primary" mt="8px" width="100%">
          Locate Assets
          <OpenNewIcon color="primary" ml="4px" />
        </Button>
      </StyledLink>
      <Button variant="text" onClick={onDismiss}>
        Close Window
      </Button>
    </Modal>
  )
}

export default NotEnoughTokensModal
