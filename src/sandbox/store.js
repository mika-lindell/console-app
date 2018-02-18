// @flow

import {action} from 'mobx'
import type {Ref} from 'react'

class SandboxStore {
  @action
  evaluateJS = (expression: string, sandbox: Ref<'iframe'>) => {
    const action = {
      type: 'evaluateJS',
      payload: {
        expression,
      },
    }
    sandbox.contentWindow.postMessage(action, '*')
    console.log('App seny an action to sandbox', action)
  }
}

export default new SandboxStore()
