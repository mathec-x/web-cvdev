import React from 'react';
import { SocketIoProvider } from 'socket.io-hook';
import { useDispatch } from 'react-redux';
import customParser from 'socket.io-msgpack-parser';
import AppLoading from '../components/AppLoading';

const WebSocket = ({children, ...props}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  return (
    <SocketIoProvider
      url={process.env.REACT_APP_SOCKET_URL}
      onDispatch={dispatch}
      onRefresh={(data) => sessionStorage.setItem('x-access-token', data.token)}
      onDisconnect={() => sessionStorage.removeItem('socket-id')}
      onConnect={(socket) => sessionStorage.setItem('socket-id', socket.id)}
      custom={{
        'unsubscribe': () => sessionStorage.removeItem('subscription'),
        'subscribe': (data) => sessionStorage.setItem('subscription', data),
        'logout': () => sessionStorage.removeItem('x-access-token'),
        'refresh': () => sessionStorage.removeItem('x-access-token'),
        'loading': setLoading
      }}
      options={{
        parser: customParser, // process.env.NODE_ENV === 'production' ? customParser : null,
        auth: (cb) => cb({ token: sessionStorage.getItem('x-access-token') }),
      }}
      {...props}
    >
      {loading && <AppLoading />}
      {children}
    </SocketIoProvider>
  );
}

export default React.memo(WebSocket);