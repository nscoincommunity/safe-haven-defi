import React from 'react'
import { Text, Flex, LinkExternal, Skeleton } from '@pancakeswap/uikit'
import './detailssection.scss';

const DetailsSection = ({
  bscScanAddress,
  infoAddress,
  removed,
  totalValueFormatted,
  stakeLabel,
  getTokenLink,
}) => {
  return (
    <div className='details-section-wrapper'>
      <Flex className='total-liquidity'>
        <Text color="#253449">Total Liquidity:</Text>
        {totalValueFormatted || totalValueFormatted === 0 ? <Text color="#253449">{totalValueFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex>
      {!removed && (
        <LinkExternal className='styled-link-external' href={getTokenLink}>{`Get ${stakeLabel}`}</LinkExternal>
      )}
      <LinkExternal className='styled-link-external' href={bscScanAddress}>View Contract</LinkExternal>
    </div>
  )
}

export default DetailsSection
