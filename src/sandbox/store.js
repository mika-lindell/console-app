// @flow

import {observable, action} from 'mobx'
import {ACTIONS} from './constants'
// $FlowFixMe
import type {Ref} from 'react'
import type {sandboxResponse, sandboxExpression} from './types'

class sandboxStore {
  @observable evaluateJsHistory: Array<sandboxResponse> = []

  @action
  evaluateJsSend = (payload: sandboxExpression, sandbox: Ref<'iframe'>) => {
    const action = {
      type: ACTIONS.evaluateJsSend,
      payload,
    }
    sandbox.contentWindow.postMessage(action, '*')
    console.log('App sent an action to sandbox', action)
  }

  @action
  evaluateJsResponse = (payload: sandboxResponse) => {
    this.evaluateJsHistory = [...this.evaluateJsHistory, payload]
  }
}

export default new sandboxStore()
