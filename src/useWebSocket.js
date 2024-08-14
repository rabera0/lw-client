import { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const useWebSockets = (url) => {
  const [socketUrl, setSocketUrl] = useState(url);
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(() => {
    setSocketUrl(url);
  }, [url]);

  const handleClickSendMessage = useCallback((zipcode) => {
    sendJsonMessage({ type: 'zipcode', zipcode });
  }, [sendJsonMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return {
    messageHistory,
    connectionStatus,
    handleClickChangeSocketUrl,
    handleClickSendMessage,
  };
};

export default useWebSockets;
