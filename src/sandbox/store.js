// @flow

import {action} from 'mobx'
import type {Ref} from 'react'

class SandboxStore {
  @action
  evaluateJS = (expression: string, sandbox: Ref<'iframe'>) => {
    const message = {
      action: 'evaluateJS',
      expression: expression,
    }
    sandbox.contentWindow.postMessage(message, '*')
  }
}

export default new SandboxStore()
