import React from 'react'
import { useLocation, Link, useRouteMatch } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, NotificationDot } from '@pancakeswap/uikit'
import './farmtabbuttons.scss';

const FarmTabButtons = ({ hasStakeInFinishedFarms }) => {
  const { url } = useRouteMatch()
  const location = useLocation()

  let activeIndex
  switch (location.pathname) {
    case '/farms':
      activeIndex = 0
      break
    case '/farms/history':
      activeIndex = 1
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <div className='farm-tab-buttons-wrapper'>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="primary">
        <ButtonMenuItem as={Link} to={`${url}`}>
          Live
        </ButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedFarms}>
          <ButtonMenuItem id="finished-farms-button" as={Link} to={`${url}/history`}>
            Finished
          </ButtonMenuItem>
        </NotificationDot>
      </ButtonMenu>
    </div>
  )
}

export default FarmTabButtons
