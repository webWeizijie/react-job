import React from 'react'
import ReactDOM from 'react-dom';
import fastClick from 'fastclick'
import registerServiceWorker from './registerServiceWorker';
import { createStore,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import redurces from './redux/redurces'
import App from './App'
import './utils/config'
import './index.css'
import './reset.css'

fastClick.attach(document.body);  
let store = createStore(redurces,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
)
registerServiceWorker();
