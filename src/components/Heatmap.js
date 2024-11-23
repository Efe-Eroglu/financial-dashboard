import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Heatmap = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    // Treemap için root oluştur
    const root = d3
      .hierarchy({ children: data })
      .sum((d) => d.volume) // Boyutlandırmayı volume'a göre yap
      .sort((a, b) => b.value - a.value); // Volume'a göre sıralama

    // Treemap düzenini ayarla
    const treemapLayout = d3.treemap().size([800, 500]).padding(2);
    treemapLayout(root);

    // SVG'ye bağlan ve temizle
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Renk ölçeği (volume değerine göre renk koyuluğu ayarlanıyor)
    const colorScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.volume)])
      .range(["#d4f4dd", "#006400"]); // Açık yeşilden koyu yeşile

    // Node'ları oluştur
    const nodes = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x0}, ${d.y0})`);

    // Dikdörtgenler
    nodes
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => colorScale(d.value)) // Renk ölçeğine göre renk ayarla
      .attr("stroke", "white");

    // Metinler
    nodes
      .append("text")
      .attr("x", 5)
      .attr("y", 20)
      .text((d) => `${d.data.stock_symbol}`)
      .attr("fill", "black")
      .style("font-size", "12px");

    // Volume değerlerini göster
    nodes
      .append("text")
      .attr("x", 5)
      .attr("y", 40)
      .text((d) => `Vol: ${d.data.volume}`)
      .attr("fill", "black")
      .style("font-size", "10px");
  }, [data]);

  return <svg ref={svgRef} width={800} height={500}></svg>;
};

export default Heatmap;
