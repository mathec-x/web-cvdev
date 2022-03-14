import React from 'react';
import ReactPwa from 'react-pwa-app';

const Pwa = (props) => {
  return (
    <ReactPwa
      config={{
        swUrl: '/service-worker.js',
        onError: (error) => {
          console.log('[service worker error]', error);
        },
        onSuccess: (e) => {
          // e.sync.register('')
          console.log('[service worker instalado]', e);
        },
        onUpdate: (e) => {
          // eslint-disable-next-line no-alert
          console.log('[service worker atualizado]', e);
          alert('Feche o aplicativo e abra novamente para instalar atualizações');
          window.close();
        },
        onPrompt: (e) => {
          console.log('service worker prompt', e);
          if(e.outcome === 'accepted'){
            window.location.reload()
          }
        },
        onOffline: () => {
          console.log('service worker offline');
        }
      }}
      {...props}
    />
  );
}

export default React.memo(Pwa);