import React from 'react'
import styled from 'styled-components'
import { Button } from '@pancakeswap/uikit'

const StyledButton = styled(Button)`
  flex-grow: 1;
`

const PercentageButton = ({ children, onClick }) => {
  return (
    <StyledButton scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default PercentageButton