// @flow

import React from 'react'
import {observer} from 'mobx-react'
import LogStore from '../store'

type LogProps = {
  entries: Array<any>
}

const Log = observer(({entries}: LogProps) => {
  return (
    <ul>
      {LogStore.entries.map((entry, index) => {
        return (
          <li key={entry.id}>
            {entry.id}
            <br />
            {entry.expression}
            <br />
            {entry.result}({entry.type})
            <br />
            {entry.error}
          </li>
        )
      })}
    </ul>
  )
})

Log.displayName = 'Log'
export default Log
