// @flow

import React, {Component} from 'react'
import type {Node} from 'react'
import {observer} from 'mobx-react'
import sandboxStore from '../../sandbox/store'
import Sandbox from '../../sandbox/components/Sandbox'
import CommandLineInput from '../../commandLine/components/CommandLineInput'
import Log from '../../log/components/Log'
import css from './Console.css'

type ConsoleProps = {}
type ConsoleState = {
  commandLineValue: string
}

@observer
class Console extends Component {
  props: ConsoleProps
  state: ConsoleState = {
    commandLineValue: '',
  }
  sandbox: Node
  handleButtonClick: (ev: SyntheticEvent) => void
  handleCommandLineChange: (ev: SyntheticInputEvent) => void
  handleCommandLineKeypress: (ev: SyntheticKeyboardEvent) => void

  constructor(props: ConsoleProps) {
    super(props)
    this.handleCommandLineChange = this.handleCommandLineChange.bind(this)
    this.handleCommandLineKeypress = this.handleCommandLineKeypress.bind(this)
  }

  handleCommandLineChange(ev: SyntheticInputEvent) {
    this.setState({
      commandLineValue: ev.target.value,
    })
  }

  handleCommandLineKeypress(ev: SyntheticKeyboardEvent) {
    if (ev.key === 'Enter' && this.state.commandLineValue) {
      sandboxStore.evaluateJsSend(
        {
          expression: this.state.commandLineValue,
        },
        this.sandbox
      )
      this.setState({
        commandLineValue: '',
      })
    }
  }

  render() {
    const {commandLineValue} = this.state
    return (
      <div className={css.wrapper}>
        <Log />
        <CommandLineInput
          onChange={this.handleCommandLineChange}
          onKeyPress={this.handleCommandLineKeypress}
          value={commandLineValue}
        />
        <Sandbox iframeRef={node => (this.sandbox = node)} />
      </div>
    )
  }
}

Console.displayName = 'Console'
export default Console
