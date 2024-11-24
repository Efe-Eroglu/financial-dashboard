import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Heatmap = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const root = d3
      .hierarchy({ children: data })
      .sum((d) => d.volume)
      .sort((a, b) => b.value - a.value);

    const treemapLayout = d3.treemap().size([800, 500]).padding(8);
    treemapLayout(root);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const colorScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.volume)])
      .range(["#e3f2fd", "#1565c0"]);

    const nodes = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x0}, ${d.y0})`);

    nodes
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => colorScale(d.value))
      .attr("stroke", "white")
      .attr("rx", 12)
      .attr("ry", 12);

    nodes
      .append("text")
      .attr("x", 10)
      .attr("y", 20)
      .text((d) => d.data.stock_symbol)
      .attr("fill", "#ffffff")
      .style("font-size", "14px")
      .style("font-weight", "bold");

    nodes
      .append("text")
      .attr("x", 10)
      .attr("y", 40)
      .text((d) => `Vol: ${Math.round(d.data.volume)}`)
      .attr("fill", "#ffffff")
      .style("font-size", "12px");
  }, [data]);

  return <svg ref={svgRef} width="100%" height="100%"></svg>;
};

export default Heatmap;
