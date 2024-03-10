"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GaugeChartProps {
  value: number; // Accepts values from -3 to 3
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value }) => {
  const gaugeRef = useRef<SVGSVGElement | null>(null);

  // Convert value from -3 to 3 range into 0 to 1 percentage
  const valueToPercent = (value: number): number => {
    return (value + 3) / 6;
  };

  useEffect(() => {
    if (gaugeRef.current) {
      const percent = valueToPercent(value);
      drawGauge(gaugeRef.current, percent);
    }
  }, [value]);

  return <svg ref={gaugeRef} width="400" height="400" />;
};

const drawGauge = (element: SVGSVGElement, percent: number) => {
  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;
  const barWidth = 40;
  const numSections = 3;
  const sectionPerc = 1 / numSections / 2;
  const padRad = 0.05;
  const chartInset = 10;
  let totalPercent = 0.75;

  const svg = d3.select(element);
  svg.selectAll("*").remove(); // Clear the SVG for redraw

  const chart = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  const arc = d3.arc()
    .innerRadius(radius - chartInset - barWidth)
    .outerRadius(radius - chartInset)
    .startAngle((d: any) => d.startAngle + padRad / 2)
    .endAngle((d: any) => d.endAngle - padRad / 2);

  const arcs = d3.range(1, numSections + 1).map((sectionIndex) => {
    const arcStartRad = percToRad(totalPercent);
    totalPercent += sectionPerc;
    const arcEndRad = arcStartRad + percToRad(sectionPerc);
    return {startAngle: arcStartRad, endAngle: arcEndRad};
  });

  chart.selectAll('path')
    .data(arcs)
    .enter().append('path')
    .attr('fill', (d, i) => ['#4CBB17', '#808080', '#e92213'][i])
    .attr('d', arc as any);


  function percToRad(perc: number) {
    return perc * 2 * Math.PI;
  }

  const needleLength = 160;
  const needleRadius = 15;
  const pi = Math.PI;
  const thetaRad = percToRad(percent) - pi / 2; 

  const centerX = 0;
  const centerY = 0;
  const topX = centerX - needleLength * Math.cos(thetaRad);
  const topY = centerY - needleLength * Math.sin(thetaRad);
  const leftX = centerX - needleRadius * Math.cos(thetaRad - pi / 2);
  const leftY = centerY - needleRadius * Math.sin(thetaRad - pi / 2);
  const rightX = centerX - needleRadius * Math.cos(thetaRad + pi / 2);
  const rightY = centerY - needleRadius * Math.sin(thetaRad + pi / 2);

  const needlePath = `M ${leftX} ${leftY} L ${topX} ${topY} L ${rightX} ${rightY}`;

  // Draw needle
  chart.append('path')
    .attr('class', 'needle')
    .attr('d', needlePath)
    .attr('fill', '#464A4F');

  chart.append('circle')
    .attr('class', 'needle-center')
    .attr('cx', centerX)
    .attr('cy', centerY)
    .attr('r', needleRadius / 2)
    .attr('fill', '#464A4F');
};

export default GaugeChart;
