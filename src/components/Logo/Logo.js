import { useState } from 'react'
import { HelpIcon } from '@pancakeswap/uikit'

const BAD_SRCS = [];
const Logo = ({ srcs, alt, ...rest }) => {
  const [, refresh] = useState(0)

  const src = srcs.find((s) => !BAD_SRCS[s])

  if (src) {
    return (
      <img
        {...rest}
        alt={alt}
        src={src}
        onError={() => {
          if (src) BAD_SRCS[src] = true
          refresh((i) => i + 1)
        }}
      />
    )
  }

  return <HelpIcon color="#3142d0" {...rest} />
}

export default Logo
