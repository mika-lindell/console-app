// @flow

import {observable, action} from 'mobx'
import {ACTIONS} from './constants'
import LogStore from '../log/store'
import CommandStore from '../commandInput/store'
// $FlowFixMe
import type {Ref} from 'react'
import type {LogEntry} from '../log/types'
import type {CommandExpression} from '../commandInput/types'

class SandboxStore {
  @observable evaluateJsHistory: Array<LogEntry> = []

  // Send expression for sandbox to be evaluated
  @action
  evaluateJsSend = (payload: CommandExpression, sandbox: Ref<'iframe'>) => {
    const action = {
      type: ACTIONS.evaluateJsSend,
      payload,
    }
    sandbox.contentWindow.postMessage(action, '*')
    console.log('App sent an action to sandbox', action)
  }

  // We received response about expression we sent to sandbox
  @action
  evaluateJsResponse = (payload: LogEntry) => {
    LogStore.addEntry(payload)
    CommandStore.addHistoryEntry({expression: payload.expression})
  }
}

export default new SandboxStore()
