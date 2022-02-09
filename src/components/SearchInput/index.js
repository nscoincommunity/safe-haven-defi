import React, { useState, useMemo } from 'react';
import { Input } from '@pancakeswap/uikit';
import debounce from 'lodash/debounce';
import './searchinput.scss';

const SearchInput = ({ onChange: onChangeCallback, placeholder = 'Search' }) => {
  const [searchText, setSearchText] = useState('')

  const debouncedOnChange = useMemo(
    () => debounce((e) => onChangeCallback(e), 500),
    [onChangeCallback],
  )

  const onChange = (e) => {
    setSearchText(e.target.value)
    debouncedOnChange(e)
  }

  return (
    <div className='input-wrapper'>
      <Input className='styled-input' value={searchText} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}

export default SearchInput
