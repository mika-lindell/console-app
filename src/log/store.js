// @flow

import {observable, action} from 'mobx'
import {ACTIONS} from './constants'
// $FlowFixMe
import type {Ref} from 'react'
import type {LogEntry} from './types'
import type {CommandLineExpression} from '../commandLine/types'

class LogStore {
  @observable entries: Array<LogEntry> = []

  @action
  addEntry = (entry: LogEntry) => {
    const emptyHistory = this.entries.length === 0
    const lastIndex = this.entries.length - 1
    const nextId = emptyHistory ? 0 : this.entries[lastIndex].id + 1
    const newItem = {
      id: nextId,
      ...payload,
    }
    this.entries = [...this.entries, newItem]
  }
}

export default new LogStore()
