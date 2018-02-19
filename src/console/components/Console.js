// @flow

import React, {Component} from 'react'
import type {Node} from 'react'
import {observer} from 'mobx-react'
import sandboxStore from '../../sandbox/store'
import Sandbox from '../../sandbox/components/Sandbox'
import CommandInput from '../../commandInput/components/CommandInput'
import Log from '../../log/components/Log'
import css from './Console.css'

type ConsoleProps = {}
type ConsoleState = {
  commandValue: string,
  commandPlaceholder: string
}

const PLACEHOLDER = {
  focus: 'Type //help for available commands',
  blur: 'Press TAB to start',
}

@observer
class Console extends Component {
  props: ConsoleProps
  state: ConsoleState = {
    commandValue: '',
    commandPlaceholder: PLACEHOLDER.blur,
  }
  sandbox: Node
  handleButtonClick: SyntheticEvent => void
  handleCommandChange: SyntheticInputEvent => void
  handleCommandKeypress: SyntheticKeyboardEvent => void
  handleCommandFocus: SyntheticFocusEvent => void
  handleCommandBlur: SyntheticFocusEvent => void

  constructor(props: ConsoleProps) {
    super(props)
    this.handleCommandChange = this.handleCommandChange.bind(this)
    this.handleCommandKeypress = this.handleCommandKeypress.bind(this)
    this.handleCommandFocus = this.handleCommandFocus.bind(this)
    this.handleCommandBlur = this.handleCommandBlur.bind(this)
  }

  handleCommandChange(ev: SyntheticInputEvent) {
    this.setState({
      commandValue: ev.target.value,
    })
  }

  handleCommandKeypress(ev: SyntheticKeyboardEvent) {
    if (ev.key === 'Enter' && this.state.commandValue) {
      sandboxStore.evaluateJsSend(
        {
          expression: this.state.commandValue,
        },
        this.sandbox
      )
      this.setState({
        commandValue: '',
      })
    }
  }

  handleCommandFocus() {
    this.setState({
      commandPlaceholder: PLACEHOLDER.focus,
    })
  }

  handleCommandBlur() {
    this.setState({
      commandPlaceholder: PLACEHOLDER.blur,
    })
  }

  render() {
    const {commandValue, commandPlaceholder} = this.state
    return (
      <div className={css.wrapper}>
        <Log />
        <CommandInput
          value={commandValue}
          placeholder={commandPlaceholder}
          onChange={this.handleCommandChange}
          onKeyPress={this.handleCommandKeypress}
          onFocus={this.handleCommandFocus}
          onBlur={this.handleCommandBlur}
        />
        <Sandbox iframeRef={node => (this.sandbox = node)} />
      </div>
    )
  }
}

Console.displayName = 'Console'
export default Console
