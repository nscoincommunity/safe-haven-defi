import React from 'react'
import { Text, ErrorIcon } from '@pancakeswap/uikit'
import styled, { css } from 'styled-components'
import { AutoColumn } from '../../../components/Layout/Column'

export const Wrapper = styled.div`
  position: relative;
  padding: 1rem;
`

export const ArrowWrapper = styled.div`
  padding: 2px;

  ${({ clickable }) =>
    clickable
      ? css`
          :hover {
            cursor: pointer;
            opacity: 0.8;
          }
        `
      : null}
`

export const ErrorText = styled(Text)`
  color: ${({ theme, severity }) =>
    severity === 3 || severity === 4
      ? '#ED4B9E'
      : severity === 2
      ? '#FFB237'
      : severity === 1
      ? '#253449'
      : '#31D0AA'};
`

export const StyledBalanceMaxMini = styled.button`
  height: 22px;
  width: 22px;
  background-color: #eefbff;
  border: none;
  border-radius: 50%;
  padding: 0.2rem;
  font-size: 0.875rem;
  font-weight: 400;
  margin-left: 0.4rem;
  cursor: pointer;
  color: #253449;
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;

  :hover {
    background-color: #eefbff;
  }
  :focus {
    background-color: #eefbff;
    outline: none;
  }
`

export const TruncatedText = styled(Text).attrs({ ellipsis: true })`
  width: 220px;
`

const SwapCallbackErrorInner = styled.div`
  background-color: #ED4B9E33;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.825rem;
  width: 100%;
  padding: 3rem 1.25rem 1rem 1rem;
  margin-top: -2rem;
  color: #ED4B9E;
  z-index: -1;
  p {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }
`

const SwapCallbackErrorInnerAlertTriangle = styled.div`
  background-color: #ED4B9E33;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 12px;
  min-width: 48px;
  height: 48px;
`

export function SwapCallbackError({ error }) {
  return (
    <SwapCallbackErrorInner>
      <SwapCallbackErrorInnerAlertTriangle>
        <ErrorIcon width="24px" />
      </SwapCallbackErrorInnerAlertTriangle>
      <p>{error}</p>
    </SwapCallbackErrorInner>
  )
}

export const SwapShowAcceptChanges = styled(AutoColumn)`
  background-color: #FFB23733;
  padding: 0.5rem;
  border-radius: 12px;
  margin-top: 8px;
`
