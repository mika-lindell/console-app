// @flow

import {observable, action} from 'mobx'
import type {CommandExpression} from './types'

class CommandStore {
  @observable history: Array<CommandExpression> = []

  @action
  addHistoryEntry = (entry: CommandExpression) => {
    this.history = [entry, ...this.history]
  }
}

export default new CommandStore()
