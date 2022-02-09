import { useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import { Text } from '@pancakeswap/uikit';

const Balance = ({
  value,
  color = '#253449',
  decimals = 3,
  isDisabled = false,
  unit = '',
  prefix = '',
  onClick,
  ...props
}) => {
  const previousValue = useRef(0);

  useEffect(() => {
    previousValue.current = value
  }, [value])
  return (
    <Text color="#253449" onClick={onClick} {...props}>
      <CountUp
        start={value}
        end={value}
        prefix={prefix}
        suffix={unit}
        decimals={decimals}
        duration={1}
        separator=","
      />
    </Text>
  )
}

export default Balance
