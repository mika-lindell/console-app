// @flow

import React from 'react'
import css from './CommandLine.css'

type CommandLineProps = {
  value: string,
  onChange: Function,
  onKeyPress: Function
}

const CommandLine = ({value, onChange, onKeyPress}: CommandLineProps) => (
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

CommandLine.displayName = 'CommandLine'
export default CommandLine
