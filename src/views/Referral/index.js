import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'
import Card from './components/Card'
import LinkCard from './components/LinkCard'
import Page from '../../components/Layout/Page'
import Hero from './components/Hero'
import { getHavenLayerReferralContract } from '../../utils/contractHelpers'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import sign from 'jwt-encode'

const secret = 'secret';

const CardBox = styled(Flex)`
    margin-bottom: 24px;
    flex-direction: column;
    ${({ theme }) => theme.mediaQueries.md} {
        flex-direction: row;
    }
`

const Referral = () => {
    const { library, account } = useActiveWeb3React()
    const encodeAccount = sign(account, secret);
    const havenLayerReferralContract = getHavenLayerReferralContract(library)
    const [referralsCount, setReferralsCount] = useState(null)
    const [totalReferralCommissions, setTotalReferralCommissions] = useState(null)
    useEffect( async () => {
        if (account) {
            setReferralsCount((await havenLayerReferralContract.referralsCount(account))._hex)
            setTotalReferralCommissions((await havenLayerReferralContract.totalReferralCommissions(account))._hex)
        }
    }, [account])
    return (
        <>
            <Hero />
            <Page>
                <CardBox justifyContent="space-between">
                    <Card 
                        title="Total Referrals" 
                        value={parseFloat(referralsCount, 10)}
                    />
                    <Card
                        title="Total Referral Commissions"
                        value={parseFloat(totalReferralCommissions, 10)}
                    />
                </CardBox>
                <LinkCard 
                    title="Your Referral Link" 
                    link={`${window.location.origin}/#/?ref=${encodeAccount}`}
                />
            </Page>
        </>
    )
}

export default Referral
