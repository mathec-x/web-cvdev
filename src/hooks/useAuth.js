import localforage from 'localforage';
import React from 'react';
import { useSocket } from 'socket.io-hook';
import User from '../services/User';

/**
 * @param {{onLogout?:()=>any, onLogin?:()=> Promise<void> }} [props]
 */
const useAuth = (props) => {
  const [isLoading, setLoading] = React.useState(false);
  const [subscriptions, setSubscriptions] = React.useState(0);
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

  const login = async () => {
    let response = false;

    try {
      const data = await window.Prompt("Cadastre ou acesse o sistema aqui", [
        { label: 'Email', name: 'login', type: 'email' },
        { label: 'Senha', name: 'password', type: 'password' }
      ]);
      setLoading(true);
      try {
        const response = await User.login(data);

        if (response.status === 200) {
          setTimeout(() => {
            window.Alert("Bem vindo de volta")

          }, 455);
        }
        else if (response.status === 201) {
          response = true;
          setTimeout(() => {
            window.Alert("Registrado com sucesso lol")

          }, 455);
        }

        sessionStorage.setItem('x-access-token', response.data.token);

        if (props?.onLogin) {
          props.onLogin();
        }

      } catch (error) {
        console.log({ error });
        setTimeout(() => {
          window.Alert('Falha ao autenticar', 1055);

        }, 355);

        setTimeout(() => {
          return login();

        }, 2000);
      } finally {
        reconnect();
        setLoading(false);
      }
    } catch {
      console.log('Cancel login');
    }

    return response;
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