import React from 'react'
import './SidePanel.scss'
import playerData from '../../static/player-data'
import PlayerDropdown from '../../components/PlayerDropdown'
import YearDropdown from '../../components/YearDropdown'

export const SidePanel = (props) => {
    return (
      <div>
        <h1>Data Hoops</h1>
        <PlayerDropdown data={playerData}
            playerID={props.playerID}
            playerName={props.playerName}
            playerTeam={props.playerTeam}
            playerSelect={props.playerSelect} />
        <YearDropdown
            year={props.year}
            yearSelect={props.yearSelect} />
      </div>
    )
}

export default SidePanel
