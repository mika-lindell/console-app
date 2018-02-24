// @flow

import React from 'react'
import css from './CommandInput.css'

type CommandInputProps = {
  value: string,
  placeholder: string,
  onChange: SyntheticInputEvent => void,
  onKeyPress: SyntheticKeyboardEvent => void,
  onKeyDown: SyntheticKeyboardEvent => void,
  onFocus: SyntheticFocusEvent => void,
  onBlur: SyntheticFocusEvent => void
}

/** TODO
  Change this into stateful component and give it separate command history which won't have duplicates of same items
*/

const CommandInput = ({
  value,
  placeholder,
  onChange,
  onKeyPress,
  onKeyDown,
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
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </div>
  </div>
)

CommandInput.displayName = 'CommandInput'
export default CommandInput
