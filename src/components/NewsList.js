import React from "react";
import "../styles/newsList.css";

const NewsList = () => {
  const sampleNews = [
    {
      id: 1,
      title: "Bitcoin Fiyatı Yeni Rekor Kırdı: 100.000$",
      source: "CoinDesk",
      url: "https://www.coindesk.com/bitcoin-price-hits-100k",
    },
    {
      id: 2,
      title: "Ethereum Merge Başarıyla Tamamlandı",
      source: "CryptoNews",
      url: "https://www.cryptonews.com/ethereum-merge-success",
    },
    {
      id: 3,
      title: "BNB Fiyatı Yüzde 15 Arttı: Binance Ekosistemindeki Gelişmeler",
      source: "Binance Blog",
      url: "https://www.binance.com/en/blog/bnb-price-increase",
    },
    {
      id: 4,
      title: "Dogecoin Elon Musk Tweeti Sonrası Yüzde 20 Arttı",
      source: "MarketWatch",
      url: "https://www.marketwatch.com/dogecoin-elon-musk-tweet",
    },
    {
      id: 5,
      title: "ABD Faiz Kararları Kripto Piyasalarını Nasıl Etkiler?",
      source: "Yahoo Finance",
      url: "https://finance.yahoo.com/impact-of-fed-decisions",
    },
  ];

  if (!sampleNews || sampleNews.length === 0) {
    return <p>Haber bulunmamaktadır.</p>;
  }

  return (
    <ul className="news-list">
      {sampleNews.map((item) => (
        <li key={item.id} className="news-item">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <h3>{item.title}</h3>
            <p>{item.source}</p>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NewsList;
