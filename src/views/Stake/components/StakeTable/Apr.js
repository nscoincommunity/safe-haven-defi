import React from 'react'
import styled from 'styled-components'
import ApyButton from '../StakeCard/ApyButton';
import { Skeleton } from '@pancakeswap/uikit'
import { displayNumber } from '../../../../utils/formatBalance';

const Container = styled.div`
  display: flex;
  align-items: center;
  color: #253449;

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: #253449;
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apr = ({
  pid,
  stakeLabel,
  stakeSymbol,
  multiplier,
  tokenPriceBusd,
  tokenAddress,
  sltPrice,
  originalValue,
  hideButton = false,
}) => {
  const getTokenLink = tokenAddress ? `https://pancakeswap.finance/swap?outputCurrency=${tokenAddress}` : 'https://pancakeswap.finance/swap'

  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <ApyButton
          variant={hideButton ? 'primary' : 'text-and-button'}
          pid={pid}
          stakeSymbol={stakeSymbol}
          stakeLabel={stakeLabel}
          tokenPriceBusd={tokenPriceBusd}
          multiplier={multiplier}
          sltPrice={sltPrice}
          apr={originalValue}
          getTokenLink={getTokenLink}
        />
      ) : (
        <AprWrapper>
          <Skeleton width={60} />
        </AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>{displayNumber(originalValue)}%</AprWrapper>
    </Container>
  )
}

export default Apr
