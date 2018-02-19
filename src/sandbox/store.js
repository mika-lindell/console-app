// @flow

import {observable, action} from 'mobx'
import {ACTIONS} from './constants'
// $FlowFixMe
import type {Ref} from 'react'
import type {LogItem, CommandLineExpression} from './types'

class sandboxStore {
  @observable evaluateJsHistory: Array<LogItem> = []

  @action
  evaluateJsSend = (payload: CommandLineExpression, sandbox: Ref<'iframe'>) => {
    const action = {
      type: ACTIONS.evaluateJsSend,
      payload,
    }
    sandbox.contentWindow.postMessage(action, '*')
    console.log('App sent an action to sandbox', action)
  }

  @action
  evaluateJsResponse = (payload: LogItem) => {
    const emptyHistory = this.evaluateJsHistory.length === 0
    const lastIndex = this.evaluateJsHistory.length - 1
    const nextId = emptyHistory ? 0 : this.evaluateJsHistory[lastIndex].id + 1
    const newItem = {
      id: nextId,
      ...payload,
    }
    this.evaluateJsHistory = [...this.evaluateJsHistory, newItem]
  }
}

export default new sandboxStore()
