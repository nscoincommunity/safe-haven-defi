import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 39px;
`

const IsoTabButtons = () => {
  const { url, isExact } = useRouteMatch()

  return (
    <Wrapper>
      <ButtonMenu activeIndex={!isExact ? 1 : 0} scale="sm" variant="primary">
        <ButtonMenuItem as={Link} to={`${url}`}>
          Next ISO
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/history`}>
          Past ISOs
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default IsoTabButtons
