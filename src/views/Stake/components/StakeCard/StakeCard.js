import React, { useState } from 'react'
import { Card, Flex, Text, Skeleton } from '@pancakeswap/uikit'
import { getBscScanLink } from '../../../../utils';
import ExpandableSectionButton from '../../../../components/ExpandableSectionButton';
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton';
import './stakecard.scss';

const StakeCard = ({ stake, removed, sltPrice, account }) => {

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const totalValueFormatted =
    stake.liquidity
      ? `$${stake.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 3 })}`
      : ''

  const stakeLabel = stake.stakeSymbol && stake.stakeSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = stake.dual ? stake.dual.earnLabel : 'SLT'

  const getTokenLink = stake.tokenAddress ? `https://pancakeswap.finance/swap?outputCurrency=${stake.tokenAddress}` : 'https://pancakeswap.finance/swap'
  const isPromotedStake = stake.token.symbol === 'SLT'

  return (
    <Card className='styled-card' isActive={isPromotedStake}>
      <Flex className='stakecard-inner-container'>
        <CardHeading
          pid={stake.pid}
          stakeLabel={stakeLabel}
          multiplier={stake.multiplier}
          isCommunityStake={stake.isCommunity}
          token={stake.token}
        />
        {!removed && (
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="#253449">APR:</Text>
            <Text color="#253449" bold style={{ display: 'flex', alignItems: 'center' }}>
              {stake.apr ? (
                <ApyButton
                  variant="text-and-button"
                  pid={stake.pid}
                  stakeSymbol={stake.stakeSymbol}
                  multiplier={stake.multiplier}
                  stakeLabel={stakeLabel}
                  tokenPriceBusd={stake.tokenPriceBusd}
                  getTokenLink={getTokenLink}
                  sltPrice={sltPrice}
                  apr={stake.apr}
                />
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          </Flex>
        )}
        <Flex justifyContent="space-between">
          <Text color="#253449">Earn:</Text>
          <Text color="#253449" bold>{earnLabel}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="#253449">Deposit Fee:</Text>
          <Text color="#253449" bold>{`${stake.depositFeeBP ? stake.depositFeeBP / 100 : 0}%`}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="#253449">Withdrawal Fee:</Text>
          <Text color="#253449" bold>{stake.isWithdrawFee ? `0~3%` : `0%`}</Text>
        </Flex>
        <CardActionsContainer
          stake={stake}
          stakeLabel={stakeLabel}
          account={account}
          sltPrice={sltPrice}
          getTokenLink={getTokenLink}
        />
      </Flex>

      <div className='expanding-wrapper'>
        <ExpandableSectionButton
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          expanded={showExpandableSection}
        />
        {showExpandableSection && (
          <DetailsSection
            removed={removed}
            bscScanAddress={getBscScanLink(stake.tokenAddress, 'address')}
            infoAddress={`/info/pool/${stake.tokenAddress}`}
            totalValueFormatted={totalValueFormatted}
            stakeLabel={stakeLabel}
            getTokenLink={getTokenLink}
          />
        )}
      </div>
    </Card>
  )
}

export default StakeCard
