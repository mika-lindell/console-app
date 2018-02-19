// @flow

import React, {PureComponent} from 'react'
import {observer} from 'mobx-react'
import sandboxStore from '../store'
import {ACTIONS} from '../constants'
// $FlowFixMe
import type {Ref} from 'react'

type SandboxProps = {
  iframeRef: (Ref<'iframe'>) => void
}

@observer
class Sandbox extends PureComponent {
  props: SandboxProps
  messageListener: EventListener
  handleMessage: (ev: MessageEvent) => void

  constructor(props: SandboxProps) {
    super(props)
    this.handleMessage = this.handleMessage.bind(this)
  }

  componentWillMount() {
    // This will enable us to listen responses from sandbox
    window.addEventListener('message', this.handleMessage)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage)
  }

  handleMessage(ev: MessageEvent) {
    console.log('App received an action from sandbox', ev.data)
    // $FlowFixMe
    const {type, payload} = ev.data
    switch (type) {
      case ACTIONS.evaluateJsResponse:
        sandboxStore.evaluateJsResponse(payload)
        break
      default:
    }
  }

  render() {
    const {iframeRef} = this.props
    return (
      <iframe
        ref={iframeRef}
        title="Sandbox"
        src="sandbox.html"
        style={{display: 'none'}}
      />
    )
  }
}

Sandbox.displayName = 'Sandbox'
export default Sandbox
