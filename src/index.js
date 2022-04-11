import React, { Suspense } from 'react';
import 'prototypes-string';
import 'prototypes-array';

import Container from '@mui/material/Container';
import ReactDOM from 'react-dom';
import ReactMuiWindow from 'react-mui-window';
import Pwa from './contexts/Pwa';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import AppLoading from './components/AppLoading';
import AppBar from './components/AppBar';
import WebSocket from './contexts/WebSocket';
import ReduxStore from './contexts/ReduxStore';
import Themed from './contexts/Themed';
import AppMenu from './components/AppMenu';

import Home from './pages/Home';
import Candidate from './pages/Candidate';

import Request from "fx-request";
Request.setMode('xhr');
Request.setHost(process.env.REACT_APP_API_URL);


ReactDOM.render(
  <Pwa suspense={<AppLoading />}>
    <ReduxStore>
      <WebSocket suspense={<AppLoading />}>
        <Themed>
          <Router>
            <AppBar />
              <Container
                fixed
                disableGutters
                sx={{
                  background: (theme) => theme.palette.background.default,
                  minHeight: `calc(100vh - 56px)`,
                  width: '100%',
                  boxSizing: 'border-box',
                  maxWidth: { lg: "100%" }
                }}>
                <Suspense fallback={<AppLoading />}>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path='/candidate'>
                      <Route index element={<Navigate to="/" />} />
                      <Route path=':nick' element={<Candidate />} />
                    </Route>
                  </Routes>
                </Suspense>
              </Container>
              <AppMenu />
            <ReactMuiWindow />
          </Router>
        </Themed>
      </WebSocket>
    </ReduxStore>
  </Pwa>,
  document.getElementById('root')
);
