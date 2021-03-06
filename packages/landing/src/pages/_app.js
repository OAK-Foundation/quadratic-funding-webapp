import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from '@redq/reuse-modal';
import { Provider } from 'react-redux';
import '@redq/reuse-modal/es/index.css';
import 'common/assets/css/flaticon.css';
import 'swiper/swiper-bundle.css';
import '../containers/CryptoModern/CountDown/timer.css';
import 'common/assets/css/icon-example-page.css';
import reduxHelper from '../redux/helper';
import AppWrapper from './appwrapper';

const CustomApp = ({ Component, pageProps }) => {
  const store = reduxHelper.getStore();
  return (
    <Provider store={store}>
      <AppWrapper>
        <Modal>
          <Component {...pageProps} />
        </Modal>
      </AppWrapper>
    </Provider>
  );
};

export default CustomApp;

CustomApp.propTypes = {
  Component: PropTypes.func,
  /** Using this props we can convert our Box Component to a Flex Container or Component */
  pageProps: PropTypes.object,
};
