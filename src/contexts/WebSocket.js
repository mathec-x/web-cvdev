import React from 'react';
import { SocketIoProvider } from 'socket.io-hook';
import { useDispatch } from 'react-redux';
import customParser from 'socket.io-msgpack-parser';

const WebSocket = (props) => {
  const dispatch = useDispatch();

  return (
    <SocketIoProvider
      url={process.env.REACT_APP_SOCKET_URL}
      onDispatch={dispatch}
      onRefresh={(data) => sessionStorage.setItem('token', data.token)}
      onDisconnect={() => sessionStorage.removeItem('socket-id')}
      onConnect={(socket) => sessionStorage.setItem('socket-id', socket.id)}
      custom={{
        'unsubscribe': () => sessionStorage.removeItem('subscription'),
        'subscribe': (data) => sessionStorage.setItem('subscription', data)
      }}
      options={{
        parser: process.env.NODE_ENV === 'production' ? customParser : null,
        auth: (cb) => cb({ token: sessionStorage.getItem('token') }),
      }}
      {...props}
    />
  );
}

export default React.memo(WebSocket);