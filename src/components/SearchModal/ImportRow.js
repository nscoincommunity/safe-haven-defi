import { Button, Text, CheckmarkCircleIcon } from '@pancakeswap/uikit'
import { AutoRow, RowFixed } from '../Layout/Row'
import { AutoColumn } from '../Layout/Column'
import CurrencyLogo from '../Logo/CurrencyLogo'
import { ListLogo } from '../Logo'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useCombinedInactiveList } from '../../store/slices/lists-slice/hooks'
import styled from 'styled-components'
import { useIsUserAddedToken, useIsTokenActive } from '../../hooks/Tokens'

const TokenSection = styled.div`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto;
  grid-gap: 16px;
  align-items: center;

  opacity: ${({ dim }) => (dim ? '0.4' : '1')};
`

const CheckIcon = styled(CheckmarkCircleIcon)`
  height: 16px;
  width: 16px;
  margin-right: 6px;
  stroke: #31D0AA;
`

const NameOverflow = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
  font-size: 12px;
`

export default function ImportRow({
  token,
  style,
  dim,
  showImportView,
  setImportToken,
}) {
  // globals
  const { chainId } = useActiveWeb3React()

  // check if token comes from list
  const inactiveTokenList = useCombinedInactiveList()
  const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list

  // check if already active on list or local storage tokens
  const isAdded = useIsUserAddedToken(token)
  const isActive = useIsTokenActive(token)

  return (
    <TokenSection style={style}>
      <CurrencyLogo currency={token} size="24px" style={{ opacity: dim ? '0.6' : '1' }} />
      <AutoColumn gap="4px" style={{ opacity: dim ? '0.6' : '1' }}>
        <AutoRow>
          <Text color="#253449">{token.symbol}</Text>
          <Text color="#BDC2C4" ml="8px">
            <NameOverflow title={token.name}>{token.name}</NameOverflow>
          </Text>
        </AutoRow>
        {list && list.logoURI && (
          <RowFixed>
            <Text small mr="4px" color="#253449">
              via {list.name}
            </Text>
            <ListLogo logoURI={list.logoURI} size="12px" />
          </RowFixed>
        )}
      </AutoColumn>
      {!isActive && !isAdded ? (
        <Button
          width="fit-content"
          onClick={() => {
            if (setImportToken) {
              setImportToken(token)
            }
            showImportView()
          }}
        >
          Import
        </Button>
      ) : (
        <RowFixed style={{ minWidth: 'fit-content' }}>
          <CheckIcon />
          <Text color="#31D0AA">Active</Text>
        </RowFixed>
      )}
    </TokenSection>
  )
}
