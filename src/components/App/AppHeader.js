import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot } from '@pancakeswap/uikit'
import { Link } from 'react-router-dom'
import { useExpertModeManager } from '../../store/slices/user-slice/hooks'
import GlobalSettings from '../Menu/GlobalSettings'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
  border-bottom: 1px solid #E7E3EB;
`

const AppHeader = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  const [expertMode] = useExpertModeManager()

  return (
    <AppHeaderContainer>
      <Flex alignItems="center" mr={noConfig ? 0 : '16px'}>
        {backTo && (
          <IconButton as={Link} to={backTo}>
            <ArrowBackIcon width="32px" />
          </IconButton>
        )}
        <Flex flexDirection="column">
          <Heading as="h2" mb="8px">
            {title}
          </Heading>
          <Flex alignItems="center">
            {helper && <QuestionHelper text={helper} mr="4px" />}
            <Text fontSize="14px">
              {subtitle}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {!noConfig && (
        <Flex alignItems="center">
          <NotificationDot show={expertMode}>
            <GlobalSettings />
          </NotificationDot>
          <Transactions />
        </Flex>
      )}
    </AppHeaderContainer>
  )
}

export default AppHeader
