import React from 'react'
import { Flex, Text, Button, IconButton, AddIcon, MinusIcon, useModal, Skeleton, useTooltip } from '@pancakeswap/uikit'
import { getBalanceNumber } from '../../../../../utils/formatBalance'
import Balance from '../../../../../components/Balance'
import NotEnoughTokensModal from '../Modals/NotEnoughTokensModal'
import StakeModal from '../Modals/StakeModal'

const StakeAction = ({
  pool,
  stakingTokenBalance,
  stakedBalance,
  isStaked,
  isLoading = false,
}) => {
  const { stakingToken, stakingTokenPrice, stakingLimit, isFinished, userData } = pool
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const [onPresentStake] = useModal(
    <StakeModal
      pool={pool}
      stakingTokenBalance={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
    />,
  )

  const [onPresentUnstake] = useModal(
    <StakeModal
      stakingTokenBalance={stakingTokenBalance}
      pool={pool}
      stakingTokenPrice={stakingTokenPrice}
      isRemovingStake
    />,
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    'You’ve already staked the maximum amount you can stake in this pool!',
    { placement: 'bottom' },
  )

  const reachStakingLimit = stakingLimit.gt(0) && userData.stakedBalance.gte(stakingLimit)

  const renderStakeAction = () => {
    return isStaked ? (
      <Flex justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column">
          <>
            <Balance bold fontSize="20px" decimals={3} value={stakedTokenBalance} />
            {stakingTokenPrice !== 0 && (
              <Text fontSize="12px" color="#253449cc">
                <Balance
                  fontSize="12px"
                  color="#253449cc"
                  decimals={2}
                  value={stakedTokenDollarBalance}
                  prefix="~"
                  unit=" USD"
                />
              </Text>
            )}
          </>
        </Flex>
        <Flex>
          <IconButton variant="primary" onClick={onPresentUnstake} mr="6px">
            <MinusIcon color="#fff" width="24px" />
          </IconButton>
          {reachStakingLimit ? (
            <span ref={targetRef}>
              <IconButton variant="primary" disabled>
                <AddIcon color="#fff" width="24px" height="24px" />
              </IconButton>
            </span>
          ) : (
            <IconButton
              variant="primary"
              onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}
              disabled={isFinished}
            >
              <AddIcon color="#fff" width="24px" height="24px" />
            </IconButton>
          )}
        </Flex>
        {tooltipVisible && tooltip}
      </Flex>
    ) : (
      <Button disabled={isFinished} onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>
        Stake
      </Button>
    )
  }

  return <Flex flexDirection="column">{isLoading ? <Skeleton width="100%" height="52px" /> : renderStakeAction()}</Flex>
}

export default StakeAction
