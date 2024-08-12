import { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const useWebSockets = (url) => {
  const [socketUrl, setSocketUrl] = useState(url);
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState, sendJsonMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl(url),
    []
  );

 const handleClickSendMessage = (zipcode, sendJsonMessage) => {
  return useCallback(() => {
    sendJsonMessage({ type: 'zipcode', zipcode });
  }, [sendJsonMessage, zipcode]);
};

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
