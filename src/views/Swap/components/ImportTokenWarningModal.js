import React from 'react'
import { Modal } from '@pancakeswap/uikit'
import ImportToken from '../../../components/SearchModal/ImportToken'

const ImportTokenWarningModal = ({ tokens, onDismiss, onCancel }) => {
  return (
    <Modal
      title={'Import Token'}
      onDismiss={() => {
        if (onDismiss) {
          onDismiss()
        }
        onCancel()
      }}
      style={{ maxWidth: '420px' }}
    >
      <ImportToken tokens={tokens} handleCurrencySelect={onDismiss} />
    </Modal>
  )
}

export default ImportTokenWarningModal
