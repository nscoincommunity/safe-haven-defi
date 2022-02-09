import { Toggle } from '@pancakeswap/uikit'
import styled from 'styled-components'

const ToggleBar = styled(Toggle)`
    background: red;
    input:hover + div:not(:disabled):not(:checked) {
        background: green;
        box-shadow: 0px 0px 0px 1px #1fc7d4, 0px 0px 0px 4px #1fc7d499!important;
    }
    input:focus + div {
        box-shadow: 0px 0px 0px 1px #1fc7d4, 0px 0px 0px 4px #1fc7d499!important;
    }
`

export default ToggleBar
