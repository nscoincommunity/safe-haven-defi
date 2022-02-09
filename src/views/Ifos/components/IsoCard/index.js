import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core';
import IsoCardHeading from './IsoCardHeading'
import IsoCardDetails from './IsoCardDetails'
import IsoCardContribute from './IsoCardContribute'
import ConnectWalletButton from '../../../../components/ConnectWalletButton'

const StyledIsoCard = styled(Card)`
  background: #eefbff;
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
  padding: 0;
`

const IsoCard = ({ iso }) => {
  const { account } = useWeb3React()
  return (
    <StyledIsoCard>
      <CardBody>
        <IsoCardHeading tokenLabel={iso.tokenLabel} token={iso.token} />
        <IsoCardDetails {...iso} />
        {!account && <ConnectWalletButton width="100%" />}
        {account && (
          <IsoCardContribute
            pid={iso.pid}
            token={iso.token}
            tokenLabel={iso.tokenLabel}
            raisingAmountPool={iso.raisingAmountPool}
            offeringAmountPool={iso.offeringAmountPool}
            userData={iso.userData}
          />
        )}
        <Text color='#253449' mt="12px">5% discount & you save 13% buying fee when launching on Pancakeswap</Text>
      </CardBody>
    </StyledIsoCard>
  )
}

export default IsoCard
