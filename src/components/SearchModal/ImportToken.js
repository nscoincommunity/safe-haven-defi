import { useState } from 'react'
import { Button, Text, ErrorIcon, Flex, Message, Checkbox, Link, Tag, Grid } from '@pancakeswap/uikit'
import { AutoColumn } from '../Layout/Column'
import { useAddUserToken } from '../../store/slices/user-slice/hooks'
import { getBscScanLink } from '../../utils'
import truncateHash from '../../utils/truncateHash'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useCombinedInactiveList } from '../../store/slices/lists-slice/hooks'
import { ListLogo } from '../Logo'

function ImportToken({ tokens, handleCurrencySelect }) {
  const { chainId } = useActiveWeb3React()

  const [confirmed, setConfirmed] = useState(false)

  const addToken = useAddUserToken()

  // use for showing import source on inactive tokens
  const inactiveTokenList = useCombinedInactiveList()

  return (
    <AutoColumn gap="lg">
      <Message variant="warning">
        <Text color='#253449'>
            Anyone can create a BEP20 token on BSC with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.
          <br />
          <br />
          If you purchase an arbitrary token, you may be unable to sell it back.
        </Text>
      </Message>

      {tokens.map((token) => {
        const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list
        const address = token.address ? `${truncateHash(token.address)}` : null
        return (
          <Grid key={token.address} gridTemplateRows="1fr 1fr 1fr" gridGap="4px">
            {list !== undefined ? (
              <Tag
                variant="success"
                outline
                scale="sm"
                startIcon={list.logoURI && <ListLogo logoURI={list.logoURI} size="12px" />}
              >
                via {list.name}
              </Tag>
            ) : (
              <Tag variant="failure" outline scale="sm" startIcon={<ErrorIcon color="#ED4B9E" />}>
                Unknown Source
              </Tag>
            )}
            <Flex alignItems="center">
              <Text color="#253449" mr="8px">{token.name}</Text>
              <Text color="#253449">({token.symbol})</Text>
            </Flex>
            {chainId && (
              <Flex justifyContent="space-between" width="100%">
                <Text color="#253449" mr="4px">{address}</Text>
                <Link href={getBscScanLink(token.address, 'address', chainId)} external>
                  (View on BscScan)
                </Link>
              </Flex>
            )}
          </Grid>
        )
      })}

      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" onClick={() => setConfirmed(!confirmed)}>
          <Checkbox
            scale="sm"
            name="confirmed"
            type="checkbox"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
          />
          <Text color="#253449" ml="8px" style={{ userSelect: 'none' }}>
            I understand
          </Text>
        </Flex>
        <Button
          variant="danger"
          disabled={!confirmed}
          onClick={() => {
            tokens.map((token) => addToken(token))
            if (handleCurrencySelect) {
              handleCurrencySelect(tokens[0])
            }
          }}
          className=".token-dismiss-button"
        >
          Import
        </Button>
      </Flex>
    </AutoColumn>
  )
}

export default ImportToken
