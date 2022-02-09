import React from 'react'
import styled from 'styled-components'
import { BIG_ZERO } from '../../../../../utils/bigNumber'
import { Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import BaseCell, { CellContent } from './BaseCell'
import Apr from '../Apr'

const StyledCell = styled(BaseCell)`
  flex: 1 0 50px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 120px;
  }
`

const AprCell = ({ pool }) => {
  const { isMobile } = useMatchBreakpoints()
  const { userData } = pool
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="#253449cc" textAlign="left">
          APR
        </Text>
        <Apr pool={pool} stakedBalance={stakedBalance} showIcon={!isMobile} />
      </CellContent>
    </StyledCell>
  )
}

export default AprCell
