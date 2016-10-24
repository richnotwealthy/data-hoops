import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './ShotChart.scss'
import '../../3rdparty/d3.basketball-shot-chart.css'

import * as d3 from 'd3';
const D3Charts = require('../../3rdparty/d3.chart')
require('../../3rdparty/d3.hexbin')()
require('../../3rdparty/d3.chart.defaults')()
require('../../3rdparty/d3.basketball-shot-chart')()
import dl from 'datalib'
import request from 'request'

class ShotChart extends Component {
    constructor(props) {
        super(props)
        this.d3Chart = this.d3Chart.bind(this)
    }

    d3Chart() {
        var playerID = this.props.playerID;
        var year = this.props.year;
        var name = this.props.playerName;

        var options = {
            url: 'http://'+window.location.hostname+':'+(+PORT+1)+'/nbastats/'+year+'/'+this.props.playerID,
            withCredentials: false
        }

        var _this = this;

        request.get(options, function(err, res, body){
            var data = JSON.parse(body);
            var playerArray = data.resultSets[0].rowSet;

            var x = [];
            var y = [];
            var made = [];
            var attempts = [];
            playerArray.forEach(function(a){

                x.push(a[a.length-4]);
                y.push(a[a.length-3]);
                made.push(a[a.length-1]);
                attempts.push(a[a.length-2]);

            });

            var xScale = d3.scale.linear()
                        .domain([-250, 250])
                        .range([0,50]);

            var yScale = d3.scale.linear()
                        .domain([-50, 450])
                        .range([0,50]);

            var tenderData = [];
            for(var i = 0; i < playerArray.length; i++){
                tenderData.push({"x":xScale(x[i]),
                    "y": yScale(y[i]),
                    "made": made[i],
                    "attempts": attempts[i]});
            };

            var coll = d3.nest()
                .key(function(d) {return [d.x, d.y]; })
                .rollup(function(v){return{
                    made: d3.sum(v, function(d) {return d.made}),
                    attempts: d3.sum(v, function(d){return d.attempts}),
                    shootingPercentage:  d3.sum(v, function(d) {return d.made})/d3.sum(v, function(d){return d.attempts})
                }})
                .entries(tenderData);

            var z = [];
            coll.forEach(function(a){
                a.key = JSON.parse("[" + a.key + "]");
                z.push(a.values.shootingPercentage);
            });
            // console.log(coll);

            var meanShot = dl.mean(z);
            var shotSTDV = dl.stdev(z);

            var finalData = [];
            coll.forEach(function(a){
                var k = (a.values.shootingPercentage - meanShot)/shotSTDV;
                finalData.push({"x": a.key[0], "y": a.key[1], "z": k, "made": a.values.made, "attempts": a.values.attempts})
            });

            var heatRange = ['#5458A2', '#6689BB', '#FADC97', '#F08460', '#B02B48'];

            var el = ReactDOM.findDOMNode(_this);
            //console.log(JSON.stringify(finalData))
            d3.select(el)
                .html('')
                .append("svg")
                .chart("BasketballShotChart", {
                    width: 900,
                    title: name + ' ' + year,
                    // instead of makes/attempts, use z
                    hexagonFillValue: function(d) {  return d.z; },
                    // switch heat scale domain to [-2.5, 2.5] to reflect range of z values
                    heatScale: d3.scale.quantile()
                        .domain([-2.5, 2.5])
                        .range(heatRange),
                    // update our binning algorithm to properly join z values
                    // here, we update the z value to be proportional to the events of each point
                    hexagonBin: function (point, bin) {
                        var currentZ = bin.z || 0;
                        var totalAttempts = bin.attempts || 0;
                        var totalZ = currentZ * totalAttempts;

                        var attempts = point.attempts || 1;
                        bin.attempts = totalAttempts + attempts;
                        bin.z = (totalZ + (point.z * attempts))/bin.attempts;
                    },
                    hexagonRadiusThreshold: 2
                })
                .draw(finalData);
        });
    }

    render() {
        this.d3Chart()
        return (
            <g className="ShotChart"></g>
        )
    }
}

export default ShotChart
