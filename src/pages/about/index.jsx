import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
// import { AtButton } from 'taro-ui'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import "taro-ui/dist/style/components/flex.scss"
import './index.scss'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className='logo'>
          <Image src='../../assets/images/home-select.png' />
        </View>
        <View className='at-row'>
          <View className='at-col'>A</View>
          <View className='at-col'>B</View>
          <View className='at-col'>C</View>
        </View>
      </View>
    )
  }
}
