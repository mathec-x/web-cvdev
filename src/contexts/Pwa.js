import React from 'react';
import ReactPwa from 'react-pwa-app';

const Pwa = (props) => {
  return (
    <ReactPwa
      test
      config={{
        swUrl: '/service-worker.js',
        onError: () => {
          // alert('erro ao instalar sw');
        },
        onSuccess: ( e) => {
          e.sync.register('')
          // console.log('service worker instalado');
        },
        onUpdate: () => {
          // eslint-disable-next-line no-alert
          alert('Feche o aplicativo e abra novamente para instalar atualizações');
          window.close();
        },
        onPrompt: (e) => {
          if(e.outcome === 'accepted'){
            window.location.reload()
          }
        }
      }}
      {...props}
    />
  );
}

export default React.memo(Pwa);