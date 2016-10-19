import React from 'react'
import './SidePanel.scss'
import playerData from '../../static/player-data'
import PlayerDropdown from '../../components/PlayerDropdown'

export const SidePanel = (props) => {
    return (
      <div>
        <h1>Data Hoops</h1>
        <PlayerDropdown data={playerData} playerID={props.playerID} playerName={props.name} playerSelect={props.playerSelect}/>
      </div>
    )
}

export default SidePanel
