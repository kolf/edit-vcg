import React from 'react'
import {Spin} from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './FetchPlaceholder.css'

const FetchPlaceholder = ({text, loading}) => {
  return <div className={s.root}>
    {loading ? <Spin/> : text}
  </div>
}

export default withStyles(s)(FetchPlaceholder)
