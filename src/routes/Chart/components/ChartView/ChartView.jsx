import React from 'react'
import ShotChart from '../../../../components/ShotChart'
import SidePanel from '../../../../layouts/SidePanel'

export const ChartView = (props) => {
    return (
      <div>
          <div className='col-md-4'>
              <SidePanel playerID={props.playerID} playerSelect={props.playerSelect} />
          </div>
          <div className='col-md-8'>
              <ShotChart playerID={props.playerID} playerName={props.playerName} year={props.year} />
          </div>
      </div>
    )
}

export default ChartView