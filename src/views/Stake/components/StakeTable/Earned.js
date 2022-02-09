import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@pancakeswap/uikit'

const Amount = styled.span`
  color: #253449;
  display: flex;
  align-items: center;
`

const Earned = ({ earnings, userDataReady }) => {
  if (userDataReady) {
    return <Amount earned={earnings}>{earnings.toLocaleString()}</Amount>
  }
  return (
    <Amount earned={0}>
      <Skeleton width={60} />
    </Amount>
  )
}

export default Earned
