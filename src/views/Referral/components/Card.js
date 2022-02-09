import React from 'react'
import styled from 'styled-components'
import { Text, Skeleton } from '@pancakeswap/uikit'
import Divider from './Divider'

const StyledCard = styled.div`
    width: 100%;
    background-color: #eefbff;
    padding: 40px;
    border-radius: 32px;
    width: 100%;
    margin-bottom: 24px;
    ${({ theme }) => theme.mediaQueries.md} {
        width: 48%;
        margin-bottom: 0;
    }
`

const Title = styled(Text)`
    margin-bottom: 24px;
    font-size: 22px;
    font-weight: bold;
`

const Value = styled(Text)`
    font-size: 18px;
    font-weight: 22px;
`

const Card = ({title, value}) => {
    return (
        <StyledCard>
            <Title color='#253449'>{title}</Title>
            <Divider />
            <Value color='#253449cc'>
                {value || value === 0 ? value : (<Skeleton width={100} />)}
            </Value>
        </StyledCard>
    )
}

export default Card;