import React from 'react'
import SidePanel from '../SidePanel'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = (props) => (
    <div className='core-layout__viewport'>
        {props.children}
    </div>
)

export default CoreLayout
