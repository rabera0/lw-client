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
    () => setSocketUrl('wss://feather-silver-kiwi.glitch.me'),
    []
  );

  const handleClickSendMessage = useCallback(() => sendJsonMessage({ type: 'zipcode', zipcode: 11111}), [sendJsonMessage]);

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
