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

  const reconnect = (/** @type {{ (): any; (): any; }} */ callback) => {
    socket.disconnect();
    setTimeout(() => {
      socket.connect();
      setLoading(false);
      return callback && callback();
    }, 777)
  }

  const login = () => {
    window.Prompt("Cadastre ou acesse o sistema aqui", [
      { label: 'Email', name: 'login', type: 'email' },
      { label: 'Senha', name: 'password', type: 'password' }
    ])
      .then(async (data) => {
        setLoading(true);
        try {
          const response = await User.login(data);
          if(response.status === 200){
            window.Alert("Bem vindo de volta");
          }
          else if(response.status === 201){
            window.Alert("Registrado com sucesso lol");
          }

          sessionStorage.setItem('x-access-token', response.data.token);
          navigate({ hash: 'menu' })
        } catch (error) {
          console.log({error});
          window.Alert('Senha incorreta')
        } finally {
          reconnect();
          setLoading(false);
        }
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