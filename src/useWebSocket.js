import { useState, useCallback, useEffect, useMemo } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const useWebSockets = (url) => {
  // Memoize the socket URL to avoid re-initializing the socket on every render
  const socketUrl = useMemo(() => url, [url]);

  const [messageHistory, setMessageHistory] = useState([]);
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback((zipcode) => {
    console.log('Sending message: ', { zipcode });  // Added log here
    sendJsonMessage({ zipcode });
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
    handleClickSendMessage,
  };
};

export default useWebSockets;
