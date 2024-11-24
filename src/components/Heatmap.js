import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Heatmap = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 1600; // Heatmap genişliği
    const height = 1000; // Heatmap yüksekliği

    // Veriyi hazırlama
    const preparedData = data.map((item) => {
      const lastPrice = parseFloat(item.LastPrice) || 0;
      const low24h = parseFloat(item.Low24h) || 1;
      const change = ((lastPrice - low24h) / low24h) * 100;

      return {
        ...item,
        change,
      };
    });

    console.log("Hazırlanan Data:", preparedData);

    // Treemap root oluşturma
    const root = d3
      .hierarchy({ children: preparedData })
      .sum(() => 1) // Her öğeye eşit değer ata
      .sort((a, b) => b.value - a.value);

    console.log("Treemap Root:", root.leaves());

    // Treemap layout ayarları
    const treemapLayout = d3
      .treemap()
      .size([width, height])
      .paddingInner(5); // Kutular arasında boşluk
    treemapLayout(root);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Önceki içeriği temizle

    // Renk skalası
    const colorScale = d3
      .scaleLinear()
      .domain([-10, 0, 10])
      .range(["#e57373", "#ffffff", "#81c784"]);

    // Kutuları oluşturma
    const nodes = svg
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x0}, ${d.y0})`);

    nodes
      .append("rect")
      .attr("width", (d) => Math.max(0, d.x1 - d.x0)) // Negatif genişliği önlemek
      .attr("height", (d) => Math.max(0, d.y1 - d.y0)) // Negatif yüksekliği önlemek
      .attr("fill", (d) => colorScale(d.data.change))
      .attr("stroke", "white")
      .attr("rx", 10)
      .attr("ry", 10);

    // Hisse adı
    nodes
      .append("text")
      .attr("x", (d) => (d.x1 - d.x0) / 2)
      .attr("y", (d) => (d.y1 - d.y0) / 2 - 40)
      .attr("text-anchor", "middle")
      .attr("fill", "#000000")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text((d) => d.data.stock_symbol);

    // Son fiyat
    nodes
      .append("text")
      .attr("x", (d) => (d.x1 - d.x0) / 2)
      .attr("y", (d) => (d.y1 - d.y0) / 2 - 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#000000")
      .style("font-size", "14px")
      .text((d) => `Last: ${d.data.LastPrice.toFixed(2)}`);

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
