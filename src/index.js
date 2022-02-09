import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ModalProvider } from '@pancakeswap/uikit';
import { HelmetProvider } from 'react-helmet-async';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Root from "./Root";
import store from "./store/store";
import useActiveWeb3React from './hooks/useActiveWeb3React'
import { ToastsProvider } from './contexts/ToastsContext'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/web3React'
import { LanguageProvider } from './contexts/Localization'
import { RefreshContextProvider } from './contexts/RefreshContext'
import { BlockContextProvider } from './contexts/BlockContext'
import { BLOCKED_ADDRESSES } from './constants'
import reportWebVitals from './reportWebVitals';
import ListsUpdater from './store/slices/lists-slice/updater'
import MulticallUpdater from './store/slices/multicall-slice/updater'
import TransactionUpdater from './store/slices/transactions-slice/updater'

import * as themes from './theme/schema.json';

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

function Blocklist({ children }) {
  const { account } = useActiveWeb3React()
  const blocked = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  if (blocked) {
    return <div>Blocked address</div>
  }
  return <>{children}</>
}

ReactDOM.render(
  <Blocklist>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <HelmetProvider>
            <ThemeProvider theme={themes.default}>
              <LanguageProvider>
                <BlockContextProvider>
                  <RefreshContextProvider>
                    <ModalProvider>
                      <Updaters />
                      <Root />
                    </ModalProvider>
                  </RefreshContextProvider>
                </BlockContextProvider>
              </LanguageProvider>
            </ThemeProvider>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  </Blocklist>,
  document.getElementById('root')
);

reportWebVitals();
