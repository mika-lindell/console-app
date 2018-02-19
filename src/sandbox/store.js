// @flow

import {observable, action} from 'mobx'
import {ACTIONS} from './constants'
import LogStore from '../log/store'
// $FlowFixMe
import type {Ref} from 'react'
import type {LogEntry} from '../log/types'
import type {CommandLineExpression} from '../commandLine/types'

class sandboxStore {
  @observable evaluateJsHistory: Array<LogEntry> = []

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
  evaluateJsResponse = (payload: LogEntry) => {
    LogStore.addEntry(payload)
  }
}

export default new sandboxStore()
