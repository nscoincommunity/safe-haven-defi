import React from 'react'
import styled from 'styled-components'
import { Flex, useModal, CalculateIcon, Skeleton, Button } from '@pancakeswap/uikit'
import RoiCalculatorModal from '../../../../components/RoiCalculatorModal'
import Balance from '../../../../components/Balance'
import { getAprData } from '../../helpers'
import BigNumber from 'bignumber.js'
import { displayNumber } from '../../../../utils/formatBalance'

const AprLabelContainer = styled(Flex)`
  &:hover {
    opacity: 0.5;
  }
`

const Apr= ({ pool, showIcon, stakedBalance, performanceFee = 0, ...props }) => {
  const { stakingToken, isFinished, earningTokenPrice, apr } = pool

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

  const openRoiModal = (event) => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <AprLabelContainer alignItems="center" justifyContent="space-between" {...props}>
      {earningsPercentageToDisplay || isFinished ? (
        <>
          <Balance
            onClick={openRoiModal}
            fontSize="16px"
            isDisabled={isFinished}
            value={displayNumber(earningsPercentageToDisplay)}
            decimals={2}
            unit="%"
          />
          {!isFinished && showIcon && (
            <Button onClick={openRoiModal} variant="text" width="20px" height="20px" padding="0px" marginLeft="4px">
              <CalculateIcon color="#253449cc" width="20px" />
            </Button>
          )}
        </>
      ) : (
        <Skeleton width="80px" height="16px" />
      )}
    </AprLabelContainer>
  )
}

export default Apr
