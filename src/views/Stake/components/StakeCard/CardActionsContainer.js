import React, { useState, useCallback } from 'react'
import { Button, Flex, Text } from '@pancakeswap/uikit'
import { useDispatch } from 'react-redux';
import { useERC20 } from '../../../../hooks/useContract'
import ConnectWalletButton from '../../../../components/ConnectWalletButton';
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'
import './cardactionscontainer.scss';

import { fetchStakeUserDataAsync } from '../../../../store/slices/stake-slice';
import useApproveStake from '../../hooks/useApproveStake'

const CardActions = ({ stake, account, getTokenLink, sltPrice, stakeLabel }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, token, tokenPriceBusd, withdrawFee } = stake
  const { allowance, tokenBalance, stakedBalance, earnings } = stake.userData || {}
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const dispatch = useDispatch()

  const stakeContract = useERC20(token.address)
  const { onApprove } = useApproveStake(stakeContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchStakeUserDataAsync({ account, pids: [pid] }))
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stake={stake}
        withdrawFee={withdrawFee}
        tokenPriceBusd={tokenPriceBusd}
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={stake.stakeSymbol}
        pid={pid}
        apr={stake.apr}
        stakeLabel={stakeLabel}
        sltPrice={sltPrice}
        getTokenLink={getTokenLink}
      />
    ) : (
      <Button mt="8px" width="100%" disabled={requestedApproval} onClick={handleApprove}>
        Enable Contract
      </Button>
    )
  }

  return (
    <div className='action'>
      <Flex>
        <Text bold textTransform="uppercase" color="#253449" fontSize="12px" pr="4px">
          SLT
        </Text>
        <Text bold textTransform="uppercase" color="#253449" fontSize="12px">
          Earned
        </Text>
      </Flex>
      <HarvestAction earnings={earnings} pid={pid} />
      <Flex>
        <Text bold textTransform="uppercase" color="#253449" fontSize="12px" pr="4px">
          {stake.stakeSymbol}
        </Text>
        <Text bold textTransform="uppercase" color="#253449" fontSize="12px">
          Staked
        </Text>
      </Flex>
      {!account ? <ConnectWalletButton mt="8px" width="100%" /> : renderApprovalOrStakeButton()}
    </div>
  )
}

export default CardActions
