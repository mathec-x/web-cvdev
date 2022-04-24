import React, { Suspense } from 'react';
import 'prototypes-string';
import 'prototypes-array';
import './index.css';

import ReactDOM from 'react-dom';
import ReactMuiWindow from 'react-mui-window';
import Pwa from './contexts/Pwa';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Container from '@mui/material/Container';
import AppBar from './components/AppBar';
import AppLoading from './components/AppLoading';
import WebSocket from './contexts/WebSocket';
import ReduxStore from './contexts/ReduxStore';
import Themed from './contexts/Themed';
import AppMenu from './components/AppMenu';

import Request from "fx-request";
Request.setMode('xhr');
Request.setHost(process.env.REACT_APP_API_URL);


const Home = React.lazy(() => import('./pages/Home'));
const Candidate = React.lazy(() => import('./pages/Candidate'));
const CandidateRegister = React.lazy(() => import('./pages/CandidateRegister'));

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
                height: `auto`,
                width: '100%',
                maxWidth: { sm: "100%" }
              }}>
              <Suspense fallback={<AppLoading />}>
                <Routes>
                  <Route index element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/register" element={<CandidateRegister />} />
                  <Route path='/candidate'>
                    <Route index element={<Navigate to="/home" />} />
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
