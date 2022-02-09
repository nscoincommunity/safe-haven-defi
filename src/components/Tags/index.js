import React from 'react'
import {
  Tag,
  VerifiedIcon,
  CommunityIcon,
  RefreshIcon,
  AutoRenewIcon,
  TimerIcon,
  BlockIcon,
  VoteIcon,
} from '@pancakeswap/uikit'

const CoreTag = (props) => {
  return (
    <Tag variant="primary" outline startIcon={<VerifiedIcon width="18px" color="#1FC7D4" mr="4px" />} {...props}>
      No fees
    </Tag>
  )
}

const CommunityTag = (props) => {
  return (
    <Tag variant="failure" outline startIcon={<CommunityIcon width="18px" color="#ED4B9E" mr="4px" />} {...props}>
      Community
    </Tag>
  )
}

const DualTag = (props) => {
  return (
    <Tag variant="#253449" outline {...props}>
      Dual
    </Tag>
  )
}

const ManualPoolTag = (props) => {
  return (
    <Tag variant="primary" outline startIcon={<RefreshIcon width="18px" color="#1FC7D4" mr="4px" />} {...props}>
      Manual
    </Tag>
  )
}

const CompoundingPoolTag = (props) => {
  return (
    <Tag variant="success" outline startIcon={<AutoRenewIcon width="18px" color="#31D0AA" mr="4px" />} {...props}>
      Auto
    </Tag>
  )
}

const VoteNowTag = (props) => {
  return (
    <Tag variant="success" startIcon={<VoteIcon width="18px" color="#31D0AA" mr="4px" />} {...props}>
      Vote Now
    </Tag>
  )
}

const SoonTag = (props) => {
  return (
    <Tag variant="binance" startIcon={<TimerIcon width="18px" color="#31D0AA" mr="4px" />} {...props}>
      Soon
    </Tag>
  )
}

const ClosedTag = (props) => {
  return (
    <Tag variant="textDisabled" startIcon={<BlockIcon width="18px" color="#BDC2C4" mr="4px" />} {...props}>
      Closed
    </Tag>
  )
}

export { CoreTag, CommunityTag, DualTag, ManualPoolTag, CompoundingPoolTag, VoteNowTag, SoonTag, ClosedTag }
