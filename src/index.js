import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Idiot from 'idiot'

const idiot = new Idiot({
  baseUrl: 'https://api.hotwallet.com'
})

idiot.get('/news')
  .then(news => {
    ReactDOM.render(<App news={news} />, document.getElementById('root'))
  })
