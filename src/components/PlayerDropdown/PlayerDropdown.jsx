import React, { Component } from 'react'

class PlayerDropdown extends Component {
    constructor (props){
        super(props)
        this.playerSelect = this.playerSelect.bind(this)
    }

    playerSelect(e) {
        this.props.playerSelect({ id: e.target.value, name: e.target.name })
    }

    render() {
        var options = this.props.data.map(function(option) {
            return (
                <option key={option.id} value={option.id} >{option.name}</option>
            )
        });

        return (
            <select value={this.props.playerID} onChange={this.playerSelect}>
                {options}
            </select>
        )
    }
}

export default PlayerDropdown