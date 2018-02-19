// @flow

import React from 'react'

type LogProps = {
  items: Array<any>
}

const Log = ({items}: LogProps) => {
  return (
    <ul>
      {items.map((item, index) => {
        return (
          <li key={item.id}>
            {item.id}
            <br />
            {item.expression}
            <br />
            {item.result}({item.type})
            <br />
            {item.error}
          </li>
        )
      })}
    </ul>
  )
}

Log.displayName = 'Log'
export default Log
