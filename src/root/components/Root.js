// @flow

import React from 'react'
import Hello from '../../hello/components/Hello'
import css from './Root.css'

const Root = () => (
  <div className={css.component}>
    <div className={css.routes}>
      <Hello />
    </div>
  </div>
)

export default Root
