import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Heatmap = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 1200; // Heatmap genişliği
    const height = 800; // Heatmap yüksekliği

    console.log("Gelen Data:", data);

    // Günlük değişimi hesapla ve `change` değerine ekle
    const preparedData = data.map((item) => {
      const lastPrice = parseFloat(item.LastPrice) || 0;
      const low24h = parseFloat(item.Low24h) || 1; // Bölme hatasını önlemek için varsayılan 1
      const change = ((lastPrice - low24h) / low24h) * 100; // Günlük değişim yüzdesi
      console.log("Change Hesaplama:", {
        stock_symbol: item.stock_symbol,
        LastPrice: lastPrice,
        Low24h: low24h,
        change,
      });
      return {
        ...item,
        change, // Günlük değişim yüzdesi
      };
    });

    console.log("Hazırlanan Veri:", preparedData);

    const root = d3
      .hierarchy({ children: preparedData })
      .sum((d) => d.volume)
      .sort((a, b) => b.value - a.value);

    const treemapLayout = d3
      .treemap()
      .size([width, height])
      .padding(5);
    treemapLayout(root);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Renk skalası
    const colorScale = d3
      .scaleLinear()
      .domain([-10, 0, 10]) // Negatif, nötr, pozitif değişimler
      .range(["#e57373", "#ffffff", "#81c784"]);

    const nodes = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x0}, ${d.y0})`);

    // Hücreler
    nodes
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => colorScale(d.data.change))
      .attr("stroke", "white")
      .attr("rx", 10)
      .attr("ry", 10);

    // Hisse adı
    nodes
      .append("text")
      .attr("x", (d) => (d.x1 - d.x0) / 2)
      .attr("y", (d) => (d.y1 - d.y0) / 2 - 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#000000")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text((d) => d.data.stock_symbol);

    // Hisse hacmi
    nodes
      .append("text")
      .attr("x", (d) => (d.x1 - d.x0) / 2)
      .attr("y", (d) => (d.y1 - d.y0) / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "#000000")
      .style("font-size", "14px")
      .text((d) => `Vol: ${Math.round(d.data.volume)}`);

    // Günlük değişim yüzdesi
    nodes
      .append("text")
      .attr("x", (d) => (d.x1 - d.x0) / 2)
      .attr("y", (d) => (d.y1 - d.y0) / 2 + 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#000000")
      .style("font-size", "12px")
      .text((d) => `Chg: ${d.data.change.toFixed(2)}%`);
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      style={{ backgroundColor: "#f4f6f8", borderRadius: "16px" }}
    ></svg>
  );
};

export default Heatmap;
