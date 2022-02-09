import React, { useState } from 'react'
import { Text, Flex, Checkbox, Button } from '@pancakeswap/uikit'

const Acknowledgement = ({ handleContinueClick }) => {
  const [isConfirmed, setIsConfirmed] = useState(false)

  return (
    <>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <Checkbox
            name="confirmed"
            type="checkbox"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
            scale="sm"
          />
          <Text color="#253449" ml="10px" style={{ userSelect: 'none' }}>
            I understand
          </Text>
        </Flex>

        <Button disabled={!isConfirmed} onClick={handleContinueClick}>
          Continue
        </Button>
      </Flex>
    </>
  )
}

export default Acknowledgement
