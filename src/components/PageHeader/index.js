import { Box } from '@pancakeswap/uikit'
import Container from '../Layout/Container'
import './pageheader.scss'

const PageHeader = ({ background, children, ...props }) => (
  <Box className='outer' {...props} style={{ backgroundImage: `url(${background})` }}>
    <Container className="inner">{children}</Container>
  </Box>
)

export default PageHeader
