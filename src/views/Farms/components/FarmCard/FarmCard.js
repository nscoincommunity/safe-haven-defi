import React, { useState } from 'react'
import { Card, Flex, Text, Skeleton } from '@pancakeswap/uikit'
import { getBscScanLink } from '../../../../utils';
import ExpandableSectionButton from '../../../../components/ExpandableSectionButton';
import { getAddress } from '../../../../utils/addressHelpers';
import getLiquidityUrlPathParts from '../../../../utils/getLiquidityUrlPathParts';
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton';
import './farmcard.scss';

const FarmCard = ({ farm, removed, sltPrice, account }) => {

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const totalValueFormatted =
    farm.liquidity
      ? `$${farm.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 4 })}`
      : ''

  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : 'SLT'

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address,
  })
  const addLiquidityUrl = `https://pancakeswap.finance/add/${liquidityUrlPathParts}`
  const lpAddress = getAddress(farm.lpAddresses)
  const isPromotedFarm = farm.token.symbol === 'SLT'

  return (
    <Card className='styled-card' isActive={isPromotedFarm}>
      <Flex className='farmcard-inner-container'>
        <CardHeading
          pid={farm.pid}
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          isCommunityFarm={farm.isCommunity}
          token={farm.token}
          quoteToken={farm.quoteToken}
        />
        {!removed && (
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="#253449">APR:</Text>
            <Text color="#253449" bold style={{ display: 'flex', alignItems: 'center' }}>
              {farm.apr || farm.apr === 0 ? (
                <ApyButton
                  variant="text-and-button"
                  pid={farm.pid}
                  lpSymbol={farm.lpSymbol}
                  multiplier={farm.multiplier}
                  lpLabel={lpLabel}
                  addLiquidityUrl={addLiquidityUrl}
                  sltPrice={sltPrice}
                  apr={farm.apr}
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
          <Text color="#253449" bold>{`${farm.depositFeeBP ? farm.depositFeeBP / 100: 0}%`}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="#253449">Withdrawal Fee:</Text>
          <Text color="#253449" bold>{farm.isWithdrawFee ? `0~3%` : `0%`}</Text>
        </Flex>
        <CardActionsContainer
          farm={farm}
          lpLabel={lpLabel}
          account={account}
          sltPrice={sltPrice}
          addLiquidityUrl={addLiquidityUrl}
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
            bscScanAddress={getBscScanLink(lpAddress, 'address')}
            infoAddress={`/#/info/pool/${lpAddress}`}
            totalValueFormatted={totalValueFormatted}
            lpLabel={lpLabel}
            addLiquidityUrl={addLiquidityUrl}
          />
        )}
      </div>
    </Card>
  )
}

export default FarmCard
