// @flow

import React, {Component} from 'react'
import type {Node} from 'react'
import {observer} from 'mobx-react'
import SandboxStore from '../../sandbox/store'
import Sandbox from '../../sandbox/components/Sandbox'
import CommandStore from '../../commandInput/store'
import CommandInput from '../../commandInput/components/CommandInput'
import Log from '../../log/components/Log'
import LogStore from '../../log/store'
import css from './Console.css'

type ConsoleProps = {}
type ConsoleState = {
  commandValue: string,
  commandPlaceholder: string,
  commandHistoryIndex: number
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
    commandHistoryIndex: -1,
  }
  sandbox: Node
  handleButtonClick: SyntheticEvent => void
  handleCommandChange: SyntheticInputEvent => void
  handleCommandKeypress: SyntheticKeyboardEvent => void
  handleCommandKeydown: SyntheticKeyboardEvent => void
  handleCommandFocus: SyntheticFocusEvent => void
  handleCommandBlur: SyntheticFocusEvent => void

  constructor(props: ConsoleProps) {
    super(props)
    this.handleCommandChange = this.handleCommandChange.bind(this)
    this.handleCommandKeypress = this.handleCommandKeypress.bind(this)
    this.handleCommandKeydown = this.handleCommandKeydown.bind(this)
    this.handleCommandFocus = this.handleCommandFocus.bind(this)
    this.handleCommandBlur = this.handleCommandBlur.bind(this)
  }

  handleCommandChange(ev: SyntheticInputEvent) {
    this.setState({
      commandValue: ev.target.value,
      commandHistoryIndex: -1,
    })
  }

  handleCommandKeypress(ev: SyntheticKeyboardEvent) {
    if (ev.key === 'Enter' && this.state.commandValue) {
      SandboxStore.evaluateJsSend(
        {
          expression: this.state.commandValue,
        },
        this.sandbox
      )
      this.setState({
        commandValue: '',
        commandHistoryIndex: -1,
      })
    }
  }

  handleCommandKeydown(ev: SyntheticKeyboardEvent) {
    const arrowUpActive = ev.key === 'ArrowUp'
    const arrowDownActive = ev.key === 'ArrowDown'

    if (arrowUpActive || arrowDownActive) {
      const {commandHistoryIndex} = this.state
      const commandHistoryLastIndex = LogStore.entries.length - 1
      let nextCommandHistoryIndex = -1

      // Add one to current history index if upArrow is down
      if (arrowUpActive) {
        nextCommandHistoryIndex = commandHistoryIndex + 1
      }
      // Substract one from current history index if downArrow is down
      if (arrowDownActive) {
        nextCommandHistoryIndex = commandHistoryIndex - 1
      }
      // Make sure we wont go below -1, which equals no value from history
      // should be displayed
      if (nextCommandHistoryIndex === -2) {
        nextCommandHistoryIndex = -1
      }
      // Make sure we won't go above last item in history
      if (nextCommandHistoryIndex === commandHistoryLastIndex + 1) {
        nextCommandHistoryIndex = commandHistoryLastIndex
      }
      this.setState({
        commandValue:
          nextCommandHistoryIndex === -1
            ? ''
            : CommandStore.history[nextCommandHistoryIndex].expression,
        commandHistoryIndex: nextCommandHistoryIndex,
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
          onKeyDown={this.handleCommandKeydown}
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
