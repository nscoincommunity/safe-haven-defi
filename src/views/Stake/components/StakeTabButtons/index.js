import React from 'react'
import { useLocation, Link, useRouteMatch } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, NotificationDot } from '@pancakeswap/uikit'
import './staketabbuttons.scss';

const StakeTabButtons = ({ hasStakeInFinishedStakes }) => {
  const { url } = useRouteMatch()
  const location = useLocation()

  let activeIndex
  switch (location.pathname) {
    case '/stake':
      activeIndex = 0
      break
    case '/stake/history':
      activeIndex = 1
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <div className='stake-tab-buttons-wrapper'>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="primary">
        <ButtonMenuItem as={Link} to={`${url}`}>
          Live
        </ButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedStakes}>
          <ButtonMenuItem id="finished-stakes-button" as={Link} to={`${url}/history`}>
            Finished
          </ButtonMenuItem>
        </NotificationDot>
      </ButtonMenu>
    </div>
  )
}

export default StakeTabButtons
