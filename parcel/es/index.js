import React from 'react'
import { render } from 'react-dom'
import App from './app'

class AppContainer extends React.Component{
  state = {
    name: 'Parcel 打包案例'
  }

  componentDidMount () {
    setTimeout(() => this.setState({ name: 'Parcel 打小宝'}, 2000))
  }

  render() {
    return <App name= {this.state.name}/>
  }
}

render(
  <AppContainer/>,
  document.getElementById('app')
)