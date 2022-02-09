import styled from 'styled-components'
import { Box } from '@pancakeswap/uikit'

const Card = styled(Box)`
  width: ${({ width }) => width ?? '100%'};
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: #eefbff;
`
export default Card

export const LightGreyCard = styled(Card)`
  border: 1px solid #E7E3EB;
  background-color: #eefbff;
`

export const GreyCard = styled(Card)`
  background-color: #eefbff;
`
