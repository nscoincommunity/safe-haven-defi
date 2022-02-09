import React from 'react'
import styled from 'styled-components'
import { Flex, TooltipText, IconButton, useModal, CalculateIcon, Skeleton, useTooltip } from '@pancakeswap/uikit'
import Balance from '../../../../components/Balance'
import RoiCalculatorModal from '../../../../components/RoiCalculatorModal'
import { getAprData } from '../../helpers'
import BigNumber from 'bignumber.js'
import { displayNumber } from '../../../../utils/formatBalance'

const ApyLabelContainer = styled(Flex)`
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`

const AprRow = ({ pool, performanceFee = 0 }) => {
  const { stakingToken, isFinished, apr, earningTokenPrice } = pool

  const tooltipContent = 'APY includes compounding, APR doesn’t. This pool’s reward token is compounded automatically, so we show APY.'

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-start' })

  const { apr: earningsPercentageToDisplay } = getAprData(pool, performanceFee)

  const apyModalLink = stakingToken.address ? `https://pancakeswap.finance/swap?outputCurrency=${stakingToken.address}` : 'https://pancakeswap.finance/swap'

  const [onPresentApyModal] = useModal(
    <RoiCalculatorModal
      earningTokenPrice={new BigNumber(earningTokenPrice)}
      apr={apr}
      linkLabel={`Get ${stakingToken.symbol}`}
      linkHref={apyModalLink}
    />,
  )

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText color="#253449" ref={targetRef}>APR:</TooltipText>
      {!apr ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <ApyLabelContainer alignItems="center" onClick={onPresentApyModal}>
          <Balance
            fontSize="16px"
            isDisabled={isFinished}
            value={displayNumber(earningsPercentageToDisplay)}
            decimals={2}
            unit="%"
            onClick={onPresentApyModal}
          />
          <IconButton variant="text" scale="sm">
            <CalculateIcon color="#253449cc" width="18px" />
          </IconButton>
        </ApyLabelContainer>
      )}
    </Flex>
  )
}

export default AprRow
