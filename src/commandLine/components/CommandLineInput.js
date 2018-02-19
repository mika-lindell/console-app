// @flow

import React from 'react'
import css from './CommandLineInput.css'

type CommandLineProps = {
  value: string,
  onChange: Function,
  onKeyPress: Function
}

const CommandLineInput = ({value, onChange, onKeyPress}: CommandLineProps) => (
  <div className={css.wrapper}>
    <div className={css.marker}>&gt;</div>
    <div className={css.inputWrapper}>
      <input
        className={css.input}
        onChange={onChange}
        onKeyPress={onKeyPress}
        value={value}
        autoFocus
      />
    </div>
  </div>
)

CommandLineInput.displayName = 'CommandLineInput'
export default CommandLineInput
