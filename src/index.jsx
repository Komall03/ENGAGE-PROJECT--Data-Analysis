import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { Slide, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import store from './state/index';
import App from './App';
import reportWebVitals from './reportWebVitals';

const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SnackbarProvider
      preventDuplicate
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      TransitionComponent={Slide}
      hideIconVariant={false}
      ref={notistackRef}
      action={(key) => (
        <IconButton
          aria-label="close"
          size="small"
          onClick={onClickDismiss(key)}
        >
          <CloseIcon style={{ fill: '#FFFFFF' }} color="secondary" />
        </IconButton>
      )}
    >
      <App />
    </SnackbarProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
