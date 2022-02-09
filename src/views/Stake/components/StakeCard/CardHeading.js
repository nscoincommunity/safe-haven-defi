import React from 'react'
import { Tag, Flex, Heading, Skeleton } from '@pancakeswap/uikit'
import { CoreTag } from '../../../../components/Tags';
import './cardheading.scss';
import tokens from '../../../../constants/tokens';

const CardHeading = ({ pid, stakeLabel, multiplier, isCommunityStake, token }) => {
  const getImageUrlFromToken = (token) => {
    const address = token.symbol === 'BNB' ? tokens.wbnb.address : token.address
    return `/images/tokens/${address}.svg`
  }

  return (
    <Flex className='card-heading-wrapper' justifyContent="space-between" alignItems="center" mb="12px">
      <img src={getImageUrlFromToken(token)} width={64} height={64} alt="" />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading color="#253449" mb="4px">{stakeLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">
          {pid === 5 && <CoreTag />}
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
