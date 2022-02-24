import React, { Suspense } from 'react';
import { Container, Paper } from '@mui/material';
import ReactDOM from 'react-dom';
import ReactMuiWindow from 'react-mui-window';
import Pwa from './contexts/Pwa';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import AppLoading from './components/AppLoading';
import AppBar from './components/AppBar';
import WebSocket from './contexts/WebSocket';
import ReduxStore from './contexts/ReduxStore';
import Themed from './contexts/Themed';
import Home from './pages/Home';
import AppMenu from './components/AppMenu';

ReactDOM.render(
  <Pwa>
    <ReduxStore>
      <Themed>
        <WebSocket>
          <Router>
            <Paper sx={{ minHeight: '100vh', width: '100%', margin: 0 }} className="app">
              <AppBar />
              <Container fixed disableGutters sx={{ minHeight: '100%', maxWidth: { lg: "99%" } }}>
                <Suspense fallback={<AppLoading />}>
                  <Routes>
                    <Route path="/" exact component={<Home />} />
                  </Routes>
                </Suspense>
              </Container>
              <AppMenu />
            </Paper>
            <ReactMuiWindow />
          </Router>
        </WebSocket>
      </Themed>
    </ReduxStore>
  </Pwa>,
  document.getElementById('root')
);
