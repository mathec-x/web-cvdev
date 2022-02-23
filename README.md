- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## why typings root
![](public/assets/example_typings.png)

mainly, 
we need to rewrite types of some libs so that they work correctly...

- .d.ts declaration files will always help in vscode intellisense.

![](public/assets/example_typings_2.png)

## consume Api services

all API's only return statuscode, reducer values ​​are updated by websocket
when the client sends a request, in the header it has a socket-id, the server will send 'dispatch' to that id, allowing real-time batch updates.

the bearer token in your header is also mandatory.

## web socket

whenever establishing a new connection, the token-id must be updated, and the authorization token sent back to the server.

the server will most of the time send a standard event called 'dispatch', which works directly inside the reducer

### Code Structure

```php
├── @types // linked to dev dependencies
    └── index.d.ts
├── public
    ├── icons
        └── favicon.ico        
    ├── index.html
    └── manifest.webmanifest
├── src
    ├── components
        ├── AwesomeComponent
            └── index.js
    ├── contexts
        ├── Pwa.js
        ├── Themed.js
        ├── ReduxStore.js
        └── WebSocket.js
    ├── hooks
        └── useMyCustomHook.js
    ├── pages
        ├── Home
            └── index.js
        ├── Menu
            └── index.js
        └── app.js
    ├── reducers
        ├── index.js
        └── store.js
    └── users.js
└── package.json
```