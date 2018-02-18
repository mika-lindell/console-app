// @flow

import React, {Component} from 'react'
import type {Node} from 'react'
// // import {observer} from 'mobx-react'
// import css from './Hello.css'
import sandboxStore from '../../sandbox/store'
import Sandbox from '../../sandbox/components/Sandbox'

type ConsoleProps = {}

// @observer
export class Console extends Component {
  props: ConsoleProps
  sandbox: Node
  handleButtonClick: (ev: SyntheticEvent) => void

  constructor(props: ConsoleProps) {
    super(props)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(ev: SyntheticEvent) {
    sandboxStore.evaluateJS('1===1', this.sandbox)
  }

  render() {
    return (
      <div>
        Console
        <button onClick={this.handleButtonClick}>Evaluate 1===1</button>
        <Sandbox iframeRef={node => (this.sandbox = node)} />
      </div>
    )
  }
}

Console.displayName = 'Console'
export default Console
