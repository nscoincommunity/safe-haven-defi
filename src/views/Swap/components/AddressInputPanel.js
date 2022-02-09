import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Text, Link } from '@pancakeswap/uikit'
import useENS from '../../../hooks/ENS/useENS'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { AutoColumn } from '../../../components/Layout/Column'
import { RowBetween } from '../../../components/Layout/Row'
import { getBscScanLink } from '../../../utils'

const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 1.25rem;
  background-color: #FFFFFF;
  z-index: 1;
  width: 100%;
`

const ContainerRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid ${({ error, theme }) => (error ? '#ED4B9E' : '#eefbff')};
  transition: border-color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')},
    color 500ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  background-color: #FFFFFF;
`

const InputContainer = styled.div`
  flex: 1;
  padding: 1rem;
`

const Input = styled.input`
  font-size: 1.25rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: #FFFFFF;
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error }) => (error ? '#ED4B9E' : '#1FC7D4')};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  ::placeholder {
    color: #BDC2C4;
  }
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: #BDC2C4;
  }
`

export default function AddressInputPanel({ id, value, onChange }) {
  const { chainId } = useActiveWeb3React()

  const { address, loading, name } = useENS(value)

  const handleInput = useCallback(
    (event) => {
      const input = event.target.value
      const withoutSpaces = input.replace(/\s+/g, '')
      onChange(withoutSpaces)
    },
    [onChange],
  )

  const error = Boolean(value.length > 0 && !loading && !address)

  return (
    <InputPanel id={id}>
      <ContainerRow error={error}>
        <InputContainer>
          <AutoColumn gap="md">
            <RowBetween>
              <Text color="#253449">Recipient</Text>
              {address && chainId && (
                <Link external small href={getBscScanLink(name ?? address, 'address', chainId)}>
                  (View on BscScan)
                </Link>
              )}
            </RowBetween>
            <Input
              className="recipient-address-input"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder={'Wallet Address or ENS name'}
              error={error}
              pattern="^(0x[a-fA-F0-9]{40})$"
              onChange={handleInput}
              value={value}
            />
          </AutoColumn>
        </InputContainer>
      </ContainerRow>
    </InputPanel>
  )
}
