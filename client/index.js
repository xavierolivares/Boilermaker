// import '../public/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
    <div>X gon give it to ya</div>
    </Provider>,
    document.getElementById('app')
)