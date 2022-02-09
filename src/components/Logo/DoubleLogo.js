import styled from 'styled-components'
import CurrencyLogo from './CurrencyLogo'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: ${({ margin }) => margin && '4px'};
`

export default function DoubleCurrencyLogo({
  currency0,
  currency1,
  size = 20,
  margin = false,
}) {
  return (
    <Wrapper margin={margin}>
      {currency0 && <CurrencyLogo currency={currency0} size={`${size.toString()}px`} style={{ marginRight: '4px' }} />}
      {currency1 && <CurrencyLogo currency={currency1} size={`${size.toString()}px`} />}
    </Wrapper>
  )
}
