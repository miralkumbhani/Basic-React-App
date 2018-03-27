import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './Components/_helpers';
import { App } from './App';

import { configureMockBackend } from './Components/_helpers';
configureMockBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)