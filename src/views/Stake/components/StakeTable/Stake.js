import React from 'react'
import styled from 'styled-components'
import { useStakeUser } from '../../../../store/slices/stake-slice/hooks'
import { Text } from '@pancakeswap/uikit'
import { getBalanceNumber } from '../../../../utils/formatBalance'
import tokens from '../../../../constants/tokens'

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
  }
`

const Stake = ({ token, label, pid }) => {
  const { stakedBalance } = useStakeUser(pid)
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const getImageUrlFromToken = (token) => {
    const address = token.symbol === 'BNB' ? tokens.wbnb.address : token.address
    return `/images/tokens/${address}.svg`
  }

  const handleRenderStaking = () => {
    if (rawStakedBalance) {
      return (
        <Text color="#253449" fontSize="12px" bold textTransform="uppercase">
          Staking
        </Text>
      )
    }

    return null
  }

  return (
    <Container>
      <TokenWrapper>
        <img src={getImageUrlFromToken(token)} width="100%" alt=''/>
      </TokenWrapper>
      <div>
        {handleRenderStaking()}
        <Text color="#253449" bold>{label}</Text>
      </div>
    </Container>
  )
}

export default Stake
