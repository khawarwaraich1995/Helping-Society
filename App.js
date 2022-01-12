import React from 'react'
import { Text, View } from 'react-native'
import Navigator from './src/navigation/navigator'

class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator />
      </View>
    )
  }
}

export default App
