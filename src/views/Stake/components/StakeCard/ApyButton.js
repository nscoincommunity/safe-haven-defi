import React from 'react'
import { IconButton, useModal, CalculateIcon } from '@pancakeswap/uikit'
import RoiCalculatorModal from '../../../../components/RoiCalculatorModal';
import { displayNumber } from '../../../../utils/formatBalance'

import './apybutton.scss';

const ApyButton = ({
  variant,
  stakeLabel,
  sltPrice,
  apr,
  getTokenLink,
}) => {
  const [onPresentApyModal] = useModal(
    <RoiCalculatorModal
      linkLabel={`Get ${stakeLabel}`}
      earningTokenPrice={sltPrice}
      apr={apr}
      linkHref={getTokenLink}
    />,
  )

  const handleClickButton = (event) => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <div className='apy-label-container' onClick={handleClickButton}>
      {displayNumber(apr)}%
      {variant === 'text-and-button' && (
        <IconButton variant="text" className='apy-icon-button' scale="sm" ml="4px">
          <CalculateIcon color='#253449' width="18px" />
        </IconButton>
      )}
    </div>
  )
}

export default ApyButton
