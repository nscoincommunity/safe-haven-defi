import React from 'react'
import { Text } from '@pancakeswap/uikit'

const SafemoonWarning = () => {
  return (
    <>
      <Text color="#253449">To trade SAFEMOON, you must: </Text>
      <Text color="#253449">• Click on the settings icon</Text>
      <Text color="#253449" mb="24px">• Set your slippage tolerance to 12%+</Text>
      <Text color="#253449">This is because SafeMoon taxes a 10% fee on each transaction:</Text>
      <Text color="#253449">• 5% fee = redistributed to all existing holders</Text>
      <Text color="#253449">• 5% fee = used to add liquidity</Text>
    </>
  )
}

export default SafemoonWarning
