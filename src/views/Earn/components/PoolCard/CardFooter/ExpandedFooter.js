import React from 'react'
import styled from 'styled-components'
import { getBalanceNumber, getFullDisplayBalance } from '../../../../../utils/formatBalance'
import {
  Flex,
  MetamaskIcon,
  Text,
  LinkExternal,
  TimerIcon,
  Skeleton,
  useTooltip,
  Button,
  Link,
  HelpIcon,
} from '@pancakeswap/uikit'
import { BASE_BSC_SCAN_URL } from '../../../../../constants'
import { useBlock } from '../../../../../store/slices/block-slice/hooks'
import { getAddress } from '../../../../../utils/addressHelpers'
import { registerToken } from '../../../../../utils/wallet'
import { getBscScanLink } from '../../../../../utils'
import Balance from '../../../../../components/Balance'
import { getPoolBlockInfo } from '../../../helpers'

const ExpandedWrapper = styled(Flex)`
  svg {
    height: 14px;
    width: 14px;
  }
`

const ExpandedFooter = ({ pool, account }) => {
  const { currentBlock } = useBlock()

  const {
    stakingToken,
    earningToken,
    totalStaked,
    startBlock,
    endBlock,
    stakingLimit,
    contractAddress,
  } = pool

  const tokenAddress = earningToken.address || ''
  const poolContractAddress = getAddress(contractAddress)
  const isMetaMaskInScope = !!window.ethereum?.isMetaMask

  const { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay } =
    getPoolBlockInfo(pool, currentBlock)

  const getTotalStakedBalance = () => {
    return getBalanceNumber(totalStaked, stakingToken.decimals)
  }

  const {
    targetRef: totalStakedTargetRef,
    tooltip: totalStakedTooltip,
    tooltipVisible: totalStakedTooltipVisible,
  } = useTooltip(`Total amount of ${stakingToken.symbol} staked in this pool`, {
    placement: 'bottom'
  })

  return (
    <ExpandedWrapper flexDirection="column">
      <Flex mb="2px" justifyContent="space-between" alignItems="center">
        <Text color="#253449" small>Total staked:</Text>
        <Flex alignItems="flex-start">
          {totalStaked && totalStaked.gte(0) ? (
            <>
              <Balance small value={getTotalStakedBalance()} decimals={0} unit={` ${stakingToken.symbol}`} />
              <span ref={totalStakedTargetRef}>
                <HelpIcon color="#253449cc" width="20px" ml="6px" mt="4px" />
              </span>
            </>
          ) : (
            <Skeleton width="90px" height="21px" />
          )}
          {totalStakedTooltipVisible && totalStakedTooltip}
        </Flex>
      </Flex>
      {stakingLimit && stakingLimit.gt(0) && (
        <Flex mb="2px" justifyContent="space-between">
          <Text color="#253449" small>Max. stake per user:</Text>
          <Text color="#253449" small>{`${getFullDisplayBalance(stakingLimit, stakingToken.decimals, 0)} ${stakingToken.symbol}`}</Text>
        </Flex>
      )}
      {shouldShowBlockCountdown && (
        <Flex mb="2px" justifyContent="space-between" alignItems="center">
          <Text color="#253449" small>{hasPoolStarted ? 'Ends in' : 'Starts in'}:</Text>
          {blocksRemaining || blocksUntilStart ? (
            <Flex alignItems="center">
              <Link external href={getBscScanLink(hasPoolStarted ? endBlock : startBlock, 'countdown')}>
                <Balance small value={blocksToDisplay} decimals={0} color="primary" />
                <Text small ml="4px" color="primary" textTransform="lowercase">
                  Blocks
                </Text>
                <TimerIcon ml="4px" color="primary" />
              </Link>
            </Flex>
          ) : (
            <Skeleton width="54px" height="21px" />
          )}
        </Flex>
      )}
      <Flex mb="2px" justifyContent="flex-end">
        <LinkExternal href={earningToken.projectLink} bold={false} small>
          View Project Site
        </LinkExternal>
      </Flex>
      {poolContractAddress && (
        <Flex mb="2px" justifyContent="flex-end">
          <LinkExternal
            href={`${BASE_BSC_SCAN_URL}/address/${poolContractAddress}`}
            bold={false}
            small
          >
            View Contract
          </LinkExternal>
        </Flex>
      )}
      {account && isMetaMaskInScope && tokenAddress && (
        <Flex justifyContent="flex-end">
          <Button
            variant="text"
            p="0"
            height="auto"
            onClick={() => registerToken(tokenAddress, earningToken.symbol, earningToken.decimals)}
          >
            <Text color="primary" fontSize="14px">
              Add to Metamask
            </Text>
            <MetamaskIcon ml="4px" />
          </Button>
        </Flex>
      )}
    </ExpandedWrapper>
  )
}

export default React.memo(ExpandedFooter)
