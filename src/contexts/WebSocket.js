import React from 'react';
import { SocketIoProvider } from 'socket.io-hook';
import { connect } from 'react-redux';
import customParser from 'socket.io-msgpack-parser';

function WebSocket(props) {
  return (
    <SocketIoProvider
      url={process.env.REACT_APP_SOCKET_URL}
      onDispatch={props.dispatch}
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


export default connect((state) => ({ user: state.user }), dispatch => ({ dispatch }))(WebSocket)