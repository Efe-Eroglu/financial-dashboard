let webSocket = null;
let messageCallback = null;

export const startWebSocket = (symbols, onMessageCallback) => {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    console.error("No token found. Cannot start WebSocket.");
    return;
  }

  if (webSocket) {
    console.log("WebSocket already running.");
    return;
  }

  messageCallback = onMessageCallback;

  webSocket = new WebSocket("wss://ws.okx.com:8443/ws/v5/public");

  webSocket.onopen = () => {
    console.log("WebSocket connected.");
    if (webSocket) {
      const subscriptionMessage = {
        op: "subscribe",
        args: symbols.map((symbol) => ({ channel: "tickers", instId: symbol })),
      };
      webSocket.send(JSON.stringify(subscriptionMessage));
    }
  };

  webSocket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (messageCallback) {
      messageCallback(message);
    }
  };

  webSocket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  webSocket.onclose = () => {
    console.log("WebSocket disconnected.");
    webSocket = null;
    messageCallback = null;
  };
};


export const stopWebSocket = () => {
  if (webSocket) {
    webSocket.close(); // Bağlantıyı kapat
    console.log("WebSocket stopped.");
    webSocket = null; // Bağlantıyı null yaparak referansı serbest bırak
    messageCallback = null;
  } else {
    console.log("No active WebSocket connection to stop.");
  }
};
