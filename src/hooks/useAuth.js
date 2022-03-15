import localforage from 'localforage';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from 'socket.io-hook';
import User from '../services/User';

/**
 * @param {{onLogout?:()=>any, onLogin?:()=>any}} [props]
 */
const useAuth = (props) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(false);
  const [subscriptions, setSubscriptions ] = React.useState(0);
  const socket = useSocket();

  React.useEffect(() => {
    socket.on('subscriptions', setSubscriptions)

    return () => {
      socket.removeListener('subscriptions', setSubscriptions);
    }


  }, [socket])

  const reconnect = (callback) => {
    socket.disconnect();
    setTimeout(() => {
      socket.connect();
      setLoading(false);
      return callback && callback();
    }, 777)
  }

  const login = () => {
    window.Prompt("Cadastre ou acesse o sistema aqui", [
      { label: 'Email', name: 'login' },
      { label: 'Senha', name: 'password', type: 'password' }
    ])
      .then(async (data) => {
        setLoading(true);
        const response = await User.login(data);
        if (!response.ok) {
          window.Alert('Falha ao autenticar')
        } else {
          const data = await response.json();
          sessionStorage.setItem('token', data.token);
          navigate({ hash: 'menu' })
        }
        reconnect();
      })
      .catch(() => console.log('Cancel login'))
  }

  const logout = () => {
    setLoading(true);
    localStorage.clear();
    sessionStorage.clear();
    socket.disconnect();
    localforage.clear().then(() => {
      reconnect(props?.onLogout);
    });
  }

  return {
    logout,
    login,
    isLoading,
    subscriptions
  }
}

export default useAuth;