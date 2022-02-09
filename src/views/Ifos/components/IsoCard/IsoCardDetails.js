import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Text, Flex, Skeleton } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { formatNumber } from '../../../../utils/formatBalance'

const SectionSide = styled.div`
    padding-right: 16px;
`

const IsoCardDetails = ({
    token,
    tokenLabel, 
    minHavenToJoin, 
    userData, 
    offeringAmountPool, 
    raisingAmountPool,
    totalCommittedPercent,
    totalLPCommitted,
    maxCommitRatio,
    totalAmountPool,
    getCommittedValue
}) => {
    const stakeData = useSelector(state => state.stake.data)
    const sltPrice = useSelector(state => state.app.priceOfOneSLT)
    const tokenPrice = stakeData.filter(data => data.stakeSymbol === tokenLabel)[0].tokenPriceBusd
    
    return (
        <>
            <Flex justifyContent="space-between" alignItems="center" mb="12px">
                <SectionSide>
                    <Text color="#253449" bold fontSize='17px'>Total committed</Text>
                </SectionSide>
                <Text color='primary' bold fontSize='17px'>
                    {tokenPrice && totalLPCommitted && totalCommittedPercent ? (
                        `$${new Intl.NumberFormat('en-US').format(formatNumber(((new BigNumber(tokenPrice)).times(totalLPCommitted)).toNumber()))} (${totalCommittedPercent}%)`
                    ) : (
                        <Skeleton width={100} />
                    )}
                </Text>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb="12px">
                <SectionSide>
                    <Text color="#253449" bold fontSize='17px'>You will get</Text>
                    <Text color="#253449cc" fontSize='17px'>% of your committed value</Text>
                </SectionSide>
                <Text color='primary' bold fontSize='17px'>
                    {getCommittedValue ? (
                        `${getCommittedValue}%`
                    ) : (
                        <Skeleton width={100} />
                    )}
                </Text>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb="12px">
                <SectionSide>
                    <Text color="#253449" bold fontSize='17px'>You will be returned</Text>
                    <Text color="#253449cc" fontSize='17px'>% of your committed value</Text>
                </SectionSide>
                <Text color='primary' bold fontSize='17px'>
                    {getCommittedValue ? (
                        `${100 - getCommittedValue}%`
                    ) : (
                        <Skeleton width={100} />
                    )}
                </Text>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb="12px">
                <SectionSide>
                    <Text color="#253449" bold fontSize='17px'>Funds to raise</Text>
                </SectionSide>
                <Text color='#253449' fontSize='17px'>
                    {raisingAmountPool ? (
                        `${new Intl.NumberFormat('en-US').format(raisingAmountPool)} ${tokenLabel}`
                    ) : (
                        <Skeleton width={100} />
                    )}
                </Text>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb="12px">
                <SectionSide>
                    <Text color="#253449" bold fontSize='17px'>Min HAVEN</Text>
                    <Text color="#253449" bold fontSize='17px'>owned to join</Text>
                </SectionSide>
                <Text color='#253449' fontSize='17px'>
                    {minHavenToJoin ? (
                        `${new Intl.NumberFormat('en-US').format(minHavenToJoin)} HAVEN`
                    ) : (
                        <Skeleton width={100} />
                    )}
                </Text>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb="12px">
                <SectionSide>
                    <Text color="#253449" bold fontSize='17px'>Your HAVEN</Text>
                </SectionSide>
                <Text color='#253449' fontSize='17px'>
                    {userData.userhavenAmount ? (
                        `${new Intl.NumberFormat('en-US').format(userData.userhavenAmount)}`
                    ) : (
                        <Skeleton width={100} />
                    )}
                </Text>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb="12px">
                <SectionSide>
                    <Text color="#253449" bold fontSize='17px'>Your max</Text>
                    <Text color="#253449" bold fontSize='17px'>{tokenLabel} to join</Text>
                </SectionSide>
                <Text color='primary' bold fontSize='17px'>
                    {maxCommitRatio && offeringAmountPool ? (
                        `${new Intl.NumberFormat('en-US').format(maxCommitRatio.times(offeringAmountPool))}`
                    ) : (
                        <Skeleton width={100} />
                    )}
                </Text>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center" mb="12px">
                <SectionSide>
                    <Text color="#253449" bold fontSize='17px'>Price</Text>
                </SectionSide>
                <Text color='#253449' fontSize='17px'>
                    {sltPrice && tokenPrice ? (
                        `1 SLT = ${(sltPrice / tokenPrice).toFixed(5)} ${tokenLabel}`
                    ) : (
                        <Skeleton width={100} />
                    )}
                </Text>
            </Flex>
            <Flex flexDirection="column" mb="12px">
                <Flex>
                    <Text color="#253449" bold fontSize='17px' mr="4px">{tokenLabel}</Text>
                    <Text color="primary" bold fontSize='17px'>COMMITTED</Text>
                </Flex>
                <Text color="primary" fontSize='28px'>
                    {userData.amount ? (
                        `${new Intl.NumberFormat('en-US').format(userData.amount.div(token.decimals))}`
                    ) : (
                        <Skeleton width={100} />
                    )}
                </Text>
            </Flex>
        </>
    )
}

export default IsoCardDetails