import React from 'react'
import styled from 'styled-components'
import { Text, BaseLayout, Button } from '@pancakeswap/uikit'
import IsoCard from './components/IsoCard'
import IsoCards from './components/IsoCards'

const LaunchIsoCallout = styled(BaseLayout)`
  border-top: 2px solid #1FC7D4;

  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 32px 0;
`

const SubTitle = styled(Text)`
  font-size: 22px;
`

const Lists = styled.ul`
  padding-left: 20px;
`

const List = styled.li`
  margin-bottom: 8px;
`

const Card = styled.div`
  position: relative;
  overflow: hidden;
  background: #eefbff;
  border-radius: 32px;
  max-width: 430px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
  padding: 32px;
  &::after {
    position: absolute;
    right: -60px;
    top: 30px;
    display: inline-block;
    transform: rotate(45deg);
    padding: 6px 80px;
    background-color: #1FC7D4;
    color: white;
  }
  &.step-1 {
    &::after {
        content: "STEP 1";
    }
  }
  &.step-2 {
    &::after {
        content: "STEP 2";
    }
  }
  &.step-3 {
    &::after {
        content: "STEP 3";
    }
  }
`


const Iso = ({ isos }) => {
  return (
    <div>
      <IsoCards>
        {isos.map((iso, key) => (
          <IsoCard key={key} iso={iso} />
        ))}
      </IsoCards>
      <LaunchIsoCallout>
        <div>
          <Card className='step-1'>
            <SubTitle color="#253449" mb={16}>Before Sale:</SubTitle>
            <Lists>
              <List>Buy HAVEN and BNB</List>
              <List>Get HAVEN-BNB LP tokens by adding liquidity</List>
            </Lists>
          </Card>
          <Card className='step-2'>
            <SubTitle color="#253449" mb={16}>During Sale:</SubTitle>
            <Lists>
              <List>While the sale is live, commit above LP tokens to get new feasible token!</List>
            </Lists>
          </Card>
          <Card className='step-3'>
            <SubTitle color="#253449" mb={16}>After Sale:</SubTitle>
            <Lists>
              <List>Claim the tokens you purchased, along with any unspent funds.</List>
              <List>Done!</List>
            </Lists>
            <Button
              as="a"
              variant="secondary"
              href="/#/"
              external
            >
              Read more
            </Button>
          </Card>
          <Card>
            <Text color="#253449" mb={16}>
              Launch your project with SafePad and bring your token directly to one of the most active and rapidly growing community on BSC
            </Text>
            <Button
              as="a"
              href="/#/"
              external
            >
              Apply to launch
            </Button>
          </Card>
        </div>
      </LaunchIsoCallout>
    </div>
  )
}

export default Iso
