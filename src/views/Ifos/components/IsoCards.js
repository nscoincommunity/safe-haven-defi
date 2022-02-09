import styled from 'styled-components'

const IsoCardWrapper = styled.div`
  border-top: 2px solid #1FC7D4;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  padding-bottom: 40px;
  padding-top: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`

export default IsoCardWrapper
