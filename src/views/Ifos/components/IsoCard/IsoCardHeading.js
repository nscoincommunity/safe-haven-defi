import React from 'react'
import { Flex, Text } from '@pancakeswap/uikit'
import tokens from '../../../../constants/tokens';

const IsoCardHeading = ({ tokenLabel, token }) => {
  const getImageUrlFromToken = (token) => {
    const address = token.symbol === 'BNB' ? tokens.wbnb.address : token.address
    return `/images/tokens/${address}.svg`
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" mb="24px">
      <img src={getImageUrlFromToken(token)} width={64} height={64} alt="" />
      <Text color="#253449" bold mb="4px" fontSize='24px'>{tokenLabel.split(' ')[0]}</Text>
    </Flex>
  )
}

export default IsoCardHeading
