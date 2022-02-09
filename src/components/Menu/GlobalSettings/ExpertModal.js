import { useState } from 'react'
import { Button, Text, Flex, Message, Modal, Checkbox } from '@pancakeswap/uikit'
import { useExpertModeManager } from '../../../store/slices/user-slice/hooks'

const ExpertModal = ({ setShowConfirmExpertModal, setShowExpertModeAcknowledgement }) => {
  const [, toggleExpertMode] = useExpertModeManager()
  const [isRememberChecked, setIsRememberChecked] = useState(false)

  return (
    <Modal
      title={'Expert Mode'}
      onBack={() => setShowConfirmExpertModal(false)}
      onDismiss={() => setShowConfirmExpertModal(false)}
      headerBackground="gradients.cardHeader"
      style={{ maxWidth: '360px' }}
    >
      <Message variant="warning" mb="24px">
        <Text color="#253449">
            Expert mode turns off the 'Confirm' transaction prompt, and allows high slippage trades that often result in bad rates and lost funds.
        </Text>
      </Message>
      <Text mb="24px" color="#253449">'Only use this mode if you know what you’re doing.</Text>
      <Flex alignItems="center" mb="24px">
        <Checkbox
          name="confirmed"
          type="checkbox"
          checked={isRememberChecked}
          onChange={() => setIsRememberChecked(!isRememberChecked)}
          scale="sm"
        />
        <Text ml="10px" color="#253449" style={{ userSelect: 'none' }}>
          Don't show this again
        </Text>
      </Flex>
      <Button
        mb="8px"
        id="confirm-expert-mode"
        onClick={() => {
          // eslint-disable-next-line no-alert
          if (window.prompt(`Please type the word "confirm" to enable expert mode.`) === 'confirm') {
            toggleExpertMode()
            setShowConfirmExpertModal(false)
            if (isRememberChecked) {
              setShowExpertModeAcknowledgement(false)
            }
          }
        }}
      >
        Turn On Expert Mode
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          setShowConfirmExpertModal(false)
        }}
      >
        Cancel
      </Button>
    </Modal>
  )
}

export default ExpertModal
