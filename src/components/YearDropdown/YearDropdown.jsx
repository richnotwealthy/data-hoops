import React, { Component } from 'react'

class YearDropdown extends Component {
    constructor (props){
        super(props)
        this.yearSelect = this.yearSelect.bind(this)
    }

    yearSelect(e) {
        console.log(this.props)
        this.props.yearSelect(e.target.value)
    }

    render() {
        return (
            <select value={this.props.year} onChange={this.yearSelect}>
                <option value='2015-16'>2015-16</option>
                <option value='2014-15'>2014-15</option>
                <option value='2013-14'>2013-14</option>
            </select>
        )
    }
}

export default YearDropdown