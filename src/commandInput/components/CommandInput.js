// @flow

import React from 'react'
import css from './CommandInput.css'

type CommandInputProps = {
  value: string,
  placeholder: string,
  onChange: SyntheticInputEvent => void,
  onKeyPress: SyntheticKeyboardEvent => void,
  onFocus: SyntheticFocusEvent => void,
  onBlur: SyntheticFocusEvent => void
}

const CommandInput = ({
  value,
  placeholder,
  onChange,
  onKeyPress,
  onFocus,
  onBlur,
}: CommandInputProps) => (
  <div className={css.wrapper}>
    <div className={css.marker}>&gt;</div>
    <div className={css.inputWrapper}>
      <input
        className={css.input}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus
      />
    </div>
  </div>
)

CommandInput.displayName = 'CommandInput'
export default CommandInput
