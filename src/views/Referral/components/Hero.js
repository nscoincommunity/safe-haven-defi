import React from 'react'
import { Heading } from '@pancakeswap/uikit'
import PageHeader from '../../../components/PageHeader'

const Hero = () => {
    return (
        <PageHeader>
            <Heading as="h1" scale="xxl" color="#253449cc" mb="24px" className=''>
                ISO
            </Heading>
            <Heading scale="lg" color="#253449">
                Referral
            </Heading>
            <Heading scale="lg" color="#253449">
                You can earn 3%(bonus) of your friend's earnings !
            </Heading>
        </PageHeader>
    )
}

export default Hero;