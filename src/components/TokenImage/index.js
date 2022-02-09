import React from 'react'
import {
  TokenPairImage as UIKitTokenPairImage,
  TokenImage as UIKitTokenImage,
} from '@pancakeswap/uikit'
import tokens from '../../constants/tokens';

const getImageUrlFromToken = (token) => {
  const address = token.symbol === 'BNB' ? tokens.wbnb.address : token.address
  return `/images/tokens/${address}.svg`
}

export const TokenPairImage = ({ primaryToken, secondaryToken, ...props }) => {
  return (
    <UIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      {...props}
    />
  )
}

export const TokenImage = ({ token, ...props }) => {
  return <UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />
}
