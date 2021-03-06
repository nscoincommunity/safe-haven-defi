import React from 'react'
import { Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'

const SltWalletBalance = ({ sltBalance }) => {
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px' }}>
        Locked
      </Text>
    )
  }
  return (
    <Text color="#253449" fontSize="24px" bold>
      {sltBalance}
    </Text>
  )
}

export default SltWalletBalance
