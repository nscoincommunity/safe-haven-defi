import { useState } from 'react'
import { ButtonMenu, ButtonMenuItem, ModalBody } from '@pancakeswap/uikit'
import styled from 'styled-components'
import ManageLists from './ManageLists'
import ManageTokens from './ManageTokens'

const StyledButtonMenu = styled(ButtonMenu)`
  width: 100%;
`

export default function Manage({
  setModalView,
  setImportList,
  setImportToken,
  setListUrl,
}) {
  const [showLists, setShowLists] = useState(true)

  return (
    <ModalBody>
      <StyledButtonMenu
        activeIndex={showLists ? 0 : 1}
        onItemClick={() => setShowLists((prev) => !prev)}
        scale="sm"
        variant="primary"
        mb="32px"
      >
        <ButtonMenuItem width="50%">Lists</ButtonMenuItem>
        <ButtonMenuItem width="50%">Tokens</ButtonMenuItem>
      </StyledButtonMenu>
      {showLists ? (
        <ManageLists setModalView={setModalView} setImportList={setImportList} setListUrl={setListUrl} />
      ) : (
        <ManageTokens setModalView={setModalView} setImportToken={setImportToken} />
      )}
    </ModalBody>
  )
}
