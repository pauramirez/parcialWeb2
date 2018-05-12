import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

export default class Grafica extends Component {

	d3 = require("d3");

	constructor(props) {
		super(props);

		this.state={

		};
	}

	pintar() {
		const height = 600,
		svg = d3.select(DOM.svg(width, height)),
		margin = {top: 20, right: 50, bottom: 30, left: 40},    
		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var x = d3.scaleBand()
		.rangeRound([0, width - margin.left - margin.right])
		.paddingInner(0.05)
		.align(0.1);

		var y = d3.scaleLinear()
		.rangeRound([height - margin.top - margin.bottom, 0]);

		var z = d3.scaleSequential(d3.interpolateBlues);

		x.domain(nestedBuses.map(function(d) { return d.key; }));
		y.domain([0, d3.max(nestedBuses, function(d) { return d.total; })]).nice();
		z.domain([0, maxNumBuses]);

		g.append("g")
		.selectAll("g")
		.data(stackedBuses)
		.enter().append("g")
		.attr("fill", function(d) { return z(d.key); })
		.attr("stroke", "white")
		.selectAll("rect")
		.data(function(d) { return d; })
		.enter().append("rect")
		.attr("x", function(d) { return x(d.data.key); })
		.attr("y", function(d) { return y(d[1]); })
		.attr("height", function(d) { return y(d[0]) - y(d[1]); })
		.attr("width", x.bandwidth());

		g.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (height- margin.top - margin.bottom) + ")")
		.call(d3.axisBottom(x));

		g.append("g")
		.attr("class", "axis")
		.call(d3.axisLeft(y).ticks(null, "s"))
		.append("text")
		.attr("x", 2)
		.attr("y", y(y.ticks().pop()) + 0.5)
		.attr("dy", "0.32em")
		.attr("fill", "#000")
		.attr("font-weight", "bold")
		.attr("text-anchor", "start")
		.text("Added distance");

		var legend = g.append("g")
		.attr("font-family", "sans-serif")
		.attr("font-size", 10)
		.attr("text-anchor", "end")
		.selectAll("g")
		.data(keys.slice().reverse())
		.enter().append("g")
		.attr("transform", function(d, i) { return "translate(-50," + i * 20 + ")"; });

		legend.append("rect")
		.attr("x", width - 19)
		.attr("width", 19)
		.attr("height", 19)
		.attr("fill", z);

		legend.append("text")
		.attr("x", width - 24)
		.attr("y", 9.5)
		.attr("dy", "0.32em")
		.text(function(d) { return d; });

		return svg.node();
	}

	render() {
		return (
			<div className = "Grafica">
			<h5>Watch it</h5>
				{this.pintar()};
			</div>
			)
	}

}

PostAdd.propTypes = {
  pintar:PropTypes.func.isRequired
};
