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
        Initial Safe Offering
      </Heading>
      <Heading scale="lg" color="#253449">
        Join huge potential projects with the SafeHaven DeFi approval.
      </Heading>
    </PageHeader>
  )
}

export default Hero
