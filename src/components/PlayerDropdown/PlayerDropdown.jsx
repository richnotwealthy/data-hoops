import React, { Component } from 'react'

class PlayerDropdown extends Component {
    constructor (props){
        super(props)
        this.playerSelect = this.playerSelect.bind(this)
    }

    playerSelect(e) {
        this.props.playerSelect({
            id: e.target.value.split(':')[0],
            name: e.target.value.split(':')[1],
            team: e.target.value.split(':')[2]
        })
    }

    render() {
        var options = this.props.data.map(function(option) {
            return (
                <option key={option.id} value={option.id + ':' + option.name + ':' + option.team} >{option.name}</option>
            )
        });

        return (
            <select value={this.props.playerID+':'+this.props.playerName+':'+this.props.playerTeam} onChange={this.playerSelect}>
                {options}
            </select>
        )
    }
}

export default PlayerDropdown