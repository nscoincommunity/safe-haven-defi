import { useRef, useCallback, useState, useMemo } from 'react'
import { Text, Button, CloseIcon, IconButton, LinkExternal, Input, Link } from '@pancakeswap/uikit'
import styled from 'styled-components'
import Row, { RowBetween, RowFixed } from '../Layout/Row'
import { useToken } from '../../hooks/Tokens'
import { useRemoveUserAddedToken } from '../../store/slices/user-slice/hooks'
import useUserAddedTokens from '../../store/slices/user-slice/hooks/useUserAddedTokens'
import { CurrencyLogo } from '../Logo'
import { getBscScanLink, isAddress } from '../../utils'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import Column, { AutoColumn } from '../Layout/Column'
import ImportRow from './ImportRow'
import { CurrencyModalView } from './types'

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  padding-bottom: 60px;
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default function ManageTokens({
  setModalView,
  setImportToken,
}) {
  const { chainId } = useActiveWeb3React()

  const [searchQuery, setSearchQuery] = useState('')

  // manage focus on modal show
  const inputRef = useRef()
  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }, [])

  // if they input an address, use it
  const searchToken = useToken(searchQuery)

  // all tokens for local list
  const userAddedTokens = useUserAddedTokens()
  const removeToken = useRemoveUserAddedToken()

  const handleRemoveAll = useCallback(() => {
    if (chainId && userAddedTokens) {
      userAddedTokens.map((token) => {
        return removeToken(chainId, token.address)
      })
    }
  }, [removeToken, userAddedTokens, chainId])

  const tokenList = useMemo(() => {
    return (
      chainId &&
      userAddedTokens.map((token) => (
        <RowBetween key={token.address} width="100%">
          <RowFixed>
            <CurrencyLogo currency={token} size="20px" />
            <Link external href={getBscScanLink(token.address, 'address', chainId)} color="#253449" ml="10px">
              {token.symbol}
            </Link>
          </RowFixed>
          <RowFixed>
            <IconButton variant="text" onClick={() => removeToken(chainId, token.address)}>
              <CloseIcon />
            </IconButton>
            <LinkExternal href={getBscScanLink(token.address, 'address', chainId)} />
          </RowFixed>
        </RowBetween>
      ))
    )
  }, [userAddedTokens, chainId, removeToken])

  const isAddressValid = searchQuery === '' || isAddress(searchQuery)

  return (
    <Wrapper>
      <Column style={{ width: '100%', flex: '1 1' }}>
        <AutoColumn gap="14px">
          <Row>
            <Input
              id="token-search-input"
              style={{ margin: '0 4px'}}
              scale="lg"
              placeholder="0x0000"
              value={searchQuery}
              autoComplete="off"
              ref={inputRef}
              onChange={handleInput}
              isWarning={!isAddressValid}
            />
          </Row>
          {!isAddressValid && <Text color="#ED4B9E">Enter valid token address</Text>}
          {searchToken && (
            <ImportRow
              token={searchToken}
              showImportView={() => setModalView(CurrencyModalView.importToken)}
              setImportToken={setImportToken}
              style={{ height: 'fit-content' }}
            />
          )}
        </AutoColumn>
        {tokenList}
        <Footer>
          <Text bold color="#253449">
            {userAddedTokens?.length} {userAddedTokens.length === 1 ? 'Custom Token' : 'Custom Tokens'}
          </Text>
          {userAddedTokens.length > 0 && (
            <Button variant="tertiary" onClick={handleRemoveAll}>
              Clear all
            </Button>
          )}
        </Footer>
      </Column>
    </Wrapper>
  )
}
