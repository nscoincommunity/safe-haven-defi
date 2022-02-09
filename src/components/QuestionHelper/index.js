import { HelpIcon, useTooltip, Box } from '@pancakeswap/uikit'
import styled from 'styled-components'

const QuestionWrapper = styled.div`
  :hover,
  :focus {
    opacity: 0.7;
  }
`

const QuestionHelper = ({ text, placement = 'right-end', ...props }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(text, { placement, trigger: 'hover' })

  return (
    <Box {...props}>
      {tooltipVisible && tooltip}
      <QuestionWrapper ref={targetRef}>
        <HelpIcon color="#253449" width="16px" />
      </QuestionWrapper>
    </Box>
  )
}

export default QuestionHelper
