import React from 'react'
import { Tag, Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import { CoreTag } from '../../../../components/Tags';
import { TokenPairImage } from '../../../../components/TokenImage';
import './cardheading.scss';

const CardHeading = ({ pid, lpLabel, multiplier, isCommunityFarm, token, quoteToken }) => {
  return (
    <Flex className='card-heading-wrapper' justifyContent="space-between" alignItems="center" mb="12px">
      <TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading color="#253449" mb="4px">{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">
          {pid < 6 && pid >= 0 && <CoreTag />}
          {multiplier ? (
            <Tag className="multiplier-tag" variant="primary">{multiplier}</Tag>
          ) : (
            <Skeleton ml="4px" width={42} height={28} />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CardHeading
