import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Text, Flex } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ConnectWalletButton from '../../../components/ConnectWalletButton'
import Divider from './Divider'

const StyledCard = styled.div`
    width: 100%;
    background-color: #eefbff;
    padding: 40px;
    border-radius: 32px;
    width: 100%;
`

const Title = styled(Text)`
    margin-bottom: 24px;
    font-size: 22px;
    font-weight: 600;
`

const LinkText = styled(Text)`
    font-size: 16px;
    font-weight: 600;
    word-break: break-all;
`

const CopyButton = styled.button`
    font-size: 16px;
    font-weight: 600;
    outline: none;
    border: none;
    cursor: pointer;
    color: #253449cc;
    background-color: transparent;
`

const LinkCard = ({title, link}) => {
    const { account } = useWeb3React()
    const [copySuccess, setCopySuccess] = useState(false);
    const copyTextRef = useRef(null);

    return (
        <StyledCard>
            {account ? (
                <>
                    <Title color='#253449' textAlign="center">{title}</Title>
                    <Flex justifyContent="center">
                    <CopyToClipboard text={link} onCopy={() => setCopySuccess(true)}>
                        <CopyButton>{copySuccess ? `Copied` : `Copy to clipboard`}</CopyButton>
                    </CopyToClipboard>
                    </Flex>
                    <Divider />
                    <LinkText ref={copyTextRef} color='#253449cc' textAlign="center">{link}</LinkText>
                </>
            ): (
                <Flex justifyContent="center">
                    <ConnectWalletButton />
                </Flex>
            )}
            
        </StyledCard>
    )
}

export default LinkCard;