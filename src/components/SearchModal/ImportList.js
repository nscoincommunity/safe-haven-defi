import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button, Text, Link, Flex, Checkbox, Message } from '@pancakeswap/uikit'
import Card from '../Card'
import { AutoColumn } from '../Layout/Column'
import { RowBetween, RowFixed } from '../Layout/Row'
import { ListLogo } from '../Logo'
import { useDispatch } from 'react-redux'
import useFetchListCallback from '../../hooks/useFetchListCallback'
import { removeList, enableList } from '../../store/slices/lists-slice/actions'
import { useAllLists } from '../../store/slices/lists-slice/hooks'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const TextDot = styled.div`
  height: 3px;
  width: 3px;
  background-color: #253449;
  border-radius: 50%;
`

function ImportList({ listURL, list, onImport }) {
  const dispatch = useDispatch()

  // user must accept
  const [confirmed, setConfirmed] = useState(false)

  const lists = useAllLists()
  const fetchList = useFetchListCallback()

  // monitor is list is loading
  const adding = Boolean(lists[listURL]?.loadingRequestId)
  const [addError, setAddError] = useState(null)

  const handleAddList = useCallback(() => {
    if (adding) return
    setAddError(null)
    fetchList(listURL)
      .then(() => {
        dispatch(enableList(listURL))
        onImport()
      })
      .catch((error) => {
        setAddError(error.message)
        dispatch(removeList(listURL))
      })
  }, [adding, dispatch, fetchList, listURL, onImport])

  return (
    <Wrapper>
      <AutoColumn gap="md">
        <AutoColumn gap="md">
          <Card padding="12px 20px">
            <RowBetween>
              <RowFixed>
                {list.logoURI && <ListLogo logoURI={list.logoURI} size="40px" />}
                <AutoColumn gap="sm" style={{ marginLeft: '20px' }}>
                  <RowFixed>
                    <Text color="#253449" bold mr="6px">
                      {list.name}
                    </Text>
                    <TextDot />
                    <Text small color="#253449" ml="6px">
                      {list.tokens.length} tokens
                    </Text>
                  </RowFixed>
                  <Link
                    small
                    external
                    ellipsis
                    maxWidth="90%"
                    href={`https://tokenlists.org/token-list?url=${listURL}`}
                  >
                    {listURL}
                  </Link>
                </AutoColumn>
              </RowFixed>
            </RowBetween>
          </Card>

          <Message variant="danger">
            <Flex flexDirection="column">
              <Text color="#253449" fontSize="20px" textAlign="center" mb="16px">
                Import at your own risk
              </Text>
              <Text color="#253449" mb="8px">
                  By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.
              </Text>
              <Text color="#253449" bold mb="16px">
                {typeof 'If you purchase a token from this list, you may not be able to sell it back.'}
              </Text>
              <Flex alignItems="center">
                <Checkbox
                  name="confirmed"
                  type="checkbox"
                  checked={confirmed}
                  onChange={() => setConfirmed(!confirmed)}
                  scale="sm"
                />
                <Text color="#253449" ml="10px" style={{ userSelect: 'none' }}>
                  I understand
                </Text>
              </Flex>
            </Flex>
          </Message>

          <Button disabled={!confirmed} onClick={handleAddList}>
            Import
          </Button>
          {addError ? (
            <Text color="#ED4B9E" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {addError}
            </Text>
          ) : null}
        </AutoColumn>
      </AutoColumn>
    </Wrapper>
  )
}

export default ImportList
