import React, { Component } from 'react';

import Chart from 'chart.js';
import _ from 'lodash';

// Define color for chart
const chartColors = [
    { color: 'red', code : 'rgb(255, 99, 132)' },
    { color: 'green', code : 'rgb(75, 192, 192)' },
    { color: 'blue', code : 'rgb(54, 162, 235)' },
    { color: 'purple', code : 'rgb(153, 102, 255)' }
]
const color = Chart.helpers.color;
let myChartRef, options;

export default class RadarStats extends Component {
    chartRef = React.createRef();

    drawChart = () => {
        // mapping data structure from api poke dex
        let datasets = _.map(this.props.datasets, (o, key) => {
            let p = {}

            p.label = _.capitalize(_.get(o, 'name', ''));
            p.data = [_.get(o, 'stats.hp', 0), _.get(o, 'stats.attack', 0), _.get(o, 'stats.special_attack', 0), _.get(o, 'stats.defense', 0), _.get(o, 'stats.special_defense', 0), _.get(o, 'stats.speed', 0)];
            p.backgroundColor = color(chartColors[key].code).alpha(0.2).rgbString();
            p.borderColor = chartColors[key].code;
            p.pointBackgroundColor = chartColors[key].code;

            return p;
        })

        const data = {
            labels: ['Hp', 'Attack', 'Special Attack', 'Defense', 'Spesial Defense', 'Speed'],
            datasets: datasets
        }

        new Chart(myChartRef, {
            type: 'radar',
            data: data,
            options: options
        })
    }

    componentDidMount () {
        myChartRef = this.chartRef.current.getContext("2d");
        options = {
            scale: {
                angleLines: {
                    display: false
                },
                ticks: {
                    suggestedMin: 20,
                    suggestedMax: 110,
                },
                pointLabel: {
                    display: true
                },
            },
        }
        this.drawChart();

    }

    componentDidUpdate () {
        this.drawChart();
    }

    render () {
        return <canvas id="myChart" ref={this.chartRef}></canvas>
    }
}