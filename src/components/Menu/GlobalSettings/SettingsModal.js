import { useState } from 'react'
import styled from 'styled-components'
import { Text, PancakeToggle, Toggle, Flex, Modal } from '@pancakeswap/uikit'
import {
  useAudioModeManager,
  useExpertModeManager,
  useUserExpertModeAcknowledgementShow,
  useUserSingleHopOnly,
} from '../../../store/slices/user-slice/hooks'
import { useSwapActionHandlers } from '../../../store/slices/swap-slice/hooks'
import QuestionHelper from '../../QuestionHelper'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'
import GasSettings from './GasSettings'

// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
const PancakeToggleWrapper = styled.div`
  .pancakes {
    position: absolute;
  }
`

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`

const SettingsModal = ({ onDismiss }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [showExpertModeAcknowledgement, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  const [audioPlay, toggleSetAudioMode] = useAudioModeManager()
  const { onChangeRecipient } = useSwapActionHandlers()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
      />
    )
  }

  const handleExpertModeToggle = () => {
    if (expertMode) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else if (!showExpertModeAcknowledgement) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else {
      setShowConfirmExpertModal(true)
    }
  }

  return (
    <Modal
      title={'Settings'}
      headerBackground="gradients.cardHeader"
      onDismiss={onDismiss}
      style={{ maxWidth: '420px' }}
    >
      <ScrollableContainer>
        <Flex pb="24px" flexDirection="column">
          <Text bold textTransform="uppercase" fontSize="12px" color="#253449" mb="24px">
            Global
          </Text>
          <GasSettings />
        </Flex>
        <Flex pt="24px" flexDirection="column" borderTop={`1px #E7E3EB solid`}>
          <Text bold textTransform="uppercase" fontSize="12px" color="#253449" mb="24px">
            Swaps & Liquidity
          </Text>
          <TransactionSettings />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb="24px">
          <Flex alignItems="center">
            <Text color="#253449">Expert Mode</Text>
            <QuestionHelper
              text={'Bypasses confirmation modals and allows high slippage trades. Use at your own risk.'}
              placement="top-start"
              ml="4px"
            />
          </Flex>
          <Toggle id="toggle-expert-mode-button" scale="md" checked={expertMode} onChange={handleExpertModeToggle} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb="24px">
          <Flex alignItems="center">
            <Text color="#253449">Disable Multihops</Text>
            <QuestionHelper text={'Restricts swaps to direct pairs only.'} placement="top-start" ml="4px" />
          </Flex>
          <Toggle
            id="toggle-disable-multihop-button"
            checked={singleHopOnly}
            scale="md"
            onChange={() => {
              setSingleHopOnly(!singleHopOnly)
            }}
          />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Text color="#253449">Flippy sounds</Text>
            <QuestionHelper
              text={'Fun sounds to make a truly immersive pancake-flipping trading experience'}
              placement="top-start"
              ml="4px"
            />
          </Flex>
          <PancakeToggleWrapper>
            <PancakeToggle checked={audioPlay} onChange={toggleSetAudioMode} scale="md" />
          </PancakeToggleWrapper>
        </Flex>
      </ScrollableContainer>
    </Modal>
  )
}

export default SettingsModal
